import {
  CHAIN_ID_BSC,
  CHAIN_ID_MOONBEAM,
  ChainId,
  parseVaa,
} from "@certusone/wormhole-sdk";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  Container,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ButtonWithLoader from "./ButtonWithLoader";
import ChainSelectArrow from "./ChainSelectArrow";
import KeyAndBalance from "./KeyAndBalance";
import NumberTextField from "./NumberTextField";
import { useEthereumProvider } from "../contexts/EthereumProviderContext";
import useIsWalletReady from "../hooks/useIsWalletReady";
import { UniswapToUniswapExecutor } from "../swapper/swapper";
import { CHAINS, TOKEN_INFOS, WORMHOLE_RPC_HOSTS } from "../utils/consts";
import { switchEvmProviderNetwork } from "../utils/ethereum";
import { fetchTargetChainEvent } from "../utils/fetchRedeemedEvent";
import ShowTx from "./ShowTx";
import { getSignedVAAWithRetry } from "@certusone/wormhole-sdk";
import ChainSelect from "./ChainSelect";
import { useSnackbar } from "notistack";
import parseError from "../utils/parseError";

const infoContainer = {
  display: "flex",
  textAlign: "left",
  mt: 2,
  mb: 1,
  mx: 0,
};

// TODO: call this function on the order router: function defaultRelayerFee() external view returns (uint256);
const RELAYER_FEE_USDC = "0";
const DEADLINE = "300";

function NativeSwap() {
  const [sourceChain, setSourceChain] = useState<ChainId>(CHAIN_ID_MOONBEAM);
  const [targetChain, setTargetChain] = useState<ChainId>(CHAIN_ID_BSC);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [executor, setExecutor] = useState<UniswapToUniswapExecutor | null>(
    null
  );
  const [isSwapping, setIsSwapping] = useState(false);
  const [isComputingQuote, setIsComputingQuote] = useState(false);
  const [hasQuote, setHasQuote] = useState(false);
  const { provider, signer, signerAddress, disconnect } = useEthereumProvider();
  const [isSourceSwapComplete, setIsSourceSwapComplete] = useState(false);
  const [isTargetSwapComplete, setIsTargetSwapComplete] = useState(false);
  const [targetTxHash, setTargetTxHash] = useState("");
  const [relayerTimeoutString, setRelayerTimeoutString] = useState("");
  const [balance, setBalance] = useState<ethers.BigNumber | null>(null);
  const [slippage, setSlippage] = useState("0.5");

  const { isReady, statusMessage } = useIsWalletReady(
    // TODO: switch to target chain when user must manually redeem
    // isSourceSwapComplete && relayerTimeoutString ? targetChain : sourceChain,
    sourceChain,
    true
  );

  const sourceTokenInfo = TOKEN_INFOS.find((t) => t.chainId === sourceChain)!;
  const targetTokenInfo = TOKEN_INFOS.find((t) => t.chainId === targetChain)!;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      if (!isReady) {
        setBalance(null);
        return;
      }
      try {
        if (signer) {
          setBalance(await signer.getBalance());
        }
      } catch (e) {
        setBalance(null);
        console.error(e);
      }
    })();
  }, [signer, isReady]);

  useEffect(() => {
    (async () => {
      if (provider) {
        await switchEvmProviderNetwork(provider, sourceTokenInfo.chainId);
      }
    })();
  }, [sourceTokenInfo, provider]);

  const computeQuote = useCallback(() => {
    (async () => {
      setHasQuote(false);
      setIsComputingQuote(true);
      setAmountOut("");
      try {
        if (parseFloat(amountIn) > 0) {
          const executor = new UniswapToUniswapExecutor();
          await executor.initialize(
            sourceTokenInfo.address,
            targetTokenInfo.address
          );
          await executor.computeAndVerifySrcPoolAddress().catch((e) => {
            throw new Error("failed to verify source pool address");
          });
          await executor.computeAndVerifyDstPoolAddress().catch((e) => {
            throw new Error("failed to verify dest pool address");
          });
          const slippageDecimal = parseFloat(slippage) / 100;
          executor.setSlippage(slippageDecimal.toString());
          executor.setRelayerFee(RELAYER_FEE_USDC);
          executor.setDeadlines(DEADLINE);
          const quote = await executor.computeQuoteExactIn(amountIn);
          setExecutor(executor);
          setAmountOut(parseFloat(quote.minAmountOut).toFixed(8));
          setHasQuote(true);
        }
      } catch (e) {
        console.error(e);
        enqueueSnackbar(parseError(e), { variant: "error" });
      }
      setIsComputingQuote(false);
    })();
  }, [sourceTokenInfo, targetTokenInfo, amountIn, slippage, enqueueSnackbar]);

  const debouncedComputeQuote = useDebouncedCallback(computeQuote, 1000);

  useEffect(() => {
    debouncedComputeQuote();
  }, [sourceTokenInfo, targetTokenInfo, amountIn, debouncedComputeQuote]);

  const handleAmountChange = useCallback((event: any) => {
    setAmountIn(event.target.value);
  }, []);

  const handleSlippageChange = useCallback((event: any) => {
    setSlippage(event.target.value);
  }, []);

  const handleMaxClick = useCallback(() => {
    if (balance) {
      setAmountIn(
        parseFloat(
          parseFloat(ethers.utils.formatEther(balance || 0)).toFixed(8)
        ).toString()
      );
    }
  }, [balance]);

  const handleSwitch = useCallback(() => {
    setSourceChain(targetChain);
    setTargetChain(sourceChain);
    setAmountIn("");
    setAmountOut("");
  }, [sourceChain, targetChain]);

  const reset = useCallback(() => {
    setIsSwapping(false);
    setHasQuote(false);
    setIsSourceSwapComplete(false);
    setIsTargetSwapComplete(false);
    setAmountIn("");
    setAmountOut("");
    setRelayerTimeoutString("");
    disconnect();
  }, [disconnect]);

  const handleSourceChange = useCallback(
    (event: any) => {
      setSourceChain((prev) => {
        if (event.target.value === targetChain) {
          setTargetChain(prev);
        }
        return event.target.value;
      });
    },
    [targetChain]
  );

  const handleTargetChange = useCallback(
    (event: any) => {
      setTargetChain((prev) => {
        if (event.target.value === sourceChain) {
          setSourceChain(prev);
        }
        return event.target.value;
      });
    },
    [sourceChain]
  );

  const handleSwapClick = useCallback(async () => {
    if (
      provider &&
      signer &&
      signerAddress &&
      executor &&
      executor.srcExecutionParams &&
      executor.dstExecutionParams
    ) {
      try {
        setIsSwapping(true);
        setIsSourceSwapComplete(false);
        setIsTargetSwapComplete(false);
        setRelayerTimeoutString("");

        const sourceReceipt = await executor.evmApproveAndSwap(
          signer,
          signerAddress
        );
        console.log("sourceChainTxHash:", sourceReceipt.transactionHash);
        setIsSourceSwapComplete(true);

        if (!executor.vaaSearchParams) {
          throw Error("vaaSearchParams is not set");
        }
        // Wait for the guardian network to reach consensus and emit the signedVAA
        const { vaaBytes } = await getSignedVAAWithRetry(
          WORMHOLE_RPC_HOSTS,
          executor.srcExecutionParams.wormhole.chainId,
          executor.vaaSearchParams.emitterAddress,
          executor.vaaSearchParams.sequence
        );

        const sequence = parseVaa(vaaBytes).sequence;

        // Check if the signedVAA has redeemed by the relayer
        let event: ethers.Event | null = null;
        let retries = 0;
        const targetProvider = executor.getDstEvmProvider();
        while (!event && retries <= 20) {
          try {
            event = await fetchTargetChainEvent(
              targetProvider,
              executor.srcExecutionParams,
              executor.dstExecutionParams,
              sequence.toString()
            );
          } catch (e) {
            console.error(e);
          }
          ++retries;

          if (!event) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
        if (event) {
          setTargetTxHash(event.transactionHash);
          setIsTargetSwapComplete(true);
          console.log(`targetChainTxHash: ${event.transactionHash}`);
          enqueueSnackbar("Transfer complete!", { variant: "success" });
          setIsSwapping(false);
        } else {
          setRelayerTimeoutString("Timed out waiting for relayer.");
          setIsTargetSwapComplete(false);
          enqueueSnackbar("Timed out waiting for relayer.", {
            variant: "warning",
          });
          // TODO: If the relayer hasn't redeemed the signedVAA, then manually redeem it ourselves
        }
      } catch (e: any) {
        reset();
        console.error(e);
        enqueueSnackbar(parseError(e), { variant: "error" });
      }
    }
  }, [provider, signer, signerAddress, executor, reset, enqueueSnackbar]);

  const readyToSwap = provider && signer && hasQuote && isReady;

  const shouldLockFields =
    isSwapping ||
    isComputingQuote ||
    isSourceSwapComplete ||
    isTargetSwapComplete;

  useEffect(() => {
    if (isSwapping) {
      window.onbeforeunload = () => true;
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [isSwapping]);

  return (
    <Container
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",
        border: "0.5px solid rgba(255, 255, 255, 0.35)",
        marginTop: "32px",
        maxWidth: { xs: 590 },
        minWidth: { md: 590 },
      }}
    >
      <KeyAndBalance chainId={sourceTokenInfo.chainId} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "160px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            "& > .MuiTypography-root": {
              marginTop: "8px",
            },
          }}
        >
          <Typography fontSize={20}>Source</Typography>
          <ChainSelect
            chains={CHAINS}
            variant="outlined"
            select
            fullWidth
            value={sourceChain}
            onChange={handleSourceChange}
          />
          <NumberTextField
            label={`Send (${sourceTokenInfo.name})`}
            fullWidth
            sx={{ marginTop: 2 }}
            value={amountIn}
            onChange={handleAmountChange}
            disabled={shouldLockFields}
            onMaxClick={balance ? handleMaxClick : undefined}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            marginTop: "42px",
            position: "relative",
            width: "32px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <ChainSelectArrow
              onClick={handleSwitch}
              disabled={shouldLockFields}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            "& > .MuiTypography-root": {
              marginTop: "8px",
            },
          }}
        >
          <Typography fontSize={20}>Target</Typography>
          <ChainSelect
            chains={CHAINS}
            variant="outlined"
            select
            fullWidth
            value={targetChain}
            onChange={handleTargetChange}
          />
          <NumberTextField
            label={`Receive (${targetTokenInfo.name})`}
            fullWidth
            sx={{ marginTop: 2 }}
            value={amountOut}
            onChange={handleAmountChange}
            disabled={true}
          />
        </Box>
      </Box>
      <Box sx={infoContainer}>
        <Typography variant="body2" style={{ flexGrow: 1 }}>
          Source Balance
        </Typography>
        <Typography variant="body2">
          {`${+parseFloat(ethers.utils.formatEther(balance || 0)).toFixed(8)} ${
            sourceTokenInfo.name
          }`}
        </Typography>
      </Box>
      <Box sx={infoContainer}>
        <Typography variant="body2" style={{ flexGrow: 1 }}>
          Relayer Fee
        </Typography>
        <Typography variant="body2">{`${RELAYER_FEE_USDC} USDC`}</Typography>
      </Box>
      <Box sx={{ ...infoContainer, alignItems: "center" }}>
        <Typography variant="body2" style={{ flexGrow: 1 }}>
          Slippage Tolerance
        </Typography>
        <TextField
          value={slippage}
          select
          onChange={handleSlippageChange}
          disabled={shouldLockFields}
        >
          <MenuItem value={"0.5"}>0.5%</MenuItem>
          <MenuItem value={"1"}>1%</MenuItem>
          <MenuItem value={"1.5"}>1.5%</MenuItem>
          <MenuItem value={"2"}>2%</MenuItem>
        </TextField>
      </Box>
      <ButtonWithLoader
        disabled={!readyToSwap || isSwapping || isSourceSwapComplete}
        onClick={handleSwapClick}
        showLoader={isSwapping}
        error={statusMessage}
      >
        Confirm and proceed with transfer
      </ButtonWithLoader>
      {!statusMessage && isSwapping ? (
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.warning.light,
            marginTop: 1,
            textAlign: "center",
          }}
        >
          {!isSourceSwapComplete ? (
            "Waiting for wallet approval and confirmation..."
          ) : !isTargetSwapComplete && !relayerTimeoutString ? (
            "Waiting for relayer..."
          ) : !isTargetSwapComplete && relayerTimeoutString ? (
            relayerTimeoutString
          ) : (
            <>&nbsp;</>
          )}
        </Typography>
      ) : null}
      <Box
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stepper
          activeStep={
            isTargetSwapComplete
              ? 3
              : relayerTimeoutString
              ? 2
              : isSourceSwapComplete
              ? 1
              : 0
          }
          alternativeLabel
          sx={{
            width: "100%",
            mb: 1,
            "& .MuiStepLabel-root .Mui-active": { color: "white" },
          }}
        >
          <Step>
            <StepLabel>Source Swap</StepLabel>
          </Step>
          <Step>
            <StepLabel>Relay</StepLabel>
          </Step>
          <Step>
            <StepLabel>Target Swap</StepLabel>
          </Step>
        </Stepper>
        {targetTxHash ? (
          <ShowTx chainId={targetTokenInfo.chainId} txHash={targetTxHash} />
        ) : (
          <>&nbsp;</>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ErrorIcon sx={{ color: "#58ECEC", mr: 1 }} />
          <Typography
            sx={{
              color: "#58ECEC",
            }}
          >
            This is a testnet release only; prices don't reflect reality.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default NativeSwap;
