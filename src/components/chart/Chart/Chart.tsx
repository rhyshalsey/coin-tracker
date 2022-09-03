import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

import { RootState } from "src/utils/store";

import useCoinMarketData from "src/hooks/useCoinMarketData";

import styles from "./Chart.module.scss";

const Chart = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const chartRef = useRef(null);

  const currentCoinId = useSelector(
    (state: RootState) => state.app.currentCoinId
  );

  const { coinMarketData, isLoading, isError } = useCoinMarketData(
    currentCoinId,
    "usd",
    14
  );

  // console.log(coinMarketData);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateWindowDimensions);

    updateWindowDimensions();

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    if (
      !coinMarketData?.prices ||
      coinMarketData.prices.length <= 0 ||
      !chartRef.current
    ) {
      return;
    }

    const priceData: [number, number][] = coinMarketData.prices;

    const chartElem = d3.select(chartRef.current);

    const x = d3
      .scaleTime()
      .domain([
        new Date(priceData[0][0]),
        new Date(priceData[priceData.length - 1][0]),
      ])
      .range([30, windowDimensions.width]);

    chartElem
      .select<SVGSVGElement>(".xAxis")
      .attr("transform", `translate(0, ${windowDimensions.height - 20})`)
      .call(d3.axisBottom(x));

    const yRange = d3.extent(
      priceData,
      (d: [number, number]) => d[1]
    ) as number[];

    const y = d3
      .scaleLinear()
      .domain(yRange)
      .range([windowDimensions.height - 30, 0]);

    chartElem
      .select<SVGSVGElement>(".yAxis")
      .attr("transform", `translate(20, 0)`)
      .call(d3.axisLeft(y));

    const line = d3
      .line(coinMarketData.prices)
      .x((d) => {
        return x(new Date(d[0]));
      })
      .y((d) => {
        return y(d[1]);
      });

    chartElem
      .select("path")
      .datum(priceData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [coinMarketData, windowDimensions]);

  return (
    <div className={styles.chartContainer}>
      <svg
        ref={chartRef}
        viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}
      >
        <path />
        <g className="xAxis" />
        <g className="yAxis" />
      </svg>
    </div>
  );
};

export default Chart;
