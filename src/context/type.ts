import { ReactNode } from "react";

export interface MetricDataInterface {
  metric: string;
  metric_display_name: string;
  metric_indicator: string;
  upper_table: string[][];
  lower_table: (string | number | null)[][];
  data: {
    chart_data: {
      title: string;
      regr_based: boolean;
      y_axis_limit: number;
      yellow_lower_threshold: number;
      yellow_upper_threshold: number;
      change_threshold_label_y_index: number;
      change_threshold_label_x_index: number;
      change_threshold_label: string;
      date_time_axis_label: string;
      date_time_axis_format: string;
      utilization_axis_label: string | null;
      utilization_axis_format: string | null;
      load_axis_label: string;
      load_axis_format: string;
      y2_axis_limit: number;
      scatterYN: boolean;
      utilization_scatter_data: any | null; // Type unknown
      load_scatter_data: any | null; // Type unknown
      timetrend: {
        x_name: string;
        y_name: string;
        y2_name: string;
        data: { x: string; y: number; y2?: number | undefined }[];
        scatter_data: any | null; // Type unknown
        scatter_y_name: string | null;
        scatter_y2_name: string | null;
      };
      regression?:
      | {
        x_name: string;
        y_name: string;
        r2: number;
        formula: string | null;
        data: { x: number; y: number }[];
      }
      | undefined;
    };
  };
}

interface RegressionData {
  slope: number;
  intercept: number;
  r2: number;
  regr_line: { x: number; y: number }[];
}

interface TableData {
  hostname: string;
  metric_interval: string;
  timeslice: string;
  peak_period: string;
  forecast: number;
  current_supported_capacity: number;
  max_threshold: number;
  change_threshold: number;
  actual_utilization: number;
  projected_utilization: number;
  percentile: number;
}

interface ChartData {
  title: string;
  regr_based: boolean;
  yellow_lower_threshold: number;
  yellow_upper_threshold: number;
  timetrend_chart: {
    x_label: string;
    y_label: string;
    y2_label: string;
    x: string[];
    y: number[];
    y2: number[];
  };
  regression_chart: {
    x_label: string;
    y_label: string;
    regr_line: { x: number; y: number }[];
    actual_utilization_point: { x: number; y: number };
    projected_utlization_point: { x: number; y: number };
    x: number[];
    y: number[];
  };
}

interface SystemData {
  regression_data: RegressionData;
  table: TableData;
  chart_data: ChartData;
}

export interface ECPModel {
  system: string;
  metric: string;
  headroom_indicator: any; // Change to a more specific type if needed
  data: SystemData;
  previous_result: Record<string, any>; // Change to a more specific type if needed
  load_metric: string;
}

export interface ModelPresentationContextInterface {
  selectedModel: ECPModel;
  currentIndex: number;
  totalModelData: ECPModel[];
  cpuOptions: { value: string; label: string }[];
  goToPreviousModel: () => void;
  goToNextModel: () => void;
  handleModelDataChange: (selectedMetric: string) => void;
  getCapacityOverviewData: (system_name: string,
    hostname: string) => void;
  loading: boolean;
}

export interface ContextProviderProps {
  children: ReactNode;
}

export interface ClaimXTenDataInterface {
  total_server_count: number;
  model_server_count: number;
  not_modeled_server_count: number;
  modeled_percent: number;
}

export interface DataValidationDataInterface {
  total: number;
  discovered: number;
  discovered_percentage: number;
}

export interface HostLevelDataInterface {
  hostname: string;
  headroom_indicator: string;
  CPU: number | null;
  MEM: number | null;
}[]

export interface ReadinessContextInterface {
  claimXtenData: ClaimXTenDataInterface;
  dataValidationData: DataValidationDataInterface;
  hostLevelData: HostLevelDataInterface[];
  capacityOverviewTrendsData: string;
  loading: boolean;
  getClaimXTenData: (system_name: string) => Promise<void>;
  getDataValidationData: (system_name: string) => Promise<void>;
  getCapacityOverviewData: (system_name: string) => Promise<void>;
  error: string | null;
}
