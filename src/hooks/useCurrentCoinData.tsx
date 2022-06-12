import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { RootState } from "src/utils/store";
import { fetcher } from "src/utils/request";

import { coinGeckoKeys } from "src/constants";

/**
 * Gets the coin data from the currently selected coin in the stored in Redux
 * @returns {Object} The coin data, loading status and error status
 */
export default function useCurrentCoinData() {
  const currentCoinId = useSelector(
    (state: RootState) => state.app.currentCoinId
  );

  const { data, isLoading, isError } = useQuery(
    coinGeckoKeys.getCoin(currentCoinId),
    ({ queryKey: [, , symbol] }) => getCoinData(symbol),
    {
      enabled: !!currentCoinId,
    }
  );

  return {
    coin: data,
    isLoading,
    isError,
  };
}

async function getCoinData(id: string) {
  return await fetcher(`https://api.coingecko.com/api/v3/coins/${id}`);
}
