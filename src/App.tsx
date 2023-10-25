import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { EthereumProviderProvider } from "./components/NativeUSDCBridge/contexts/EthereumProviderContext";
import NativeSwap from "./components/NativeUSDCBridge/components/NativeSwap";
import TopLayout from "./TopLayout";
import { NoSplit } from "./components/NativeUSDCBridge/components/NoSplit";
import PoweredByIcon from "./components/NativeUSDCBridge/components/PoweredBy";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <EthereumProviderProvider>
        <TopLayout>
          <Container>
            <Box sx={{ mt: 8, textAlign: "center" }}>
              <Typography variant="h2" component="h1">
                <NoSplit>Native Swap Demo</NoSplit>{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <NativeSwap />
              <Box sx={{ mt: 4 }}>
                <PoweredByIcon color="white" />
              </Box>
            </Box>
          </Container>
        </TopLayout>
      </EthereumProviderProvider>
    </SnackbarProvider>
  );
};

export default App;
