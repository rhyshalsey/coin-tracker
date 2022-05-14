export const coinGeckoKeys = {
  coingecko: "coingecko" as const,
  trending: () => [coinGeckoKeys.coingecko, "trending" as const],
  search: (query: string) =>
    [coinGeckoKeys.coingecko, "search", query] as const,
};

export const queryKeys = {
  coinGeckoKeys,
};

const constants = {
  queryKeys,
};

export default constants;
