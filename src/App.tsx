import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { EthereumProviderProvider } from "./components/NativeUSDCBridge/contexts/EthereumProviderContext";
import NativeSwap from "./components/NativeUSDCBridge/components/NativeSwap";
import TopLayout from "./TopLayout";
import { NoSplit } from "./components/NativeUSDCBridge/components/NoSplit";
import PoweredByIcon from "./components/NativeUSDCBridge/components/PoweredBy";

const App = () => {
  return (
    <TopLayout>
      <EthereumProviderProvider>
        <Container>
          <Box sx={{ mt: 8, textAlign: "center" }}>
            <Typography variant="h2" component="h1">
              <NoSplit>Liquidity Layer Demo</NoSplit>{" "}
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
      </EthereumProviderProvider>
    </TopLayout>
  );
};

export default App;
