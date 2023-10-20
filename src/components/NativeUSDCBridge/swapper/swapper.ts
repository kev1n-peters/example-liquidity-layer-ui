import { ethers } from "ethers";
import { arrayify, zeroPad } from "@ethersproject/bytes";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
  ChainId,
  CHAIN_ID_ETH,
  CHAIN_ID_AVAX,
  getEmitterAddressEth,
  parseSequenceFromLogEth,
  CHAIN_ID_MOONBEAM,
  CHAIN_ID_BSC,
} from "@certusone/wormhole-sdk";
import { grpc } from "@improbable-eng/grpc-web";
import {
  PROTOCOL_UNISWAP_V2,
  ExactInCrossParameters,
  ExactOutCrossParameters,
  QuoteType,
  UniswapToUniswapQuoter,
} from "../route/cross-quote";
import {
  CIRCLE_INTEGRATION_ADDRESS_ETHEREUM,
  CIRCLE_INTEGRATION_ADDRESS_AVALANCHE,
  WORMHOLE_RPC_HOSTS,
  AVAX_TOKEN_INFO,
  ETH_TOKEN_INFO,
  ETH_SWAP_CONTRACT_ADDRESS,
  AVAX_SWAP_CONTRACT_ADDRESS,
  ETH_CIRCLE_EMITTER_ADDRESS,
  AVAX_CIRCLE_EMITTER_ADDRESS,
  getBridgeAddressForChain,
  getEvmChainId,
  MOONBEAM_TOKEN_INFO,
  BSC_TOKEN_INFO,
  MOONBEAM_SWAP_CONTRACT_ADDRESS,
  BSC_SWAP_CONTRACT_ADDRESS,
  getTokenBridgeAddressForChain,
} from "../utils/consts";
import {
  NativeSwapV2,
  NativeSwapV2__factory,
  NativeSwapV3,
  NativeSwapV3__factory,
} from "../ethers-contracts/liquiditylayer/types";
import { handleCircleMessageInLogs } from "../utils/circle";
import { EVM_RPC_MAP } from "../utils/metaMaskChainParameters";
import { getSignedVAAWithRetry } from "@certusone/wormhole-sdk";

function makeNullSwapPath(): any[] {
  const zeroBuffer = Buffer.alloc(20);
  const nullAddress = "0x" + zeroBuffer.toString("hex");
  return [nullAddress, nullAddress];
}

const NULL_SWAP_PATH = makeNullSwapPath();

interface SwapContractParameters {
  address: string;
}

interface WormholeParameters {
  chainId: ChainId;
  coreBridgeAddress: string;
  tokenBridgeAddress: string;
  circleEmitterAddress: string;
  circleIntegrationAddress: string;
}

export interface ExecutionParameters {
  crossChainSwap: SwapContractParameters;
  wormhole: WormholeParameters;
}

const EXECUTION_PARAMETERS_ETHEREUM: ExecutionParameters = {
  crossChainSwap: {
    address: ETH_SWAP_CONTRACT_ADDRESS,
  },
  wormhole: {
    chainId: CHAIN_ID_ETH,
    coreBridgeAddress: getBridgeAddressForChain(CHAIN_ID_ETH),
    tokenBridgeAddress: getTokenBridgeAddressForChain(CHAIN_ID_ETH),
    circleEmitterAddress: ETH_CIRCLE_EMITTER_ADDRESS,
    circleIntegrationAddress: CIRCLE_INTEGRATION_ADDRESS_ETHEREUM,
  },
};

const EXECUTION_PARAMETERS_AVALANCHE: ExecutionParameters = {
  crossChainSwap: {
    address: AVAX_SWAP_CONTRACT_ADDRESS,
  },
  wormhole: {
    chainId: CHAIN_ID_AVAX,
    coreBridgeAddress: getBridgeAddressForChain(CHAIN_ID_AVAX),
    tokenBridgeAddress: getTokenBridgeAddressForChain(CHAIN_ID_AVAX),
    circleEmitterAddress: AVAX_CIRCLE_EMITTER_ADDRESS,
    circleIntegrationAddress: CIRCLE_INTEGRATION_ADDRESS_AVALANCHE,
  },
};

const EXECUTION_PARAMETERS_MOONBEAM: ExecutionParameters = {
  crossChainSwap: {
    address: MOONBEAM_SWAP_CONTRACT_ADDRESS,
  },
  wormhole: {
    chainId: CHAIN_ID_MOONBEAM,
    coreBridgeAddress: getBridgeAddressForChain(CHAIN_ID_MOONBEAM),
    tokenBridgeAddress: getTokenBridgeAddressForChain(CHAIN_ID_MOONBEAM),
    circleEmitterAddress: "",
    circleIntegrationAddress: "",
  },
};

const EXECUTION_PARAMETERS_BSC: ExecutionParameters = {
  crossChainSwap: {
    address: BSC_SWAP_CONTRACT_ADDRESS,
  },
  wormhole: {
    chainId: CHAIN_ID_BSC,
    coreBridgeAddress: getBridgeAddressForChain(CHAIN_ID_BSC),
    tokenBridgeAddress: getTokenBridgeAddressForChain(CHAIN_ID_BSC),
    circleEmitterAddress: "",
    circleIntegrationAddress: "",
  },
};

function makeExecutionParameters(chainId: ChainId): ExecutionParameters {
  switch (chainId) {
    case CHAIN_ID_ETH: {
      return EXECUTION_PARAMETERS_ETHEREUM;
    }
    case CHAIN_ID_AVAX: {
      return EXECUTION_PARAMETERS_AVALANCHE;
    }
    case CHAIN_ID_MOONBEAM: {
      return EXECUTION_PARAMETERS_MOONBEAM;
    }
    case CHAIN_ID_BSC: {
      return EXECUTION_PARAMETERS_BSC;
    }
    default: {
      throw Error("unrecognized chain id");
    }
  }
}

function makeCrossChainSwapEvmContract(
  signerOrProvider: ethers.providers.Provider | ethers.Signer,
  protocol: string,
  contractAddress: string
): NativeSwapV2 | NativeSwapV3 {
  if (protocol === PROTOCOL_UNISWAP_V2) {
    return NativeSwapV2__factory.connect(contractAddress, signerOrProvider);
  } else {
    return NativeSwapV3__factory.connect(contractAddress, signerOrProvider);
  }
}

function addressToBytes32(
  address: string,
  wormholeChainId: ChainId
): Uint8Array {
  return zeroPad(arrayify(address), 32);
}

export interface ExactInParametersStruct {
  amountIn: ethers.BigNumber;
  amountOutMinimum: ethers.BigNumber;
  targetAmountOutMinimum: ethers.BigNumber;
  targetChainRecipient: Uint8Array;
  deadline: ethers.BigNumber;
  poolFee: ethers.BigNumber;
}

function evmMakeExactInSwapParameters(
  amountIn: ethers.BigNumber,
  recipientAddress: string,
  dstWormholeChainId: ChainId,
  quoteParams: ExactInCrossParameters
): ExactInParametersStruct {
  const src = quoteParams.src!;
  const dst = quoteParams.dst!;

  return {
    amountIn,
    amountOutMinimum: src.minAmountOut,
    targetAmountOutMinimum: dst.minAmountOut,
    targetChainRecipient: addressToBytes32(
      recipientAddress,
      dstWormholeChainId
    ),
    deadline: src.deadline,
    poolFee: ethers.BigNumber.from(dst.poolFee || src.poolFee || 0),
  };
}

function makePathArray(
  quoteParams: ExactInCrossParameters | ExactOutCrossParameters
): any[] {
  if (quoteParams.src === undefined) {
    return NULL_SWAP_PATH.concat(quoteParams.dst?.path);
  } else if (quoteParams.dst === undefined) {
    return quoteParams.src.path.concat(NULL_SWAP_PATH);
  } else {
    return quoteParams.src.path.concat(quoteParams.dst.path);
  }
}

async function evmApproveAndSwapExactIn(
  srcProvider: ethers.providers.Provider,
  srcWallet: ethers.Signer,
  tokenInAddress: string,
  quoteParams: ExactInCrossParameters,
  srcExecutionParams: ExecutionParameters,
  dstExecutionParams: ExecutionParameters,
  isNative: boolean,
  recipientAddress: string
): Promise<TransactionReceipt> {
  const swapContractParams = srcExecutionParams.crossChainSwap;

  const protocol = quoteParams.src?.protocol!;
  const contractWithSigner = makeCrossChainSwapEvmContract(
    srcWallet,
    protocol,
    swapContractParams.address
  );

  // approve and swap this amount
  const amountIn = quoteParams.src?.amountIn!;
  const dstWormholeChainId = dstExecutionParams.wormhole.chainId;

  const swapParams = evmMakeExactInSwapParameters(
    amountIn,
    recipientAddress,
    dstWormholeChainId,
    quoteParams
  );

  const pathArray = makePathArray(quoteParams);

  // const dstContractAddress = addressToBytes32(
  // dstExecutionParams.crossChainSwap.address,
  // dstWormholeChainId
  // );

  // const gasParams = getEvmGasParametersForContract(contractWithSigner);
  // do the swap
  {
    // TODO: set gas params
    const transactionParams = { value: amountIn };

    console.log(JSON.stringify(swapParams));

    const tx = await contractWithSigner.swapExactNativeInAndTransfer(
      swapParams,
      pathArray,
      dstWormholeChainId,
      quoteParams.wormholeSlippage,
      transactionParams
    );
    return tx.wait();
  }
}

async function swapExactInFromVaa(
  dstProvider: ethers.providers.Provider,
  dstWallet: ethers.Signer,
  dstExecutionParams: ExecutionParameters,
  dstProtocol: string,
  encodedWormholeMessage: Uint8Array,
  circleBridgeMessage: string,
  circleAttestation: string
): Promise<TransactionReceipt> {
  throw new Error("swap in not implemented");
  /*
  const swapContractParams = dstExecutionParams.crossChainSwap;

  const contractWithSigner = makeCrossChainSwapEvmContract(
    dstWallet,
    dstProtocol,
    swapContractParams.address
  );

  return evmSwapExactInFromVaaNative(
    contractWithSigner,
    encodedWormholeMessage,
    circleBridgeMessage,
    circleAttestation
  );
  */
}

interface VaaSearchParams {
  sequence: string;
  emitterAddress: string;
}

export function makeEvmProvider(tokenAddress: string) {
  let url;
  switch (tokenAddress) {
    case ETH_TOKEN_INFO.address:
      url = EVM_RPC_MAP[getEvmChainId(CHAIN_ID_ETH) || -1];
      break;
    case AVAX_TOKEN_INFO.address:
      url = EVM_RPC_MAP[getEvmChainId(CHAIN_ID_AVAX) || -1];
      break;
    case MOONBEAM_TOKEN_INFO.address:
      url = EVM_RPC_MAP[getEvmChainId(CHAIN_ID_MOONBEAM) || -1];
      break;
    case BSC_TOKEN_INFO.address:
      url = EVM_RPC_MAP[getEvmChainId(CHAIN_ID_BSC) || -1];
      break;
    default:
      throw Error("unrecognized token address");
  }
  if (!url) {
    throw Error("invalid RPC URL");
  }
  return new ethers.providers.StaticJsonRpcProvider(url);
}

export class UniswapToUniswapExecutor {
  // quoting
  quoter: UniswapToUniswapQuoter;
  cachedExactInParams: ExactInCrossParameters | null = null;
  cachedExactOutParams: ExactOutCrossParameters | null = null;
  quoteType: QuoteType | null = null;

  // swapping
  isNative: boolean = true;
  slippage: string = "";
  relayerFeeAmount: string = "";
  srcExecutionParams: ExecutionParameters | null = null;
  dstExecutionParams: ExecutionParameters | null = null;

  // vaa handling
  transportFactory: grpc.TransportFactory | null = null;
  vaaSearchParams: VaaSearchParams | null = null;
  vaaBytes: Uint8Array | null = null;
  circleBridgeMessage: string = "";
  circleAttestation: string = "";

  // receipts
  srcEvmReceipt: TransactionReceipt | null = null;
  dstEvmReceipt: TransactionReceipt | null = null;
  srcTerraReceipt: any;
  dstTerraReceipt: any;

  constructor() {
    this.quoter = new UniswapToUniswapQuoter();
  }

  async initialize(
    tokenInAddress: string,
    tokenOutAddress: string
  ): Promise<void> {
    await this.quoter.initialize(tokenInAddress, tokenOutAddress);

    // now that we have a chain id for each network, get contract info for each chain
    this.srcExecutionParams = makeExecutionParameters(
      this.quoter.getSrcChainId()
    );
    this.dstExecutionParams = makeExecutionParameters(
      this.quoter.getDstChainId()
    );
  }

  setSlippage(slippage: string): void {
    this.slippage = slippage;
  }

  setRelayerFee(amount: string): void {
    this.relayerFeeAmount = amount;
  }

  areSwapParametersUndefined(): boolean {
    return this.slippage === undefined || this.relayerFeeAmount === undefined;
  }

  setDeadlines(deadline: string): void {
    this.quoter.setDeadlines(deadline);
  }

  async computeAndVerifySrcPoolAddress(): Promise<string> {
    return this.quoter.computeAndVerifySrcPoolAddress();
  }

  async computeAndVerifyDstPoolAddress(): Promise<string> {
    return this.quoter.computeAndVerifyDstPoolAddress();
  }

  async computeQuoteExactIn(amountIn: string): Promise<ExactInCrossParameters> {
    if (this.areSwapParametersUndefined()) {
      throw Error("undefined swap parameters");
    }

    this.cachedExactInParams = await this.quoter.computeExactInParameters(
      amountIn,
      this.slippage,
      this.relayerFeeAmount
    );
    this.quoteType = QuoteType.ExactIn;
    return this.cachedExactInParams;
  }

  async computeQuoteExactOut(
    amountOut: string
  ): Promise<ExactOutCrossParameters> {
    if (this.areSwapParametersUndefined()) {
      throw Error("undefined swap parameters");
    }

    this.cachedExactOutParams = await this.quoter.computeExactOutParameters(
      amountOut,
      this.slippage,
      this.relayerFeeAmount
    );
    this.quoteType = QuoteType.ExactOut;
    return this.cachedExactOutParams;
  }

  getSrcEvmProvider(): ethers.providers.Provider {
    return this.quoter.getSrcEvmProvider()!;
  }

  getDstEvmProvider(): ethers.providers.Provider {
    return this.quoter.getDstEvmProvider()!;
  }

  getTokenInAddress(): string {
    return this.quoter.tokenInAddress;
  }

  getTokenOutAddress(): string {
    return this.quoter.tokenOutAddress;
  }

  async evmApproveAndSwapExactIn(
    srcWallet: ethers.Signer,
    recipientAddress: string
  ): Promise<TransactionReceipt> {
    if (
      !this.cachedExactInParams ||
      !this.srcExecutionParams ||
      !this.dstExecutionParams
    ) {
      throw Error("invalid params");
    }
    return evmApproveAndSwapExactIn(
      this.getSrcEvmProvider(),
      srcWallet,
      this.getTokenInAddress(),
      this.cachedExactInParams,
      this.srcExecutionParams,
      this.dstExecutionParams,
      this.isNative,
      recipientAddress
    );
  }

  async evmApproveAndSwap(
    wallet: ethers.Signer,
    recipientAddress: string
  ): Promise<TransactionReceipt> {
    this.srcEvmReceipt = await this.evmApproveAndSwapExactIn(
      wallet,
      recipientAddress
    );

    this.fetchAndSetEvmEmitterAndSequence();
    return this.srcEvmReceipt;
  }

  fetchAndSetEvmEmitterAndSequence(): void {
    const receipt = this.srcEvmReceipt;
    if (!receipt) {
      throw Error("no swap receipt found");
    }

    const wormholeParams = this.srcExecutionParams?.wormhole;
    if (!wormholeParams) {
      throw Error("wormholeParams is null");
    }

    const emitterAddress =
      (this.srcExecutionParams?.wormhole.circleIntegrationAddress &&
        this.dstExecutionParams?.wormhole.circleIntegrationAddress) ||
      this.srcExecutionParams?.wormhole.chainId === CHAIN_ID_ETH
        ? this.srcExecutionParams?.wormhole.circleIntegrationAddress
        : this.srcExecutionParams?.wormhole.tokenBridgeAddress;

    this.vaaSearchParams = {
      sequence: parseSequenceFromLogEth(
        receipt,
        wormholeParams.coreBridgeAddress
      ),
      emitterAddress: getEmitterAddressEth(emitterAddress!),
    };
  }

  async fetchSignedVaaFromSwap(): Promise<void> {
    // TODO: hit circle api for signature
    const vaaSearchParams = this.vaaSearchParams;
    if (!vaaSearchParams) {
      throw Error("no vaa search params found");
    }
    if (!this.srcExecutionParams) {
      throw Error("srcExecutionParams is null");
    }
    const sequence = vaaSearchParams.sequence;
    const emitterAddress = vaaSearchParams.emitterAddress;
    // wait for VAA to be signed

    const vaaResponse = await getSignedVAAWithRetry(
      WORMHOLE_RPC_HOSTS,
      this.srcExecutionParams.wormhole.chainId,
      vaaSearchParams.emitterAddress,
      vaaSearchParams.sequence,
      {
        transport: this.transportFactory,
      }
    );
    // grab vaaBytes
    this.vaaBytes = vaaResponse.vaaBytes;
  }

  async fetchVaaAndSwap(wallet: ethers.Signer): Promise<TransactionReceipt> {
    await this.fetchSignedVaaFromSwap();

    this.dstEvmReceipt = await this.evmSwapExactInFromVaa(wallet);

    return this.dstEvmReceipt;
  }

  async evmSwapExactInFromVaa(
    wallet: ethers.Signer
  ): Promise<TransactionReceipt> {
    if (
      !this.dstExecutionParams ||
      !this.cachedExactInParams ||
      !this.vaaBytes
    ) {
      throw Error("invalid params");
    }
    const [circleBridgeMessage, circleAttestation] =
      await handleCircleMessageInLogs(
        this.srcEvmReceipt?.logs || [],
        this.srcExecutionParams?.wormhole.circleEmitterAddress || ""
      );
    if (circleBridgeMessage === null || circleAttestation === null) {
      throw new Error(
        `Error parsing receipt for ${this.srcEvmReceipt?.blockHash}`
      );
    }
    this.circleBridgeMessage = circleBridgeMessage;
    this.circleAttestation = circleAttestation;
    return swapExactInFromVaa(
      this.getDstEvmProvider(),
      wallet,
      this.dstExecutionParams,
      this.cachedExactInParams.dst?.protocol!,
      this.vaaBytes,
      this.circleBridgeMessage,
      this.circleAttestation
    );
  }

  setTransport(transportFactory: grpc.TransportFactory) {
    this.transportFactory = transportFactory;
  }
}
