import { useCallback, useEffect, useRef } from "react";
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
  const chartInfoContainerRef = useRef<HTMLDivElement>(null);

  const { coin: coinData, isLoading: coinDataLoading } = useCurrentCoinData();

  const dispatch = useDispatch();

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

      dispatch(
        windowResized({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        })
      );
    };

    window.addEventListener("resize", updateWindowDimensions);

    updateWindowDimensions();

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [dispatch]);

  const calculateChartHeight = useCallback(() => {
    if (!windowHeight) {
      return 0;
    }

    if (!chartInfoContainerRef.current) {
      return windowHeight;
    }

    const contentHeight =
      windowHeight - chartInfoContainerRef.current.offsetHeight;

    return Math.max(500, Math.min(contentHeight, 800));
  }, [windowHeight]);

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
          <div id={styles.priceInfoContainer} ref={chartInfoContainerRef}>
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
          <Chart
            chartWidth={windowWidth}
            chartHeight={calculateChartHeight()}
          />
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
