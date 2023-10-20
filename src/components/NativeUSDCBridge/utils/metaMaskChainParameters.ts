// https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain as per EIP-3085
export interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

// https://chainid.network/chains.json for chain info
export const METAMASK_CHAIN_PARAMETERS: {
  [evmChainId: number]: AddEthereumChainParameter;
} = {
  5: {
    chainId: "0x5",
    chainName: "Görli",
    nativeCurrency: { name: "Görli Ether", symbol: "GOR", decimals: 18 },
    rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  97: {
    chainId: "0x61",
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-testnet.publicnode.com	"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  1287: {
    chainId: "0x507",
    chainName: "Moonbase Alpha",
    nativeCurrency: {
      name: "Glimmer",
      symbol: "GLMR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.moonbeam.network"],
    blockExplorerUrls: ["https://moonbase.moonscan.io/"],
  },
  43113: {
    chainId: "0xa869",
    chainName: "Avalanche Fuji Testnet",
    nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
  },
};

export interface EvmRpcMap {
  [chainId: string]: string;
}

export const EVM_RPC_MAP = Object.entries(METAMASK_CHAIN_PARAMETERS).reduce(
  (evmRpcMap, [evmChainId, { rpcUrls }]) => {
    if (rpcUrls.length > 0) {
      evmRpcMap[evmChainId] = rpcUrls[0];
    }
    return evmRpcMap;
  },
  {} as EvmRpcMap
);
