type PipValue = {
  [pair: string]: number;
};

export const pipValue: PipValue = {
  // Major Forex Pairs
  AUDUSD: 0.0001,
  AUDCAD: 0.0001,
  AUDCHF: 0.0001,
  AUDJPY: 0.01,
  AUDNZD: 0.0001,
  USDCAD: 0.0001,
  USDCHF: 0.0001,
  USDJPY: 0.01,
  EURUSD: 0.0001,
  EURCAD: 0.0001,
  EURCHF: 0.0001,
  EURJPY: 0.01,
  EURGBP: 0.0001,
  EURAUD: 0.0001,
  GBPAUD: 0.0001,
  GBPUSD: 0.0001,
  GBPJPY: 0.01,
  NZDUSD: 0.0001,
  NZDCAD: 0.0001,
  NZDCHF: 0.0001,
  NZDJPY: 0.01,
  CADJPY: 0.01,
  CHFJPY: 0.01,

  // Add more pairs as needed

  // Metals
  XAUUSD: 0.01, // Gold

  // Indices and Commodities
  WTIUSD: 0.01, // WTI Crude Oil
  NASUSD: 1, // NASDAQ
  SPXUSD: 1, // S&P 500

  // Add more symbols as needed
};

export type PositionSizeResult = {
  riskAmountUSD: string;
  lotSize: string;
  potentialProfitUSD: string;
};

export function calculatePositionSize(
  accountBalance: number,
  riskPercentage: number,
  stopLossPips: number,
  takeProfitPips: number,
  baseSymbol: string,
  quoteSymbol: string,
  customPipValue?: number
): PositionSizeResult | null {
  const pair = `${baseSymbol}${quoteSymbol}`;
  const selectedPipValue = customPipValue || pipValue[pair];

  if (!selectedPipValue) {
    console.error(`Pip value not found for ${pair}`);
    return null;
  }

  if (riskPercentage <= 0 || riskPercentage > 100) {
    console.error(`Invalid risk percentage: ${riskPercentage}`);
    return null;
  }

  const dollarRisk = (accountBalance * riskPercentage) / 100;
  const lotSize = dollarRisk / (selectedPipValue * stopLossPips) / 100000;

  const potentialProfitUSD = lotSize * selectedPipValue * takeProfitPips;

  return {
    riskAmountUSD: dollarRisk.toFixed(2),
    lotSize: lotSize.toFixed(2),
    potentialProfitUSD: potentialProfitUSD.toFixed(2),
  };
}
