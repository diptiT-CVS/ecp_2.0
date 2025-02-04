import { DownloadMenuItemsPropsInterface, FilterMenuItemsPropsInterface } from "./type";


export const downloadMenuItems = ({
  handleDownloadCSV,
  handleDownloadPNG,
  handleDownloadSVG,
}: DownloadMenuItemsPropsInterface) => [
  {
    label: "Download CSV",
    key: "0",
    onClick: handleDownloadCSV,
  },
  {
    label: "Download PNG",
    key: "1",
    onClick: handleDownloadPNG,
  },
  {
    label: "Download SVG",
    key: "2",
    onClick: handleDownloadSVG,
  },
];

export const filterMenuItems = ({
  handleSelectYaxis,
  handleCustomRange,
  handleLastDays,
}: FilterMenuItemsPropsInterface) => [
  {
    label: "Last 7 Days",
    key: "0",
    onClick: () => handleLastDays(7),
  },
  {
    label: "Last 30 Days",
    key: "1",
    onClick: () => handleLastDays(30),
  },
  {
    label: "Last 1 Year",
    key: "2",
    onClick: () => handleLastDays("1 Year"),
  },
  {
    type: "divider",
  },
  {
    label: "Custom Range",
    key: "3",
    onClick: handleCustomRange,
  },
  {
    label: "Select Y-axis",
    key: "4",
    onClick: handleSelectYaxis,
  },
];
