export interface TimeTrendDataInterface {
  x: string;
  y: number;
  y2: number;
}

export interface SelectRangeDataInterface {
  from: string;
  to: string;
}

export interface YAxisDataInterface {
  primary: { min: string | number; max: string | number };
  secondary: { min: string | number; max: string | number };
}

export interface VisibilityInterface {
  [key: string]: boolean;
  y: boolean;
  y2: boolean;
}

export interface TimeTrendChartPropsInterface {
  data: TimeTrendDataInterface[];
}

export interface SelectYaxisModalPropsInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  setData: (data: ModalDataInterface) => void;
}

export interface ModalDataInterface {
  yAxis: string | undefined;
  min: number | undefined;
  max: number | undefined;
}

export interface CustomRangeModalPropsInterface {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: Array<{ x: string }>; // Assuming data is an array of objects with x as a string
    setData: (data: { from: string; to: string }) => void;
  }
