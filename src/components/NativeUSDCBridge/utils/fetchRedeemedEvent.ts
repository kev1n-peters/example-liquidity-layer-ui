import { Contract, ethers } from "ethers";
import {
  CHAIN_ID_AVAX,
  CHAIN_ID_ETH,
  CHAIN_ID_MOONBEAM,
  ChainId,
  getEmitterAddressEth,
} from "@certusone/wormhole-sdk";
import { ExecutionParameters } from "../swapper/swapper";
import { EVM_RPC_MAP } from "./metaMaskChainParameters";
import {
  AVAX_MATCHING_ENGINE_ADDRESS,
  CIRCLE_INTEGRATION_ADDRESS_AVALANCHE,
  EVM_AVAX_NETWORK_CHAIN_ID,
  getOrderRouterAddress,
  getTokenBridgeAddressForChain,
} from "./consts";

const fetchEvent = async (
  provider: ethers.providers.Provider,
  contract: Contract,
  eventFilter: ethers.EventFilter
) => {
  const currentBlock = await provider.getBlockNumber();
  const events = await contract.queryFilter(eventFilter, currentBlock - 100);
  return events ? events[0] : null;
};

const fetchRedeemedEvent = async (
  provider: ethers.providers.Provider,
  contractAddress: string,
  emitterChainId: ChainId,
  emitterAddress: string,
  sequence: string
) => {
  const abi = [
    "event Redeemed(uint16 indexed emitterChainId, bytes32 indexed emitterAddress, uint64 indexed sequence)",
  ];
  const contract = new Contract(contractAddress, abi, provider);
  const eventFilter = await contract.filters.Redeemed(
    emitterChainId,
    `0x${emitterAddress}`,
    sequence
  );
  return await fetchEvent(provider, contract, eventFilter);
};

const fetchOrderExecutedEvent = async (
  provider: ethers.providers.Provider,
  contractAddress: string,
  emitterChainId: ChainId,
  emitterAddress: string,
  sequence: string
) => {
  const abi = [
    "event OrderExecuted(uint16 indexed emitterChainId, bytes32 indexed emitterAddress, uint64 indexed sequence, uint64 newSequence, bool orderFilled)",
  ];
  const contract = new Contract(contractAddress, abi, provider);
  const eventFilter = await contract.filters.OrderExecuted(
    emitterChainId,
    `0x${emitterAddress}`,
    sequence
  );
  return await fetchEvent(provider, contract, eventFilter);
};

const fetchFillRedeemedEvent = async (
  provider: ethers.providers.Provider,
  contractAddress: string,
  emitterChainId: ChainId,
  emitterAddress: string,
  sequence: string
) => {
  const abi = [
    "event FillRedeemed(uint16 indexed emitterChainId, bytes32 indexed emitterAddress, uint64 indexed sequence)",
  ];
  const contract = new Contract(contractAddress, abi, provider);
  const eventFilter = await contract.filters.FillRedeemed(
    emitterChainId,
    `0x${emitterAddress}`,
    sequence
  );
  return await fetchEvent(provider, contract, eventFilter);
};

export const fetchTargetChainEvent = async (
  targetProvider: ethers.providers.Provider,
  srcExecutionParams: ExecutionParameters,
  dstExecutionParams: ExecutionParameters,
  sequence: string
) => {
  // if both chains support CCTP then it's used instead of going through the matching engine on avalanche
  // e.g. from ethereum to avalanche
  if (
    srcExecutionParams.wormhole.circleIntegrationAddress &&
    dstExecutionParams.wormhole.circleIntegrationAddress
  ) {
    return await fetchRedeemedEvent(
      targetProvider,
      dstExecutionParams.wormhole.circleIntegrationAddress,
      srcExecutionParams.wormhole.chainId,
      getEmitterAddressEth(
        srcExecutionParams.wormhole.circleIntegrationAddress
      ),
      sequence
    );
  }
  // special case between ethereum and moonbeam since ethereum USDC on moonbeam is canonical
  // token bridge transfer is used
  if (
    (srcExecutionParams.wormhole.chainId === CHAIN_ID_ETH &&
      dstExecutionParams.wormhole.chainId === CHAIN_ID_MOONBEAM) ||
    (srcExecutionParams.wormhole.chainId === CHAIN_ID_MOONBEAM &&
      dstExecutionParams.wormhole.chainId === CHAIN_ID_ETH)
  ) {
    const targetOrderRouterAddress = getOrderRouterAddress(
      dstExecutionParams.wormhole.chainId
    );
    return await fetchFillRedeemedEvent(
      targetProvider,
      targetOrderRouterAddress,
      srcExecutionParams.wormhole.chainId,
      getEmitterAddressEth(srcExecutionParams.wormhole.tokenBridgeAddress),
      sequence
    );
  }
  // special case to/from avalanche since the matching engine will not emit an event
  // token bridge transfer is used (except when going to ethereum which uses CCTP)
  if (srcExecutionParams.wormhole.chainId === CHAIN_ID_AVAX) {
    const targetOrderRouterAddress = getOrderRouterAddress(
      dstExecutionParams.wormhole.chainId
    );
    return await fetchFillRedeemedEvent(
      targetProvider,
      targetOrderRouterAddress,
      srcExecutionParams.wormhole.chainId,
      getEmitterAddressEth(srcExecutionParams.wormhole.tokenBridgeAddress),
      sequence
    );
  }
  // otherwise the matching engine on avalanche will emit an event with a new sequence number
  // that can be used to find the redeemed event on the target chain
  const url = EVM_RPC_MAP[EVM_AVAX_NETWORK_CHAIN_ID];
  if (!url) throw new Error("no rpc url");
  const avaxProvider = new ethers.providers.JsonRpcProvider(url);
  const event = await fetchOrderExecutedEvent(
    avaxProvider,
    AVAX_MATCHING_ENGINE_ADDRESS,
    srcExecutionParams.wormhole.chainId,
    getEmitterAddressEth(
      srcExecutionParams.wormhole.chainId === CHAIN_ID_ETH
        ? srcExecutionParams.wormhole.circleIntegrationAddress
        : srcExecutionParams.wormhole.tokenBridgeAddress
    ),
    sequence
  );
  if (!event) return null;
  const newSequence = event?.args?.newSequence;
  const orderFilled = event?.args?.orderFilled;
  if (!orderFilled) {
    throw new Error("order not filled");
  }
  const targetOrderRouterAddress = getOrderRouterAddress(
    dstExecutionParams.wormhole.chainId
  );
  return await fetchFillRedeemedEvent(
    targetProvider,
    targetOrderRouterAddress,
    CHAIN_ID_AVAX,
    // CCTP route will be used if available on the source and target chain
    // When transferring to avax in this case, the token bridge transfers to itself
    getEmitterAddressEth(
      dstExecutionParams.wormhole.circleIntegrationAddress &&
        dstExecutionParams.wormhole.chainId !== CHAIN_ID_AVAX
        ? CIRCLE_INTEGRATION_ADDRESS_AVALANCHE
        : getTokenBridgeAddressForChain(CHAIN_ID_AVAX)
    ),
    newSequence.toString()
  );
};
