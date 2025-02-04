import * as d3 from "d3";

// Type for Legend Data Item
interface LegendItem {
  label: string;
  color: string;
}

// Type for the Visibility object
interface Visibility {
  [key: string]: boolean;
}

interface ToggleVisibility {
  (label: string): void;
}

export const createLegend = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  legendData: LegendItem[],
  chartWidth: number,
  margin: { left: number; top: number; right: number; bottom: number },
  chartHeight: number,
  toggleVisibility: ToggleVisibility,
  visibility: Visibility,
  isYaxisLegend?: boolean
): void => {
  const legendPadding = 20; // Space between legends
  const legendFontSize = 12; // Font size used in legends

  const calculateLegendWidth = (text: string): number => {
    const tempSvg = d3
      .select("body")
      .append("svg")
      .style("visibility", "hidden");
    const tempText = tempSvg
      .append("text")
      .attr("font-size", legendFontSize)
      .text(text);
    const textWidth = tempText.node()?.getBBox().width;
    tempSvg.remove();
    return (textWidth as number) + 25; // Add extra space for the circle and some padding
  };

  // Calculate legend positions
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

  const legendGroup = svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left + legendStartX}, ${
        margin.top + chartHeight + legendGap
      })`
    );

  legendData.forEach((item, index) => {
    const legendItem = legendGroup
      .append("g")
      .attr(
        "transform",
        `translate(${legendPositions[index]}, ${isYaxisLegend ? 37 : 0})`
      );

    // Legend circle
    legendItem
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 7)
      .attr("fill", item.color)
      .style("cursor", "pointer")
      .on("click", () => toggleVisibility(item.label));

    // Legend text
    legendItem
      .append("text")
      .attr("x", 15) // Space between the circle and text
      .attr("y", 4) // Adjust text alignment with the circle
      .attr("font-size", `${legendFontSize}px`)
      .attr("fill", "#334155")
      .style("cursor", "pointer")
      .style(
        "text-decoration",
        visibility[item.label] ? "none" : "line-through"
      )
      .text(item.label)
      .on("click", () => toggleVisibility(item.label));
  });
};

export const createAxis = (
  group: d3.Selection<SVGGElement, unknown, null, undefined>, // Adjusting to the correct type for SVG <g> elements
  axis: d3.Axis<any>,
  transform: string
): d3.Selection<SVGGElement, unknown, null, undefined> => {
  return group.append("g").attr("transform", transform).call(axis);
};

export const createPath = (
  group:
    | d3.Selection<SVGGElement, unknown, null, undefined>
    | d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  data: any[],
  className: string,
  line: d3.Line<any>,
  color: string,
  visibility: boolean
): void => {
  (group as d3.Selection<SVGGElement, unknown, null, undefined>)
    .append("path")
    .datum(data)
    .attr("class", className)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1.5)
    .attr("opacity", visibility ? 1 : 0)
    .attr("d", line);
};

export const addBrush = (
  clipGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartWidth: number,
  chartHeight: number,
  xScale: d3.ScaleTime<number, number, never>,
  brushCallback: (event: d3.D3BrushEvent<any>) => void
): void => {
  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [chartWidth, chartHeight],
    ])
    .on("end", brushCallback);

  clipGroup.append("g").attr("class", "brush").call(brush);
};

export const createAxisGroup = (
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  axis: d3.Axis<any>,
  transform: string
): d3.Selection<SVGGElement, unknown, HTMLElement, any> => {
  return svg.append("g").attr("transform", transform).call(axis);
};

export const createLinePath = (
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  data: any[],
  lineGenerator: d3.Line<any>,
  className: string,
  color: string
): d3.Selection<SVGPathElement, any, any, any> => {
  return svg
    .append("path")
    .datum(data)
    .attr("class", className)
    .attr("stroke", color)
    .attr("fill", "none")
    .attr("d", lineGenerator);
};
