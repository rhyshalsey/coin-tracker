export const coinGeckoKeys = {
  coingecko: "coingecko" as const,
  trending: () => [coinGeckoKeys.coingecko, "trending" as const],
  search: (query: string) =>
    [coinGeckoKeys.coingecko, "search", query] as const,
  getCoin: (symbol: string) =>
    [coinGeckoKeys.coingecko, "symbol", symbol] as const,
  getCoinMarketData: (
    coinId: string,
    vsCurrency: string,
    days: number | string
  ) =>
    [coinGeckoKeys.coingecko, "marketData", coinId, vsCurrency, days] as const,
};

export const queryKeys = {
  coinGeckoKeys,
};

const constants = {
  queryKeys,
};

export enum Timeframes {
  DAYS_1 = "DAYS_1",
  DAYS_7 = "DAYS_7",
  DAYS_14 = "DAYS_14",
  DAYS_30 = "DAYS_30",
  DAYS_90 = "DAYS_90",
  DAYS_180 = "DAYS_180",
  YEARS_1 = "YEARS_1",
  YEARS_5 = "YEARS_5",
  MAX = "MAX",
}

export type TimeframeInfoType = {
  label: string;
  value: string | number;
  showOnMobile: boolean;
};

export const timeframeValues: Record<Timeframes, TimeframeInfoType> = {
  [Timeframes.DAYS_1]: {
    label: "24h",
    value: 1,
    showOnMobile: true,
  },
  [Timeframes.DAYS_7]: {
    label: "7d",
    value: 7,
    showOnMobile: true,
  },
  [Timeframes.DAYS_14]: {
    label: "14d",
    value: 14,
    showOnMobile: false,
  },
  [Timeframes.DAYS_30]: {
    label: "30d",
    value: 30,
    showOnMobile: true,
  },
  [Timeframes.DAYS_90]: {
    label: "90d",
    value: 90,
    showOnMobile: true,
  },
  [Timeframes.DAYS_180]: {
    label: "180d",
    value: 180,
    showOnMobile: false,
  },
  [Timeframes.YEARS_1]: {
    label: "1y",
    value: 365,
    showOnMobile: true,
  },
  [Timeframes.YEARS_5]: {
    label: "5y",
    value: 1825,
    showOnMobile: false,
  },
  [Timeframes.MAX]: {
    label: "Max",
    value: "max",
    showOnMobile: true,
  },
};

export default constants;
