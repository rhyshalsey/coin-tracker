// Simplified coin response from CoinGeckoAPI
// Received from calls to /coins/list for example
export type Cryptocurrency = Readonly<{
  id: string;
  large: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  thumb: string;
}>;
