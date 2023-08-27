import { CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import CalculatorNew from "./components/Calculator";
import NPaper from "./components/neumorphism/Paper";
import lightTheme from "./config/lightTheme";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100%",
          // background: `url(${MainBg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >
        <NPaper>
          <CalculatorNew />
        </NPaper>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
          }}
          color="text.disabled"
        >
          Created by{" "}
          <Typography
            variant="body2"
            color="text.disabled"
            component="a"
            href="https://twitter.com/Nephew_Sam_"
            target="_blank"
            sx={{ color: "inherit" }}
          >
            Nephew_Sam_
          </Typography>
        </Typography>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
