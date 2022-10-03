import * as d3 from "d3";

export const generateYAxis = (
  domain: number[],
  range: Iterable<number>,
  axisElem: d3.Selection<any, any, any, any>,
  numTicks: number,
  tickFormat?: (domainValue: d3.NumberValue, index: number) => string
) => {
  const scale = d3.scaleLinear().domain(domain).range(range);

  axisElem.selectAll("*").remove();

  const axis = d3.axisLeft(scale).ticks(numTicks);

  if (tickFormat) {
    axis.tickFormat(tickFormat);
  }

  axisElem.call(axis);

  return { scale, axis };
};

export const generateXAxis = (
  domain: number[],
  range: Iterable<number>,
  axisElem: d3.Selection<any, any, any, any>,
  numTicks: number,
  tickFormat?: (domainValue: d3.NumberValue, index: number) => string
) => {
  const scale = scale.domain(domain).range(range);

  axisElem.selectAll("*").remove();

  const axis = d3.axisBottom(scale).ticks(numTicks);

  if (tickFormat) {
    axis.tickFormat(tickFormat);
  }

  axisElem.call(axis);

  return { scale, axis };
};
