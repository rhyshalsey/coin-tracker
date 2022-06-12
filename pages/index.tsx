import type { NextPage } from "next";
import { useSelector } from "react-redux";
import Head from "next/head";

import Search from "@/components/Search/Search";
import SymbolSummary from "@/components/currency/SymbolSummary/SymbolSummary";

import { RootState } from "src/utils/store";

import useCurrentCoinData from "src/hooks/useCurrentCoinData";

import styles from "styles/pages/Home.module.scss";

const Home: NextPage = () => {
  const { coin: coinData, isLoading: coinDataLoading } = useCurrentCoinData();
  console.log(coinData);

  const currency = useSelector((state: RootState) => state.app.currentCurrency);

  return (
    <div id={styles.homeContainer} className="page">
      <Head>
        <title>Coin Tracker</title>
        <meta name="description" content="Check out Crypto prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Search />
        {coinData && (
          <div>
            <SymbolSummary
              symbol="btc"
              currency={currency}
              marketCap={coinData?.market_data?.market_cap[currency]}
            />
          </div>
        )}
        {!coinData && <h1>Select a cryptocurrency to begin</h1>}
      </div>
    </div>
  );
};

export default Home;
