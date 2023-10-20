import { ethers } from "ethers";

import { UniswapV3Router as EthRouter } from "./uniswap-v3";
import { HurricaneswapRouter as AvaxRouter } from "./hurricaneswap";
import {
  ETH_TOKEN_INFO,
  AVAX_TOKEN_INFO,
  getEvmChainId,
  MOONBEAM_TOKEN_INFO,
  BSC_TOKEN_INFO,
  MOONBEAM_UNISWAP_POOL_ADDRESS,
  BSC_UNISWAP_POOL_ADDRESS,
  getOrderRouterAddress,
  ORDER_ROUTER_ABI,
} from "../utils/consts";
import { addFixedAmounts, subtractFixedAmounts } from "../utils/math";
import { UsdcLocation } from "./generic";
import {
  ExactInParameters,
  ExactOutParameters,
  makeExactInParameters,
  makeExactOutParameters,
} from "./uniswap-core";
import {
  ChainId,
  CHAIN_ID_ETH,
  CHAIN_ID_AVAX,
  CHAIN_ID_MOONBEAM,
  CHAIN_ID_BSC,
} from "@certusone/wormhole-sdk";
import { EVM_RPC_MAP } from "../utils/metaMaskChainParameters";
import { UniswapV2Router } from "./uniswap-v2";

export { PROTOCOL as PROTOCOL_UNISWAP_V2 } from "./uniswap-v2";
export { PROTOCOL as PROTOCOL_UNISWAP_V3 } from "./uniswap-v3";

export enum QuoteType {
  ExactIn = 1,
  ExactOut,
}

export function makeEvmProviderFromAddress(tokenAddress: string) {
  switch (tokenAddress) {
    case ETH_TOKEN_INFO.address: {
      return new ethers.providers.StaticJsonRpcProvider(
        EVM_RPC_MAP[getEvmChainId(CHAIN_ID_ETH) || ""]
      );
    }
    case AVAX_TOKEN_INFO.address: {
      return new ethers.providers.StaticJsonRpcProvider(
        EVM_RPC_MAP[getEvmChainId(CHAIN_ID_AVAX) || ""]
      );
    }
    case MOONBEAM_TOKEN_INFO.address: {
      return new ethers.providers.StaticJsonRpcProvider(
        EVM_RPC_MAP[getEvmChainId(CHAIN_ID_MOONBEAM) || ""]
      );
    }
    case BSC_TOKEN_INFO.address: {
      return new ethers.providers.StaticJsonRpcProvider(
        EVM_RPC_MAP[getEvmChainId(CHAIN_ID_BSC) || ""]
      );
    }
    default: {
      throw Error("unrecognized evm token address");
    }
  }
}

export function getChainIdFromAddress(tokenAddress: string) {
  switch (tokenAddress) {
    case ETH_TOKEN_INFO.address: {
      return CHAIN_ID_ETH;
    }
    case AVAX_TOKEN_INFO.address: {
      return CHAIN_ID_AVAX;
    }
    case MOONBEAM_TOKEN_INFO.address: {
      return CHAIN_ID_MOONBEAM;
    }
    case BSC_TOKEN_INFO.address: {
      return CHAIN_ID_BSC;
    }
    default: {
      throw Error("unrecognized evm token address");
    }
  }
}

async function makeRouter(tokenAddress: string, loc: UsdcLocation) {
  switch (tokenAddress) {
    case ETH_TOKEN_INFO.address: {
      const provider = makeEvmProviderFromAddress(tokenAddress);
      const router = new EthRouter(provider);
      await router.initialize(loc);
      return router;
    }
    case AVAX_TOKEN_INFO.address: {
      const provider = makeEvmProviderFromAddress(tokenAddress);
      const router = new AvaxRouter(provider);
      await router.initialize(loc);
      return router;
    }
    case MOONBEAM_TOKEN_INFO.address: {
      const provider = makeEvmProviderFromAddress(tokenAddress);
      const router = new UniswapV2Router(provider, CHAIN_ID_MOONBEAM);
      router.setFixedPoolAddress(MOONBEAM_UNISWAP_POOL_ADDRESS);
      await router.initializeTokens(MOONBEAM_TOKEN_INFO, loc);
      return router;
    }
    case BSC_TOKEN_INFO.address: {
      const provider = makeEvmProviderFromAddress(tokenAddress);
      const router = new UniswapV2Router(provider, CHAIN_ID_BSC);
      router.setFixedPoolAddress(BSC_UNISWAP_POOL_ADDRESS);
      await router.initializeTokens(BSC_TOKEN_INFO, loc);
      return router;
    }
    default: {
      throw Error("unrecognized chain id");
    }
  }
}

function splitSlippageInHalf(totalSlippage: string): string {
  const divisor = ethers.FixedNumber.from("2");
  return ethers.FixedNumber.from(totalSlippage)
    .divUnsafe(divisor)
    .round(4)
    .toString();
}

export interface RelayerFee {
  amount: string;
  tokenAddress: string;
}

export interface ExactInCrossParameters {
  amountIn: string;
  usdcAmountIn: string;
  minAmountOut: string;
  src: ExactInParameters | undefined;
  dst: ExactInParameters | undefined;
  relayerFee: RelayerFee;
  wormholeSlippage: ethers.BigNumber;
}

export interface ExactOutCrossParameters {
  amountOut: string;
  usdcAmountIn: string;
  maxAmountIn: string;
  src: ExactOutParameters | undefined;
  dst: ExactOutParameters | undefined;
  relayerFee: RelayerFee;
}

export class UniswapToUniswapQuoter {
  // tokens
  tokenInAddress: string = "";
  tokenOutAddress: string = "";

  // routers
  srcRouter: EthRouter | AvaxRouter | UniswapV2Router | null = null;
  dstRouter: EthRouter | AvaxRouter | UniswapV2Router | null = null;

  async initialize(tokenInAddress: string, tokenOutAddress: string) {
    if (tokenInAddress !== this.tokenInAddress) {
      this.tokenInAddress = tokenInAddress;
      this.srcRouter = await makeRouter(tokenInAddress, UsdcLocation.Out);
    }

    if (tokenOutAddress !== this.tokenOutAddress) {
      this.tokenOutAddress = tokenOutAddress;
      this.dstRouter = await makeRouter(tokenOutAddress, UsdcLocation.In);
    }
  }

  async computeAndVerifySrcPoolAddress(): Promise<string> {
    return this.srcRouter?.computeAndVerifyPoolAddress() || "";
  }

  async computeAndVerifyDstPoolAddress(): Promise<string> {
    return this.dstRouter?.computeAndVerifyPoolAddress() || "";
  }

  computeSwapSlippage(slippage: string): string {
    return splitSlippageInHalf(slippage);
  }

  getRelayerFee(amount: string): RelayerFee {
    if (!this.srcRouter) {
      throw Error("srcRouter uninitialized");
    }
    const relayerFee: RelayerFee = {
      amount: this.srcRouter.computeUnitAmountOut(amount),
      tokenAddress: this.srcRouter.getTokenOutAddress(),
    };
    return relayerFee;
  }

  makeSrcExactInParameters(
    amountIn: string,
    minAmountOut: string
  ): ExactInParameters | undefined {
    // @ts-ignore
    return makeExactInParameters(this.srcRouter, amountIn, minAmountOut);
  }

  makeDstExactInParameters(
    amountIn: string,
    minAmountOut: string
  ): ExactInParameters | undefined {
    // @ts-ignore
    return makeExactInParameters(this.dstRouter, amountIn, minAmountOut);
  }

  async computeExactInParameters(
    amountIn: string,
    slippage: string,
    relayerFeeUsdc: string
  ): Promise<ExactInCrossParameters> {
    if (!this.srcRouter) {
      throw Error("srcRouter uninitialized");
    }
    if (!this.dstRouter) {
      throw Error("dstRouter uninitialized");
    }
    const singleSlippage = this.computeSwapSlippage(slippage);

    // src quote
    const srcRouter = this.srcRouter;
    // proceeds (in USDC) from the first swap
    const srcMinAmountOut = await srcRouter.fetchExactInQuote(
      amountIn,
      singleSlippage
    );
    console.log(`sourcePoolMinAmountOut: ${srcMinAmountOut}`);

    // compute the wormhole minAmountOut
    const orderRouterAddress = getOrderRouterAddress(srcRouter.chainId);
    if (!orderRouterAddress) {
      throw Error("orderRouterAddress uninitialized");
    }
    const contract = new ethers.Contract(
      orderRouterAddress,
      ORDER_ROUTER_ABI,
      srcRouter.getProvider()
    );
    const parsedSrcMinAmountOut = ethers.utils.parseUnits(
      srcMinAmountOut,
      srcRouter.tokenOut.getDecimals()
    );
    console.log(parsedSrcMinAmountOut.toString(), this.getDstChainId());
    const orderRouterMinAmountOut = await contract.computeMinAmountOut(
      parsedSrcMinAmountOut,
      this.getDstChainId(),
      0,
      0
    );
    console.log(
      `orderRouterMinAmountOut: ${orderRouterMinAmountOut.toString()}`
    );

    // dst quote
    const dstRouter = this.dstRouter;
    const dstAmountIn = ethers.utils.formatUnits(
      orderRouterMinAmountOut,
      srcRouter.tokenOut.getDecimals()
    );
    if (Number(dstAmountIn) < Number(relayerFeeUsdc)) {
      throw Error(
        `srcAmountOut <= relayerFeeUsdc. ${dstAmountIn} vs ${relayerFeeUsdc}`
      );
    }
    console.log(`destinationPoolAmountIn: ${dstAmountIn}`);

    const wormholeSlippage = parsedSrcMinAmountOut.sub(
      ethers.BigNumber.from(orderRouterMinAmountOut)
    );
    console.log(`wormholeSlippage: ${wormholeSlippage.toString()}`);

    const dstAmountInAfterFee = subtractFixedAmounts(
      dstAmountIn,
      relayerFeeUsdc,
      dstRouter.getTokenInDecimals()
    );

    const dstMinAmountOut = await dstRouter.fetchExactInQuote(
      dstAmountInAfterFee,
      singleSlippage
    );

    // organize parameters
    const params: ExactInCrossParameters = {
      amountIn: amountIn,
      usdcAmountIn: dstAmountInAfterFee,
      minAmountOut: dstMinAmountOut,
      src: this.makeSrcExactInParameters(amountIn, srcMinAmountOut),
      dst: this.makeDstExactInParameters(dstAmountInAfterFee, dstMinAmountOut),
      relayerFee: this.getRelayerFee(relayerFeeUsdc),
      wormholeSlippage,
    };
    return params;
  }

  makeSrcExactOutParameters(
    amountOut: string,
    maxAmountIn: string
  ): ExactOutParameters | undefined {
    // @ts-ignore
    return makeExactOutParameters(this.srcRouter, amountOut, maxAmountIn);
  }

  makeDstExactOutParameters(
    amountOut: string,
    maxAmountIn: string
  ): ExactOutParameters | undefined {
    // @ts-ignore
    return makeExactOutParameters(this.dstRouter, amountOut, maxAmountIn);
  }

  async computeExactOutParameters(
    amountOut: string,
    slippage: string,
    relayerFeeUsdc: string
  ): Promise<ExactOutCrossParameters> {
    if (!this.srcRouter) {
      throw Error("srcRouter uninitialized");
    }
    if (!this.dstRouter) {
      throw Error("dstRouter uninitialized");
    }
    const singleSlippage = splitSlippageInHalf(slippage);

    // dst quote first
    const dstRouter = this.dstRouter;
    const dstMaxAmountIn = await dstRouter.fetchExactOutQuote(
      amountOut,
      singleSlippage
    );

    // src quote
    const srcRouter = this.srcRouter;
    const srcAmountOut = dstMaxAmountIn;
    if (Number(srcAmountOut) < Number(relayerFeeUsdc)) {
      throw Error(
        `dstAmountIn <= relayerFeeUsdc. ${srcAmountOut} vs ${relayerFeeUsdc}`
      );
    }

    const srcAmountOutBeforeFee = addFixedAmounts(
      srcAmountOut,
      relayerFeeUsdc,
      srcRouter.getTokenOutDecimals()
    );

    const srcMaxAmountIn = await srcRouter.fetchExactOutQuote(
      srcAmountOutBeforeFee,
      singleSlippage
    );

    // organize parameters
    const params: ExactOutCrossParameters = {
      amountOut: amountOut,
      usdcAmountIn: dstMaxAmountIn,
      maxAmountIn: srcMaxAmountIn,
      src: this.makeSrcExactOutParameters(
        srcAmountOutBeforeFee,
        srcMaxAmountIn
      ),
      dst: this.makeDstExactOutParameters(amountOut, dstMaxAmountIn),
      relayerFee: this.getRelayerFee(relayerFeeUsdc),
    };
    return params;
  }

  setDeadlines(deadline: string): void {
    // @ts-ignore
    this.srcRouter.setDeadline(deadline);
    // @ts-ignore
    this.dstRouter.setDeadline(deadline);
  }

  getSrcEvmProvider(): ethers.providers.Provider | undefined {
    // @ts-ignore
    return this.srcRouter.getProvider();
  }

  getDstEvmProvider(): ethers.providers.Provider | undefined {
    // @ts-ignore
    return this.dstRouter.getProvider();
  }

  getSrcChainId(): ChainId {
    return getChainIdFromAddress(this.tokenInAddress);
  }

  getDstChainId(): ChainId {
    return getChainIdFromAddress(this.tokenOutAddress);
  }
}
