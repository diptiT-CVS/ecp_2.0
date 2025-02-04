// TypeScript types for the function parameters
export const exportSVG = (
  svgElement: SVGElement | null,
  fileName: string = "chart"
): void => {
  if (!svgElement) {
    console.error("SVG element is required for exporting as SVG.");
    return;
  }

  const svgContent = svgElement.outerHTML;
  console.log(svgElement.outerHTML);
  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.svg`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportPNG = (
  svgElement: SVGElement | null,
  fileName: string = "chart"
): void => {
  if (!svgElement) return;

  const svgString = new XMLSerializer().serializeToString(svgElement);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Failed to get 2d context.");
    return;
  }

  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  const image = new Image();
  image.onload = () => {
    const originalWidth = parseInt(svgElement.getAttribute("width") || "0", 10);
    const originalHeight = parseInt(
      svgElement.getAttribute("height") || "0",
      10
    );
    const padding = 10;

    const paddedWidth = originalWidth + padding * 2;
    const paddedHeight = originalHeight + padding * 2;

    canvas.width = paddedWidth;
    canvas.height = paddedHeight;

    // Fill the canvas with a white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, paddedWidth, paddedHeight);

    // Draw the SVG image with padding
    ctx.drawImage(image, padding, padding);

    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${fileName}.png`;
    link.click();
  };
  image.src = url;
};

interface CSVRow {
  x: string | number;
  y: number;
  y2?: number;
  "y-labels"?: string[];
}

export const exportCSV = (
  data: CSVRow[],
  headers: (keyof CSVRow)[],
  fileName: string = "chart-data"
): void => {
  if (!Array.isArray(data) || !Array.isArray(headers)) {
    console.error(
      "Data and headers are required and must be arrays for CSV export."
    );
    return;
  }
  const csvContent = [
    headers,
    ...data.map((row) => headers.map((header) => row[header] || "")), // Map row data to headers
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
