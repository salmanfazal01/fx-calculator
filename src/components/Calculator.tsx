import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  PositionSizeResult,
  calculatePositionSize,
  pipValue,
} from "../utils/helpers";
import { symbols } from "../utils/symbols";

const LS_NAME = "NEPPHEW_SAM_CALCULATOR";

const ResultItem: React.FC<{ title: string; value: number | string }> = ({
  title,
  value,
}) => (
  <Stack spacing={1} sx={{ textAlign: "center" }}>
    <Typography variant="body2">{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Stack>
);

const Calculator = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true);
  const [accountBalance, setAccountBalance] = useState(100000);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [slPips, setSlPips] = useState(10);
  const [tpPips, setTpPips] = useState(30);
  const [baseSymbol, setBaseSymbol] = useState("EUR");
  const [quoteSymbol, setQuoteSymbol] = useState("USD");
  const [customPipValue, setCustomPipValue] = useState(0);

  const [result, setResult] = useState<PositionSizeResult>({
    riskAmountUSD: "$0.00",
    lotSize: "0",
    potentialProfitUSD: "$0.00",
  });

  const handleSubmit = () => {
    const _result = calculatePositionSize(
      accountBalance,
      riskPercentage,
      slPips,
      tpPips,
      baseSymbol,
      quoteSymbol,
      customPipValue
    );

    setResult(_result);
  };

  useEffect(() => {
    if (loading) {
      const _data = localStorage.getItem(LS_NAME);

      if (_data) {
        const retrievedData = JSON.parse(_data);

        setAccountBalance(retrievedData.accountBalance);
        setRiskPercentage(retrievedData.riskPercentage);
        setBaseSymbol(retrievedData.baseSymbol);
        setQuoteSymbol(retrievedData.quoteSymbol);

        setLoading(false);
      }
    }
  }, [loading]);

  // Save to localstorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        LS_NAME,
        JSON.stringify({
          accountBalance,
          riskPercentage,
          baseSymbol,
          quoteSymbol,
        })
      );
    }
  }, [accountBalance, riskPercentage, baseSymbol, quoteSymbol, loading]);

  useEffect(() => {
    if (baseSymbol && quoteSymbol) {
      setCustomPipValue(pipValue[`${baseSymbol}${quoteSymbol}`]);
    } else {
      setCustomPipValue(0.0001);
    }
  }, [baseSymbol, quoteSymbol]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-evenly"
        sx={{
          backgroundColor: "rgba(92,114,128,1)",
          p: 3,
          width: "100%",
          borderRadius: "16px",
          mb: 5,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 3px",
        }}
      >
        <ResultItem title="Amount to Risk" value={`${result.riskAmountUSD}`} />

        <Divider orientation="vertical" flexItem />

        <ResultItem title="Standard Lots" value={result.lotSize} />

        {/* <Divider orientation="vertical" flexItem />

        <ResultItem
          title="Potential Profit"
          value={`$${result.potentialProfitUSD}`}
        /> */}
      </Stack>

      <Stack spacing={3}>
        {/* Account Balance */}
        <TextField
          label="Account Balance"
          fullWidth
          size="small"
          value={accountBalance}
          onChange={(e) =>
            setAccountBalance(parseInt(e.target.value || "1000"))
          }
        />

        {/* Risk Percentage */}
        <TextField
          label="Risk Percentage"
          fullWidth
          size="small"
          value={riskPercentage}
          onChange={(e) => setRiskPercentage(parseInt(e.target.value || "1"))}
        />

        {/* SL Pips */}
        <TextField
          label="SL Pips"
          fullWidth
          size="small"
          type="number"
          value={slPips}
          onChange={(e) => setSlPips(parseInt(e.target.value || "10"))}
        />

        {/* TP Pips */}
        {/* <TextField
          label="TP Pips"
          fullWidth
          type="number"
          value={tpPips}
          onChange={(e) => setTpPips(parseInt(e.target.value || "30"))}
        /> */}

        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Base Symbol */}
          <FormControl fullWidth size="small">
            <InputLabel>Base Symbol</InputLabel>
            <Select
              value={baseSymbol}
              label="Base Symbol"
              onChange={(e) => setBaseSymbol(e.target.value)}
            >
              {symbols &&
                Object.keys(symbols).map((_key) => {
                  if (!symbols[_key].quote.length) return null;

                  return (
                    <MenuItem key={_key} value={_key}>
                      {_key}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          {/* Quote Symbol */}
          <FormControl fullWidth size="small">
            <InputLabel>Quote Symbol</InputLabel>
            <Select
              value={quoteSymbol}
              label="Quote Symbol"
              onChange={(e) => setQuoteSymbol(e.target.value)}
            >
              {symbols?.[baseSymbol]?.quote?.map((quote: string) => (
                <MenuItem key={quote} value={quote}>
                  {quote}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Pip Value */}
        <TextField
          label="Pip Value (change if your broker is different)"
          fullWidth
          size="small"
          type="number"
          value={customPipValue}
          onChange={(e) =>
            setCustomPipValue(parseInt(e.target.value || "0.0001"))
          }
        />

        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          sx={{ mt: { md: "40px!important" } }}
          onClick={handleSubmit}
        >
          Calculate
        </Button>
      </Stack>

      <Box sx={{ position: "absolute", right: 0, left: 0, bottom: "24px" }}>
        <Typography sx={{ textAlign: "center" }}>
          Created by{" "}
          <Typography
            component="a"
            href="https://twitter.com/Nephew_Sam_"
            sx={{ color: "inherit" }}
          >
            Nephew_Sam_
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Calculator;
