import React, { useEffect, useRef, useState } from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3";
import { createAxis, createLegend } from "../../../utils/chartUtils";
import ChartFilters from "../../chartFilters";
import { exportCSV, exportPNG, exportSVG } from "../../../utils/downloadChart";

const RD3Component = rd3.Component;

export interface VisibilityInterface {
  [key: string]: boolean;
}

const formatDateRange = (dateRange: string): string => {
  const [start, end] = dateRange.split("-");

  // Parse the dates
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Extract the necessary parts
  const startMonth = startDate.getMonth() + 1; // Months are 0-based
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();
  const shortYear = endDate.getFullYear().toString().slice(-2); // Get last two digits of the year

  return `${startMonth}/${startDay}-${endMonth}/${endDay} '${shortYear}`;
};

// Function that takes an array of date ranges and returns an array of formatted strings
const formatDateRanges = (dateRanges: string[]): string[] => {
  return dateRanges.map(formatDateRange);
};

const CapacityModelChart: React.FC<{
  data: {
    x: string[];
    y: number[][];
    x_axis_label: string;
    y_labels: string[];
  };
}> = ({ data }) => {
  const [d3Node, setD3Node] = useState<HTMLElement | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>(
    data.y_labels.reduce<{ [key: string]: boolean }>((acc, label) => {
      acc[label] = true;
      return acc;
    }, {})
  );
  const { y, x_axis_label, y_labels } = data;
  const x = formatDateRanges(data.x);
  useEffect(() => {
    const resizeChart = () => {
      if (!chartRef.current) return;
      const { offsetWidth: width, offsetHeight: height } = chartRef.current;
      drawChart(width, height);
    };

    resizeChart();
    window.addEventListener("resize", resizeChart);
    return () => window.removeEventListener("resize", resizeChart);
  }, [data, visibility]);

  const toggleVisibility = (key: keyof VisibilityInterface) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const drawChart = (width: number, height: number) => {
    const margin = { top: 20, right: 20, bottom: 93, left: 45 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = d3
      .select(chartRef.current)
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(x).range([0, chartWidth]).padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(y.flat()) || 1])
      .nice()
      .range([chartHeight, 0]);

    const xAxisGroup = createAxis(
      chartGroup,
      d3.axisBottom(xScale),
      `translate(0,${chartHeight})`
    )
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    const yAxisGroup = createAxis(chartGroup, d3.axisLeft(yScale), "");

    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2}, ${height - margin.bottom + 92})` //30
      ) // Positioned below x-axis
      .style("text-anchor", "middle")
      .text(x_axis_label)
      .style("font-size", "14px")
      .style("fill", "#333");

    const line = d3
      .line<{ x: string; y: number }>()
      .x((d) => xScale(d.x)!)
      .y((d) => yScale(d.y));

    // Loop through the y arrays and create a path for each
    y_labels.forEach((label, index) => {
      const linePath = chartGroup
        .append("path")
        .data([y[index].map((value, i) => ({ x: x[i], y: value }))])
        .attr("class", `line-${label}`)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", d3.schemeCategory10[index] || "#666CFF")
        .attr("stroke-width", 2)
        .attr("opacity", visibility[label] ? 1 : 0);
    });
    const isYaxisLegend = true;
    createLegend(
      svg,
      y_labels.map((label, index) => ({
        label,
        color: d3.schemeCategory10[index] || "#666CFF",
      })),
      chartWidth,
      margin,
      chartHeight,
      toggleVisibility,
      visibility,
      isYaxisLegend
    );
    // const brush = d3
    //   .brushX()
    //   .extent([
    //     [0, 0],
    //     [chartWidth, chartHeight],
    //   ])
    //   .on("brush end", brushed);

    // chartGroup.append("g").attr("class", "brush").call(brush);

    // function brushed(event: any) {
    //   if (!event.selection) return;
    //   const [x0, x1] = event.selection;
    //   const xDomain = xScale
    //     .domain()
    //     .slice(Math.floor(xScale.invert(x0)), Math.ceil(xScale.invert(x1)));
    //   xScale.domain(xDomain);

    //   xAxisGroup.call(d3.axisBottom(xScale));

    //   chartGroup.selectAll("path").attr("d", (d, i) => {
    //     return line(
    //       d.map((value, idx) => ({
    //         x: x[idx],
    //         y: value,
    //       }))
    //     );
    //   });
    // }
    setD3Node(svg.node() as unknown as HTMLElement);
  };

  const handleResetZoom = () => {
    console.log("here........");
  };

  const prepareCSVDataForExport = (
    xData: string[],
    yData: number[][],
    yLabels: string[]
  ) => {
    if (xData.length !== yData[0].length) {
      console.error("The length of xData and yData must match.");
      return [];
    }

    const data = xData.map((xValue, i) => {
      const row: any = { x: xValue };
      yData.forEach((yArray, j) => {
        row[yLabels[j]] = yArray[i];
      });

      return row;
    });

    return data;
  };
  const csvDataForExport = prepareCSVDataForExport(x, y, y_labels);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full relative">
      <div className="flex items-center justify-end w-full absolute -top-14 right-5">
        <ChartFilters
          handleDownloadSVG={() =>
            exportSVG(d3Node as SVGElement | null, "capacity-model_svg")
          }
          handleDownloadPNG={() =>
            exportPNG(d3Node as SVGElement | null, "capacity-model_png")
          }
          handleDownloadCSV={() =>
            exportCSV(
              csvDataForExport,
              ["x", ...(y_labels as any)],
              "capacity-model_csv"
            )
          }
          handleResetZoom={handleResetZoom}
        />
      </div>
      <div
        ref={chartRef}
        className="relative max-w-full w-full h-full select-none"
      >
        <RD3Component data={d3Node} />
      </div>
    </div>
  );
};

export default CapacityModelChart;
