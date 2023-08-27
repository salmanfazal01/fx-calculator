import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NScreen from "./neumorphism/Screen";
import {
  PositionSizeResult,
  calculatePositionSize,
  pipValue,
} from "../utils/helpers";
import NButton from "./neumorphism/Button";
import NTextField from "./neumorphism/TextField";
import NSelect from "./neumorphism/Select";
import { symbols } from "../utils/symbols";

const LS_NAME = "NEPPHEW_SAM_CALCULATOR";

const ResultItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={1} sx={{ textAlign: "center", flex: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography
        variant={isXs || value.length > 8 ? "h5" : "h4"}
        sx={{ fontWeight: 500 }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

const CalculatorNew = () => {
  const [loading, setLoading] = useState(true);
  const [accountBalance, setAccountBalance] = useState("100000");
  const [riskPercentage, setRiskPercentage] = useState("1");
  const [slPips, setSlPips] = useState("10");
  const [tpPips, setTpPips] = useState("30");
  const [baseSymbol, setBaseSymbol] = useState("EUR");
  const [quoteSymbol, setQuoteSymbol] = useState("USD");
  const [customPipValue, setCustomPipValue] = useState("0");

  const [result, setResult] = useState<PositionSizeResult>({
    riskAmountUSD: "0.00",
    lotSize: "0",
    potentialProfitUSD: "$0.00",
  });

  const handleSubmit = () => {
    const _result = calculatePositionSize(
      parseFloat(accountBalance),
      parseFloat(riskPercentage),
      parseFloat(slPips),
      parseFloat(tpPips),
      baseSymbol,
      quoteSymbol,
      parseFloat(customPipValue)
    );

    setResult(_result);
  };

  useEffect(() => {
    if (loading) {
      const _data = localStorage.getItem(LS_NAME);

      if (_data) {
        const retrievedData = JSON.parse(_data);

        setAccountBalance(retrievedData.accountBalance || "1000");
        setRiskPercentage(retrievedData.riskPercentage || "1");
        setBaseSymbol(retrievedData.baseSymbol || "EUR");
        setQuoteSymbol(retrievedData.quoteSymbol || "USD");

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
      const val = pipValue[`${baseSymbol}${quoteSymbol}`];
      setCustomPipValue(String(val));
    } else {
      setCustomPipValue("0.0001");
    }
  }, [baseSymbol, quoteSymbol]);

  useEffect(() => {
    if (riskPercentage.startsWith(".")) {
      setRiskPercentage((old) => old.replace(".", "0."));
    }
  }, [riskPercentage]);

  return (
    <Box
      sx={{
        height: "100%",
        px: { xs: 3, md: 5 },
        py: { xs: 4, md: 7 },
      }}
    >
      {/* Screen */}
      <NScreen>
        <Stack direction="row" justifyContent="space-evenly" spacing={2}>
          <ResultItem title="Risk" value={`$${result.riskAmountUSD}`} />

          <Divider orientation="vertical" flexItem />

          <ResultItem title="Lots" value={result.lotSize} />
        </Stack>
      </NScreen>

      <Stack
        sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 4, md: 5 } }}
        spacing={{ xs: 2, md: 3 }}
      >
        <NTextField
          label="Account Balance"
          type="number"
          inputProps={{
            min: 0,
            max: 100000000,
          }}
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
        />

        <NTextField
          label="Risk Percentage"
          type="number"
          inputProps={{
            step: "0.5",
            min: 0,
            max: 100,
          }}
          value={riskPercentage}
          onChange={(e) => setRiskPercentage(e.target.value)}
        />

        <NTextField
          label="SL Pips"
          type="number"
          inputProps={{
            step: "1",
            min: 0,
            max: 100000000,
          }}
          value={slPips}
          onChange={(e) => setSlPips(e.target.value)}
        />

        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Base Symbol */}
          <NSelect
            label="Base Symbol"
            items={Object.keys(symbols)}
            value={baseSymbol}
            onChange={(e: any) => setBaseSymbol(e.target.value)}
          />

          {/* Quote Symbol */}
          <NSelect
            label="Quote Symbol"
            items={symbols?.[baseSymbol]?.quote || []}
            value={quoteSymbol}
            onChange={(e: any) => setQuoteSymbol(e.target.value)}
          />
        </Stack>

        <NTextField
          label="Pip Value"
          type="number"
          inputProps={{
            step: "0.001",
            min: 0,
            max: 10,
          }}
          value={customPipValue}
          onChange={(e) => setCustomPipValue(e.target.value)}
        />
      </Stack>

      {/* Calculate Button */}
      <NButton onClick={handleSubmit}>Calculate</NButton>
    </Box>
  );
};

export default CalculatorNew;
