import { useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import Search from "@/components/ui/Search/Search";
import SymbolSummary from "@/components/currency/SymbolSummary/SymbolSummary";
import PriceAction from "@/components/currency/PriceAction/PriceAction";
import Chart from "@/components/chart/Chart/Chart";

import { RootState } from "src/utils/store";

import useCurrentCoinData from "src/hooks/useCurrentCoinData";

import styles from "styles/pages/Home.module.scss";
import { windowResized } from "src/features/appSlice";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const windowUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const { coin: coinData, isLoading: coinDataLoading } = useCurrentCoinData();

  const currency = useSelector((state: RootState) => state.app.currentCurrency);

  const { windowWidth, windowHeight } = useSelector((state: RootState) => ({
    windowHeight: state.app.windowHeight,
    windowWidth: state.app.windowWidth,
  }));

  useEffect(() => {
    const updateWindowDimensions = () => {
      if (!window) {
        return;
      }

      if (windowUpdateTimeoutRef.current) {
        clearTimeout(windowUpdateTimeoutRef.current);
      }

      // Because drawing the chart dynamically is intensive,
      // only update the window dimensions after a short delay
      windowUpdateTimeoutRef.current = setTimeout(() => {
        dispatch(
          windowResized({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
          })
        );
      }, 1000);
    };

    window.addEventListener("resize", updateWindowDimensions);

    updateWindowDimensions();

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [dispatch]);

  return (
    <div id={styles.homeContainer} className="page">
      <Head>
        <title>Coin Tracker</title>
        <meta name="description" content="Check out Crypto prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      {(coinData || coinDataLoading) && (
        <>
          <div id={styles.priceInfoContainer}>
            <SymbolSummary
              icon={coinData?.image.small}
              symbol={coinData?.symbol}
              currency={currency}
              marketCap={coinData?.market_data?.market_cap[currency]}
              isLoading={coinDataLoading}
            />
            <PriceAction
              price={coinData?.market_data?.current_price[currency]}
              percentage={
                coinData?.market_data?.price_change_percentage_24h_in_currency[
                  currency
                ]
              }
              currency={currency}
              isLoading={coinDataLoading}
            />
          </div>
          <Chart chartWidth={windowWidth} chartHeight={windowHeight} />
        </>
      )}
      {!coinData && !coinDataLoading && (
        <div id={styles.welcomeMessage}>
          <h1>Select a cryptocurrency to begin</h1>
          <h4 className="subtitle">
            Use the search bar at the top to find a cryptocurrency
          </h4>
        </div>
      )}
    </div>
  );
};

export default Home;
