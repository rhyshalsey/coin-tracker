import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { mint, slate } from "@radix-ui/colors";

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

    // Create y axis
    const yRange = d3.extent(
      priceData,
      (d: [number, number]) => d[1]
    ) as number[];

    const y = d3
      .scaleLinear()
      .domain(yRange)
      .range([windowDimensions.height - 30, 0]);

    const yAxisElem = chartElem.select<SVGSVGElement>(".yAxis");
    yAxisElem.selectAll("*").remove();
    yAxisElem.call(d3.axisLeft(y));

    // Dynamically set yAxis to align to left of parent
    const yAxisWidth = yAxisElem.node()?.getBBox().width || 60;
    yAxisElem.attr("transform", `translate(${yAxisWidth}, 0)`);

    // Draw custom yAxis lines
    yAxisElem
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", windowDimensions.height - 20)
      .attr("y2", 0)
      .attr("stroke", slate.slate11);

    yAxisElem
      .selectAll(".tick")
      .selectAll("line")
      .attr("x2", windowDimensions.width)
      .attr("stroke", slate.slate11)
      .attr("opacity", 0.35);

    // Remove y axis default lines
    yAxisElem.selectAll(".domain").remove();

    // Create x axis
    const x = d3
      .scaleTime()
      .domain([
        new Date(priceData[0][0]),
        new Date(priceData[priceData.length - 1][0]),
      ])
      .range([yAxisWidth, windowDimensions.width]);

    const xAxisElem = chartElem.select<SVGSVGElement>(".xAxis");
    xAxisElem.selectAll("*").remove();

    xAxisElem
      .attr("transform", `translate(0, ${windowDimensions.height - 20})`)
      .call(d3.axisBottom(x));

    // Draw custom x axis lines
    xAxisElem
      .append("line")
      .attr("x1", yAxisWidth)
      .attr("x2", windowDimensions.width)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", slate.slate11);

    // Remove x axis default lines
    xAxisElem.selectAll(".tick").selectAll("line").remove();
    xAxisElem.selectAll(".domain").remove();

    // Create chart's line
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
      .attr("class", "chartLine")
      .attr("fill", "none")
      .attr("stroke", mint.mint11)
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [coinMarketData, windowDimensions]);

  return (
    <div className={styles.chartContainer}>
      <svg
        ref={chartRef}
        viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}
      >
        <g className="yAxis" />
        <path />
        <g className="xAxis" />
      </svg>
    </div>
  );
};

export default Chart;
