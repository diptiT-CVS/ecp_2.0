// Type definitions for menu item handlers
export interface DownloadMenuItemsPropsInterface {
  handleDownloadCSV: () => void;
  handleDownloadPNG: () => void;
  handleDownloadSVG: () => void;
}

export interface FilterMenuItemsPropsInterface {
  handleSelectYaxis: () => void;
  handleCustomRange: () => void;
  handleLastDays: (days: number | string) => void;
}

// Type definitions for props
export interface ChartFiltersPropsInterface {
  handleDownloadCSV: () => void;
  handleDownloadPNG: () => void;
  handleDownloadSVG: () => void;
  handleResetZoom: () => void;
  handleSelectYaxis?: () => void;
  handleCustomRange?: () => void;
  handleLastDays?: (days: number | string) => void;
}
