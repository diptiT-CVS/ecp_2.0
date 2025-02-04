import React, { useEffect, useRef, useState } from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3";

const RD3Component = rd3.Component;

interface PieChartProps {
  data: number;
  total: number;
  width?: number;
  height?: number;
  middleDataTitle?: string;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  total,
  width = 300,
  height = 300,
  middleDataTitle,
}) => {
  const [d3Node, setD3Node] = useState<SVGSVGElement | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const parentWidth = chartRef.current.offsetWidth;
        drawChart(parentWidth, height);
      }
    };

    updateChartSize();

    window.addEventListener("resize", updateChartSize);

    return () => {
      window.removeEventListener("resize", updateChartSize);
    };
  }, [data, total, width, height]);

  const drawChart = (width: number, height: number) => {
    const svg = d3.create("svg").attr("width", width).attr("height", height);

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const radius = Math.min(width, height) / 2 - margin.top;
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const remainingValue = total - data;
    const updatedData = [
      { label: "Used", value: data },
      { label: "Remaining", value: remainingValue },
    ];

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius);

    const slices = chartGroup
      .selectAll(".slice")
      .data(pie(updatedData))
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("d", arc)
      .attr(
        "fill",
        (d: d3.PieArcDatum<{ label: string; value: number }>, i: number) =>
          i === 0 ? "#666CFF" : "#E0E4FF"
      );

    slices
      .append("text")
      .attr(
        "transform",
        (d: d3.PieArcDatum<{ label: string; value: number }>) =>
          `translate(${arc.centroid(d)})`
      )
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#1e293b");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("fill", "#1e293b")
      .text(`${middleDataTitle}`);

    setD3Node(svg.node());
  };

  useEffect(() => {
    if (d3Node && chartRef.current) {
      chartRef.current.innerHTML = "";
      chartRef.current.appendChild(d3Node);
    }
  }, [d3Node]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div ref={chartRef} className="relative max-w-full w-full h-full">
        <RD3Component data={d3Node} />
      </div>
    </div>
  );
};

export default PieChart;
