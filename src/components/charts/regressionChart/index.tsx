import React, { useEffect, useRef, useState } from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3";
import ChartCard from "../../chartCard";
import ChartFilters from "../../chartFilters";
import { exportCSV, exportPNG, exportSVG } from "../../../utils/downloadChart";
import { YAxisDataInterface } from "../timeTrendChart/type";

const RD3Component = rd3.Component;

interface RegressionChartProps {
  chartData: {
    x: number[];
    y: number[];
    regr_line?: { x: number; y: number }[];
    actual_utilization_point?: { x: number; y: number; color?: string };
    projected_utlization_point?: { x: number; y: number; color?: string };
    x_label?: string;
    y_label?: string;
  };
}

const RegressionChart: React.FC<RegressionChartProps> = ({ chartData }) => {
  const data = chartData.x.map((xValue, index) => ({
    x: xValue,
    y: chartData.y[index],
  }));

  const [yAxisData, setYAxisData] = useState<YAxisDataInterface>({
    primary: { min: "", max: "" },
    secondary: { min: "", max: "" },
  });
  const [d3Node, setD3Node] = useState<SVGSVGElement | null>(null);
  const [visibility, setVisibility] = useState({
    dataPoints: true,
    regressionLine: true,
    actualPoint: true,
    projectedPoint: true,
  });
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeChart = () => {
      if (!chartRef.current) return;
      const { offsetWidth: width, offsetHeight: height } = chartRef.current;
      drawChart(width, height);
    };
    resizeChart();
    window.addEventListener("resize", resizeChart);
    return () => window.removeEventListener("resize", resizeChart);
  }, [chartData, visibility, yAxisData]);

  const toggleVisibility = (key: keyof typeof visibility) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const drawChart = (width: number, height: number) => {
    const svg = d3
      .select(chartRef.current)
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const margin = { top: 20, right: 20, bottom: 45, left: 35 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const { x, y } = chartData;

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(x) as [number, number])
      .nice()
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(y) as [number, number])
      .nice()
      .range([chartHeight, 0]);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "chart-clip")
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // Add X axis
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("font-size", "12px")
      .style("fill", "#334155");

    // Add Y axis
    chartGroup
      .append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("font-size", "12px")
      .style("fill", "#334155");

    const brush = d3
      .brush()
      .extent([
        [0, 0],
        [chartWidth, chartHeight],
      ])
      .on("end", (event) => {
        if (!event.selection) return;
        const [[x0, y0], [x1, y1]] = event.selection;
        xScale.domain([xScale.invert(x0), xScale.invert(x1)]);
        yScale.domain([yScale.invert(y1), yScale.invert(y0)]);
        chartGroup.select<SVGGElement>(".x-axis").call(d3.axisBottom(xScale));
        chartGroup.select<SVGGElement>(".y-axis").call(d3.axisLeft(yScale));

        chartGroup
          .selectAll<SVGCircleElement, { x: number; y: number }>("circle")
          .data(chartData.x.map((xVal, i) => ({ x: xVal, y: chartData.y[i] })))
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", (d) => yScale(d.y));

        chartGroup
          .select<SVGGElement>(".brush")
          .call((g) => brush.move(g as any, null));
      });

    chartGroup.append("g").attr("class", "brush").call(brush);

    // Add data points if visible
    if (visibility.dataPoints) {
      chartGroup
        .selectAll(".dot")
        .data(x)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => xScale(d))
        .attr("cy", (d, index) => yScale(y[index]))
        .attr("r", 4)
        .attr("fill", "none")
        .attr("stroke", "#666CFF")
        .attr("stroke-width", 2);
    }

    // Add regression line if visible
    if (visibility.regressionLine) {
      const regressionLineData = chartData.regr_line;

      if (regressionLineData && regressionLineData.length > 1) {
        const regressionLine = d3
          .line<{ x: number; y: number }>()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y));

        chartGroup
          .append("path")
          .datum(regressionLineData)
          .attr("fill", "none")
          .attr("stroke", "#9da1a9")
          .attr("stroke-width", 2)
          .attr("d", regressionLine);
      }
    }

    // Add actual data point (Red) if visible
    if (visibility.actualPoint && chartData.actual_utilization_point) {
      const actualPoint = chartData.actual_utilization_point;
      chartGroup
        .append("circle")
        .attr("cx", xScale(actualPoint.x))
        .attr("cy", yScale(actualPoint.y))
        .attr("r", 6)
        .attr("fill", actualPoint?.color || "red")
        .attr("stroke-width", 1);
    }

    // Add projected data point (Green) if visible
    if (visibility.projectedPoint && chartData.projected_utlization_point) {
      const projectedPoint = chartData.projected_utlization_point;
      chartGroup
        .append("circle")
        .attr("cx", xScale(projectedPoint.x))
        .attr("cy", yScale(projectedPoint.y))
        .attr("r", 6)
        .attr("fill", projectedPoint?.color || "green")
        .attr("stroke-width", 1);
    }

    // Add legend
    const legendData = [
      { key: "dataPoints", label: "Data Points", color: "#666CFF" },
      { key: "regressionLine", label: "Regression Line", color: "#9da1a9" },
      {
        key: "actualPoint",
        label: "Actual Point",
        color: chartData.actual_utilization_point?.color || "red",
      },
      {
        key: "projectedPoint",
        label: "Projected Point",
        color: chartData.projected_utlization_point?.color || "green",
      },
    ];

    const legendPadding = 15; // Space between legends
    const legendFontSize = 12; // Font size used in legends

    const calculateLegendWidth = (text: string) => {
      const tempSvg = d3
        .select("body")
        .append("svg")
        .style("visibility", "hidden");
      const tempText = tempSvg
        .append("text")
        .attr("font-size", legendFontSize)
        .text(text);
      const textWidth = tempText.node()?.getBBox().width || 0;
      tempSvg.remove();
      return textWidth + 25; // Add extra space for the circle and some padding
    };

    let legendPositions: number[] = [];
    let currentXPosition = 0;

    legendData.forEach((item) => {
      const legendWidth = calculateLegendWidth(item.label);
      legendPositions.push(currentXPosition);
      currentXPosition += legendWidth + legendPadding;
    });

    const totalLegendWidth = currentXPosition - legendPadding; // Total width of all legends

    const legendStartX = (chartWidth - totalLegendWidth) / 2; // Center-align the legends

    const legendGap = 35;
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left + legendStartX}, ${
          margin.top + chartHeight + legendGap
        })`
      );

    legendData.forEach((item, index) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(${legendPositions[index]}, 0)`);

      legendItem
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 7)
        .attr("fill", item.color)
        .style("cursor", "pointer")
        .on("click", () =>
          toggleVisibility(item.key as keyof typeof visibility)
        );

      legendItem
        .append("text")
        .attr("x", 15)
        .attr("y", 4)
        .attr("font-size", `${legendFontSize}px`)
        .attr("fill", "#334155")
        .style("cursor", "pointer")
        .style(
          "text-decoration",
          visibility[item.key as keyof typeof visibility]
            ? "none"
            : "line-through"
        )
        .text(item.label)
        .on("click", () =>
          toggleVisibility(item.key as keyof typeof visibility)
        );
    });

    setD3Node(svg.node() as SVGSVGElement);
  };

  const handleResetZoom = () => {
    setYAxisData({
      primary: { min: "", max: "" },
      secondary: { min: "", max: "" },
    });
  };

  return (
    <ChartCard
      title="Regression Chart"
      filter={
        <ChartFilters
          handleDownloadSVG={() =>
            exportSVG(d3Node as SVGElement | null, "regression_svg")
          }
          handleDownloadPNG={() =>
            exportPNG(d3Node as SVGElement | null, "regression_png")
          }
          handleDownloadCSV={() =>
            exportCSV(data, ["x", "y"], "regression_csv")
          }
          handleResetZoom={handleResetZoom}
        />
      }
    >
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <div ref={chartRef} className="relative max-w-full w-full h-full">
          <RD3Component data={d3Node} />
        </div>
      </div>
    </ChartCard>
  );
};

export default RegressionChart;
