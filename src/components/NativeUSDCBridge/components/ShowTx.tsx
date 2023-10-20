import {
  ChainId,
  CHAIN_ID_AVAX,
  CHAIN_ID_ETH,
  CHAIN_ID_MOONBEAM,
  CHAIN_ID_BSC,
} from "@certusone/wormhole-sdk";
import { Box, Button, Link, Typography } from "@mui/material";
import { getExplorerName } from "../utils/consts";

export default function ShowTx({
  chainId,
  txHash,
}: {
  chainId: ChainId;
  txHash: string;
}) {
  const explorerAddress =
    chainId === CHAIN_ID_ETH
      ? `https://goerli.etherscan.io/tx/${txHash}`
      : chainId === CHAIN_ID_AVAX
      ? `https://testnet.snowtrace.io/tx/${txHash}`
      : chainId === CHAIN_ID_MOONBEAM
      ? `https://moonbase.moonscan.io/tx/${txHash}`
      : chainId === CHAIN_ID_BSC
      ? `https://testnet.bscscan.com/tx/${txHash}`
      : undefined;
  const explorerName = getExplorerName(chainId);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography noWrap component="div" variant="body2">
        {txHash}
      </Typography>
      <Button
        sx={{ my: 1 }}
        href={explorerAddress}
        target="_blank"
        rel="noreferrer"
        variant="outlined"
        component={Link}
      >
        View on {explorerName}
      </Button>
    </Box>
  );
}
