import { useQuery } from "react-query";
import { coinGeckoKeys } from "src/constants";
import { fetcher } from "src/utils/request";

export default function useCoinMarketData(
  coinId: string,
  vsCurrency: string,
  days: number | string
) {
  const { data, isLoading, isError } = useQuery(
    coinGeckoKeys.getCoinMarketData(coinId, vsCurrency, days),
    ({ queryKey: [, , coinId, vsCurrency, days] }) =>
      getCoinMarketData(coinId, vsCurrency, days),
    {
      enabled: !!coinId,
    }
  );

  return {
    coinMarketData: data,
    isLoading,
    isError,
  };
}

async function getCoinMarketData(
  coinId: string,
  vsCurrency: string,
  days: number | string
) {
  return await fetcher(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`
  );
}
