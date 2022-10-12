import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { mint, slate } from "@radix-ui/colors";
import classNames from "classnames";

import { RootState } from "src/utils/store";

import useCoinMarketData from "src/hooks/useCoinMarketData";

import styles from "./Chart.module.scss";

type ChartProps = {
  chartWidth: number;
  chartHeight: number;
};

const Chart = ({ chartWidth, chartHeight }: ChartProps) => {
  const chartRef = useRef(null);

  // Refs for animating chart line drawing
  const chartDrawIndexRef = useRef(0);
  const chartDrawIntervalRef = useRef<ReturnType<typeof setInterval>>();

  const currentCoinId = useSelector(
    (state: RootState) => state.app.currentCoinId
  );

  const currentCurrency = useSelector(
    (state: RootState) => state.app.currentCurrency
  );

  const { coinMarketData, isLoading, isError } = useCoinMarketData(
    currentCoinId,
    "usd",
    14
  );

  useEffect(() => {
    const windowResized = () => {
      if (chartDrawIntervalRef.current) {
        clearInterval(chartDrawIntervalRef.current);
      }
    };

    window.addEventListener("resize", windowResized);

    // windowResized();

    return () => {
      window.removeEventListener("resize", windowResized);
    };
  }, []);

  const drawChart = useCallback(() => {
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
      .range([chartHeight - 30, 0]);

    const yAxisElem = chartElem.select<SVGSVGElement>(".yAxis");
    yAxisElem.selectAll("*").remove();

    const yAxis = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currentCurrency.toUpperCase(),
          maximumFractionDigits: 8,
        }).format(d as number);
      });

    yAxisElem.call(yAxis);

    const yAxisTicks = yAxisElem.selectAll(".tick");

    // Set font styles on yAxis
    yAxisTicks
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", slate.slate9);

    // Dynamically set yAxis to align to left of parent
    const yAxisWidth = yAxisElem.node()?.getBBox().width || 60;
    yAxisElem.attr("transform", `translate(${yAxisWidth}, 0)`);

    // Draw custom yAxis lines
    yAxisElem
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", chartHeight - 20)
      .attr("y2", 0)
      .attr("stroke", slate.slate11);

    yAxisTicks
      .selectAll("line")
      .attr("x2", chartWidth)
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
      .range([yAxisWidth, chartWidth]);

    const xAxisElem = chartElem.select<SVGSVGElement>(".xAxis");
    xAxisElem.selectAll("*").remove();

    const xAxis = d3
      .axisBottom(x)
      .ticks(10)
      .tickFormat((d) => d3.timeFormat("%d %a")(d as Date));

    xAxisElem
      .attr("transform", `translate(0, ${chartHeight - 20})`)
      .call(xAxis);

    const xAxisTicks = xAxisElem.selectAll(".tick");

    // Set font styles on yAxis
    xAxisTicks
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", slate.slate9);

    // Draw custom x axis lines
    xAxisElem
      .append("line")
      .attr("x1", yAxisWidth)
      .attr("x2", chartWidth)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", slate.slate11);

    // Remove x axis default lines
    xAxisElem.selectAll(".tick").selectAll("line").remove();
    xAxisElem.selectAll(".domain").remove();

    if (chartDrawIntervalRef.current) {
      clearInterval(chartDrawIntervalRef.current);
      chartDrawIndexRef.current = 0;
    }

    // This will make the chart draw one point at a time to make it look animated
    // Creates an interval which adds a point to the line data array
    chartDrawIntervalRef.current = setInterval(() => {
      // Make sure we don't go past the price data length
      chartDrawIndexRef.current = Math.min(
        chartDrawIndexRef.current + 2, // Update 2 data points at a time to reduce animation/computation time
        priceData.length
      );

      const currentPriceData = priceData.slice(0, chartDrawIndexRef.current);

      if (
        chartDrawIntervalRef.current &&
        chartDrawIndexRef.current >= priceData.length
      ) {
        clearInterval(chartDrawIntervalRef.current);
        chartDrawIndexRef.current = 0;
      }

      // Create chart's price line
      const line = d3
        .line(coinMarketData.prices)
        .x((d) => {
          return x(new Date(d[0]));
        })
        .y((d) => {
          return y(d[1]);
        });

      chartElem
        .select("#chartLine")
        .datum(currentPriceData)
        .attr("class", "")
        .attr("fill", "none")
        .attr("stroke", mint.mint11)
        .attr("stroke-width", 2)
        .attr("d", line);
    }, 20);
  }, [coinMarketData?.prices, currentCurrency, chartHeight, chartWidth]);

  const drawLoadingChart = useCallback(() => {
    const chartElem = d3.select(chartRef.current);

    const fakeData: [number, number][] = Array.from(Array(300)).map(
      (_v, index) => [Math.random() * index + index, index]
    );

    // Create y axis
    const yRange = d3.extent(
      fakeData,
      (d: [number, number]) => d[0]
    ) as number[];

    const y = d3
      .scaleLinear()
      .domain(yRange)
      .range([chartHeight - 30, 0]);

    const yAxisElem = chartElem.select<SVGSVGElement>(".yAxis");
    yAxisElem.selectAll("*").remove();

    // Dynamically set yAxis to align to left of parent
    const yAxisWidth = yAxisElem.node()?.getBBox().width || 60;

    const yAxis = d3.axisLeft(y).ticks(5);

    yAxisElem.call(yAxis);

    const yAxisTicks = yAxisElem.selectAll(".tick");
    yAxisTicks.selectAll("text  ").remove();

    yAxisTicks
      .append("rect")
      .attr("class", classNames(styles.skeleton))
      .attr("width", "50px")
      .attr("height", "20px")
      .attr("rx", styles.roundCorners)
      .attr("transform", "translate(0, -10)");

    yAxisTicks
      .selectAll("line")
      .attr("x1", yAxisWidth)
      .attr("x2", chartWidth)
      .attr("stroke", slate.slate11)
      .attr("opacity", 0.35);

    // Remove y axis default lines
    yAxisElem.selectAll(".domain").remove();

    // Create x axis
    const xRange = d3.extent(
      fakeData,
      (d: [number, number]) => d[1]
    ) as number[];

    const x = d3.scaleLinear().domain(xRange).range([yAxisWidth, chartWidth]);

    const xAxisElem = chartElem.select<SVGSVGElement>(".xAxis");
    xAxisElem.selectAll("*").remove();

    const xAxis = d3.axisBottom(x).ticks(5);

    xAxisElem
      .attr("transform", `translate(0, ${chartHeight - 20})`)
      .call(xAxis);

    xAxisElem.selectAll("path").remove();

    const xAxisTicks = xAxisElem.selectAll(".tick");

    xAxisTicks.selectAll("*").remove();

    xAxisTicks
      .append("rect")
      .attr("class", classNames(styles.skeleton))
      .attr("width", "100px")
      .attr("height", "20px")
      .attr("rx", styles.roundCorners)
      .attr("transform", "translate(0, 5)");

    const line = d3
      .line(fakeData as any)
      .x((d) => {
        return x(d[1]);
      })
      .y((d) => {
        return y(d[0]);
      });

    chartElem
      .select("#chartLine")
      .datum(fakeData)
      .attr("class", classNames(styles.chartLine, styles.skeleton))
      .attr("fill", "none")
      .attr("stroke", slate.slate11)
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [chartHeight, chartWidth]);

  // Chart is drawn in this useEffect
  useEffect(() => {
    if (isLoading) {
      drawLoadingChart();
    } else {
      drawChart();
    }
  }, [drawChart, drawLoadingChart, isLoading]);

  return (
    <div className={styles.chartContainer}>
      <svg ref={chartRef} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        <g className="yAxis" />
        <path id="chartLine" />
        <g className="xAxis" />
      </svg>
    </div>
  );
};

export default Chart;
