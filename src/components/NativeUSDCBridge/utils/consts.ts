import {
  ChainId,
  CHAIN_ID_AVAX,
  CHAIN_ID_ETH,
  CHAIN_ID_MOONBEAM,
  CHAIN_ID_BSC,
  CONTRACTS,
  coalesceChainName,
} from "@certusone/wormhole-sdk";
import avaxIcon from "../icons/avax.svg";
import ethIcon from "../icons/eth.svg";
import moonbeamIcon from "../icons/moonbeam.svg";
import bscIcon from "../icons/bsc.svg";

export interface ChainInfo {
  id: ChainId;
  name: string;
  logo: string;
}

export const CHAINS: ChainInfo[] = [
  {
    id: CHAIN_ID_AVAX,
    name: "Avalanche",
    logo: avaxIcon,
  },
  {
    id: CHAIN_ID_ETH,
    name: "Ethereum (Goerli)",
    logo: ethIcon,
  },
  {
    id: CHAIN_ID_MOONBEAM,
    name: "Moonbeam",
    logo: moonbeamIcon,
  },
  {
    id: CHAIN_ID_BSC,
    name: "Binance Smart Chain",
    logo: bscIcon,
  },
];

export type ChainsById = { [key in ChainId]: ChainInfo };
export const CHAINS_BY_ID: ChainsById = CHAINS.reduce((obj, chain) => {
  obj[chain.id] = chain;
  return obj;
}, {} as ChainsById);

export const getExplorerName = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? "Etherscan"
    : chainId === CHAIN_ID_AVAX
    ? "Snowtrace"
    : chainId === CHAIN_ID_MOONBEAM
    ? "Moonscan"
    : chainId === CHAIN_ID_BSC
    ? "BscScan"
    : "Explorer";

export const WORMHOLE_RPC_HOSTS = [
  "https://wormhole-v2-testnet-api.certus.one",
];

export const getEvmChainId = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? EVM_ETH_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_AVAX
    ? EVM_AVAX_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_MOONBEAM
    ? EVM_MOONBEAM_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_BSC
    ? EVM_BSC_NETWORK_CHAIN_ID
    : undefined;

export const getBridgeAddressForChain = (chainId: ChainId) =>
  CONTRACTS.TESTNET[coalesceChainName(chainId)].core || "";

export const getTokenBridgeAddressForChain = (chainId: ChainId) =>
  CONTRACTS.TESTNET[coalesceChainName(chainId)].token_bridge || "";

export const EVM_ETH_NETWORK_CHAIN_ID = 5;
export const EVM_AVAX_NETWORK_CHAIN_ID = 43113;
export const EVM_MOONBEAM_NETWORK_CHAIN_ID = 1287;
export const EVM_BSC_NETWORK_CHAIN_ID = 97;

// circle integration
export const CIRCLE_INTEGRATION_ADDRESS_ETHEREUM =
  "0x0a69146716b3a21622287efa1607424c663069a4";
export const CIRCLE_INTEGRATION_ADDRESS_AVALANCHE =
  "0x58f4c17449c90665891c42e14d34aae7a26a472e";

// gas
export const APPROVAL_GAS_LIMIT = "100000";

export interface TokenInfo {
  name: string;
  chainName: string;
  address: string;
  chainId: ChainId;
  evmChainId: number | undefined;
  logo: string;
  maxAmount: number;
  usdcPairedAddress: string | undefined;
}

export const ETH_TOKEN_INFO: TokenInfo = {
  name: "ETH",
  chainName: "Ethereum (Goerli)",
  address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  chainId: CHAIN_ID_ETH,
  evmChainId: EVM_ETH_NETWORK_CHAIN_ID,
  logo: ethIcon,
  maxAmount: 0.0001,
  usdcPairedAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
};

export const AVAX_TOKEN_INFO: TokenInfo = {
  name: "AVAX",
  chainName: "Avalanche",
  address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
  chainId: CHAIN_ID_AVAX,
  evmChainId: EVM_AVAX_NETWORK_CHAIN_ID,
  logo: avaxIcon,
  maxAmount: 0.01,
  usdcPairedAddress: "0x5425890298aed601595a70AB815c96711a31Bc65",
};

export const MOONBEAM_TOKEN_INFO: TokenInfo = {
  name: "GLMR",
  chainName: "Moonbeam",
  address: "0xD909178CC99d318e4D46e7E66a972955859670E1",
  chainId: CHAIN_ID_MOONBEAM,
  evmChainId: EVM_MOONBEAM_NETWORK_CHAIN_ID,
  logo: moonbeamIcon,
  maxAmount: 0.01,
  usdcPairedAddress: "0xE5dE10C4b744bac6b783fAF8d9B9fDFF14Acc3c9",
};

export const BSC_TOKEN_INFO: TokenInfo = {
  name: "BNB",
  chainName: "Binance Smart Chain",
  address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  chainId: CHAIN_ID_BSC,
  evmChainId: EVM_BSC_NETWORK_CHAIN_ID,
  logo: bscIcon,
  maxAmount: 0.01,
  usdcPairedAddress: "0x408718c103c8e1759582CDd6dFa8639262807Da5",
};

export const TOKEN_INFOS = [
  ETH_TOKEN_INFO,
  AVAX_TOKEN_INFO,
  MOONBEAM_TOKEN_INFO,
  BSC_TOKEN_INFO,
];

// swap contracts
export const ETH_SWAP_CONTRACT_ADDRESS =
  "0xbd099eA417DBb7E1E634F78F5164562033BF2D06";
export const AVAX_SWAP_CONTRACT_ADDRESS =
  "0x694f0f26485291Ca69C16a2abd5799EB1F7eE7f6";
export const MOONBEAM_SWAP_CONTRACT_ADDRESS =
  "0x824Ea687CD1CC2f2446235D33Ae764CbCd08e18C";
export const BSC_SWAP_CONTRACT_ADDRESS =
  "0xD25643389F3743fE842B8A01a5Ef9790D0f3C029";

// circle emitters
export const ETH_CIRCLE_EMITTER_ADDRESS =
  "0x26413e8157CD32011E726065a5462e97dD4d03D9";
export const AVAX_CIRCLE_EMITTER_ADDRESS =
  "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79";

export const getCircleEmitterAddress = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? ETH_CIRCLE_EMITTER_ADDRESS
    : chainId === CHAIN_ID_AVAX
    ? AVAX_CIRCLE_EMITTER_ADDRESS
    : "";

export const getSupportedSwaps = (tokenInfo: TokenInfo) => {
  return TOKEN_INFOS.filter((x) => x !== tokenInfo);
};

// uniswap pools
export const MOONBEAM_UNISWAP_POOL_ADDRESS =
  "0x3bc5878f5a73cf75dfc0b37e1bd647cc2a5207ca";
export const BSC_UNISWAP_POOL_ADDRESS =
  "0xd74a54509758e2966f1797f6bdee612fbb7448ca";

// order routers
export const ETH_ORDER_ROUTER_ADDRESS =
  "0xBa5FC6A1a92fCB3E611A601F60934397F8f43Ceb";
export const AVAX_ORDER_ROUTER_ADDRESS =
  "0x0F38455859BA5194946aCb40D428b78DFf11789E";
export const MOONBEAM_ORDER_ROUTER_ADDRESS =
  "0x33e4915963e78b79B72a40Fe142C0Ee6e193E4A6";
export const BSC_ORDER_ROUTER_ADDRESS =
  "0x3B51421ECcF81410aa7eb2c518985e5cBCafCc86";

export const getOrderRouterAddress = (chainId: ChainId) => {
  return chainId === CHAIN_ID_ETH
    ? ETH_ORDER_ROUTER_ADDRESS
    : chainId === CHAIN_ID_AVAX
    ? AVAX_ORDER_ROUTER_ADDRESS
    : chainId === CHAIN_ID_MOONBEAM
    ? MOONBEAM_ORDER_ROUTER_ADDRESS
    : chainId === CHAIN_ID_BSC
    ? BSC_ORDER_ROUTER_ADDRESS
    : "";
};

export const ORDER_ROUTER_ABI = [
  "function computeMinAmountOut(uint256 amountIn, uint16 targetChain, uint24 slippage, uint256 relayerFee) external view returns (uint256)",
];

export const SWAP_CONTRACT_ABI = [
  "function swapExactNativeInAndTransfer(ExactInParameters calldata swapParams, address[] calldata path, uint16 targetChainId, uint256 wormholeSlippage) external payable",
];

export const AVAX_MATCHING_ENGINE_ADDRESS =
  "0xF979587977202186c0a21c189d5af01DFf66b9d5";
