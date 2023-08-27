import React from "react";
import { Stack, ThemeProvider, CssBaseline } from "@mui/material";
import MainBg from "../src/assets/images/mainBg.png";
import GlassContainer from "./components/GlassContainer";
import Calculator from "./components/Calculator";
import darkTheme from "./config/darkTheme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100%",
          background: `url(${MainBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <GlassContainer>
          <Calculator />
        </GlassContainer>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
