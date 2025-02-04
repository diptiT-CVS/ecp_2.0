import React, { useEffect, useRef, useState } from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3";
import ChartFilters from "../../chartFilters";
import ChartCard from "../../chartCard";
import { exportCSV, exportPNG, exportSVG } from "../../../utils/downloadChart";
import SelectYaxisModal from "./selectYaxisModal";
import CustomRangeModal from "./customRangeModal";
import {
  addBrush,
  createAxis,
  createLegend,
  createPath,
} from "../../../utils/chartUtils";
import dayjs from "dayjs";
import {
  SelectRangeDataInterface,
  TimeTrendChartPropsInterface,
  TimeTrendDataInterface,
  VisibilityInterface,
  YAxisDataInterface,
} from "./type";

const RD3Component = rd3.Component;

const filterDataByRange = (
  data: TimeTrendDataInterface[],
  range: SelectRangeDataInterface
): TimeTrendDataInterface[] => {
  if (!range.from || !range.to) return data;
  const fromDate = new Date(range.from);
  const toDate = new Date(range.to);
  return data.filter((d) => {
    const date = new Date(d.x);
    return date >= fromDate && date <= toDate;
  });
};

const getDefaultRange = (
  data: TimeTrendDataInterface[],
  days: string
): SelectRangeDataInterface => {
  if (!data.length) return { from: "", to: "" };
  const lastDate = dayjs(data[data.length - 1].x, "YYYY-MM-DD HH:mm");
  const startDate =
    days === "1 Year"
      ? lastDate.subtract(1, "year")
      : lastDate.subtract(parseInt(days), "day");
  return {
    from: startDate.format("YYYY-MM-DD"),
    to: lastDate.format("YYYY-MM-DD"),
  };
};

const TimeTrendChart: React.FC<TimeTrendChartPropsInterface> = ({ data }) => {
  const [selectYaxis, setSelectYaxis] = useState<boolean>(false);
  const [selectRange, setSelectRange] = useState<boolean>(false);
  const [yAxisData, setYAxisData] = useState<YAxisDataInterface>({
    primary: { min: "", max: "" },
    secondary: { min: "", max: "" },
  });
  const [selectRangeData, setSelectRangeData] =
    useState<SelectRangeDataInterface>({
      from: "",
      to: "",
    });
  const [d3Node, setD3Node] = useState<HTMLElement | null>(null);
  const [visibility, setVisibility] = useState<VisibilityInterface>({
    y: true,
    y2: true,
  });
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeChart = () => {
      if (!chartRef.current) return;
      const { offsetWidth: width, offsetHeight: height } = chartRef.current;
      const filteredData = filterDataByRange(data, selectRangeData);
      drawChart(width, height, filteredData);
    };

    resizeChart();
    window.addEventListener("resize", resizeChart);
    return () => window.removeEventListener("resize", resizeChart);
  }, [data, visibility, yAxisData, selectRangeData]);

  const toggleVisibility = (key: keyof VisibilityInterface) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const drawChart = (
    width: number,
    height: number,
    filteredData: TimeTrendDataInterface[]
  ) => {
    const svg = d3
      .select(chartRef.current)
      .html("") // Clear the existing content
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const margin = { top: 20, right: 40, bottom: 45, left: 30 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const parseDate = d3.timeParse("%Y-%m-%d %H:%M");

    // Set scales
    const xScale = d3
      .scaleTime()
      .domain(
        d3.extent(filteredData, (d) => {
          const parsedDate = parseDate(d.x);
          return parsedDate ? parsedDate : new Date(0); // Use a fallback value for invalid dates
        }) as [Date, Date]
      ) // Type assertion to ensure the domain is always valid
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        (yAxisData.primary.min as number) || 0,
        (yAxisData.primary.max as number) ||
        d3.max(filteredData, (d) => d.y) ||
        1,
      ])
      .nice()
      .range([chartHeight, 0]);
    const y2Scale = d3
      .scaleLinear()
      .domain([
        (yAxisData.secondary.min as number) || 0,
        (yAxisData.secondary.max as number) ||
        d3.max(filteredData, (d) => d.y2) ||
        1,
      ])
      .nice()
      .range([chartHeight, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat((d) => {
        const domain = xScale.domain();
        const diff = domain[1].getTime() - domain[0].getTime(); // Convert Date to milliseconds

        if (diff <= 24 * 60 * 60 * 1000) {
          return d3.timeFormat("%H:%M")(d as Date);
        } else if (diff <= 7 * 24 * 60 * 60 * 1000) {
          return d3.timeFormat("%b %d")(d as Date);
        } else {
          return d3.timeFormat("%b %d")(d as Date);
        }
      });

    const yAxis = d3.axisLeft(yScale).ticks(5);
    const y2Axis = d3.axisRight(y2Scale).ticks(5);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "chart-clip")
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    const clipGroup = chartGroup
      .append("g")
      .attr("clip-path", "url(#chart-clip)");

    const xAxisGroup = createAxis(
      chartGroup,
      xAxis,
      `translate(0,${chartHeight})`
    );

    createAxis(chartGroup, yAxis, `translate(0,0)`).attr("class", "y-axis");
    createAxis(chartGroup, y2Axis, `translate(${chartWidth},0)`).attr(
      "class",
      "y2-axis"
    );

    const line1 = d3
      .line<{ x: string; y: number }>()
      .x((d) => xScale(parseDate(d.x) as Date))
      .y((d) => yScale(d.y));

    const line2 = d3
      .line<{ x: string; y2: number }>()
      .x((d) => xScale(parseDate(d.x) as Date))
      .y((d) => y2Scale(d.y2));

    createPath(
      clipGroup,
      filteredData,
      "line1",
      line1,
      "#666CFF",
      visibility.y
    );
    createPath(
      clipGroup,
      filteredData,
      "line2",
      line2,
      "#2f276d",
      visibility.y2
    );

    // Conditionally create the legend data based on the presence of y2 data
    const legendData = [{ label: "y", color: "#666CFF" }];

    // Check if 'y2' data exists, and only add to the legend if it does
    const hasY2Data = filteredData.some((d) => d.y2 != null);
    if (hasY2Data) {
      legendData.push({ label: "y2", color: "#2f276d" });
    }

    createLegend(
      svg,
      legendData,
      chartWidth,
      margin,
      chartHeight,
      toggleVisibility,
      visibility
    );

    addBrush(clipGroup, chartWidth, chartHeight, xScale, ({ selection }) => {
      if (!selection) return;

      const [start, end] = (selection as [number, number]).map(xScale.invert);
      const minZoomDuration = 60 * 60 * 1000;

      if (end.getTime() - start.getTime() < minZoomDuration) {
        clipGroup.select<SVGGElement>(".brush").call(d3.brushX().move, null);
        return;
      }

      xScale.domain([start, end]);

      clipGroup.select<SVGGElement>(".brush").call(d3.brushX().move, null);

      xAxisGroup.transition().duration(1000).call(xAxis);
      chartGroup
        .select<SVGGElement>(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis);

      chartGroup
        .select<SVGGElement>(".y2-axis")
        .transition()
        .duration(1000)
        .call(y2Axis);

      clipGroup
        .select(".line1")
        .datum(filteredData)
        .transition()
        .duration(1000)
        .attr("d", line1);

      clipGroup
        .select(".line2")
        .datum(filteredData as { x: string; y2: number }[])
        .transition()
        .duration(1000)
        .attr("d", line2);
    });

    setD3Node(svg.node() as unknown as HTMLElement);
  };

  const handleResetZoom = () => {
    setYAxisData({
      primary: { min: "", max: "" },
      secondary: { min: "", max: "" },
    });
    setSelectRangeData({
      from: "",
      to: "",
    });
  };

  const handleLastDays = (days: string | number) => {
    const { from, to } = getDefaultRange(data, days as string);
    setSelectRangeData({ from, to });
    drawChart(
      chartRef.current?.offsetWidth || 0,
      chartRef.current?.offsetHeight || 0,
      filterDataByRange(data, { from, to })
    );
  };

  return (
    <ChartCard
      title="Time-trend Chart"
      filter={
        <ChartFilters
          handleDownloadSVG={() =>
            exportSVG(d3Node as SVGElement | null, "time-trend_svg")
          }
          handleDownloadPNG={() =>
            exportPNG(d3Node as SVGElement | null, "time-trend_png")
          }
          handleDownloadCSV={() =>
            exportCSV(data, ["x", "y", "y2"], "time-trend_csv")
          }
          handleResetZoom={handleResetZoom}
          handleSelectYaxis={() => setSelectYaxis(true)}
          handleCustomRange={() => setSelectRange(true)}
          handleLastDays={handleLastDays}
        />
      }
    >
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <div
          ref={chartRef}
          className="relative max-w-full w-full h-full select-none"
        >
          <RD3Component data={d3Node} />
        </div>
      </div>
      <SelectYaxisModal
        open={selectYaxis}
        setOpen={setSelectYaxis}
        setData={(updatedData) =>
          setYAxisData((prev) => ({
            ...prev,
            [updatedData.yAxis as string]: {
              min: updatedData.min,
              max: updatedData.max,
            },
          }))
        }
      />
      {selectRange && (
        <CustomRangeModal
          open={selectRange}
          setOpen={setSelectRange}
          data={data}
          setData={setSelectRangeData}
        />
      )}
    </ChartCard>
  );
};

export default TimeTrendChart;
