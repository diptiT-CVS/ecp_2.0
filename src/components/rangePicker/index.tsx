import React from "react";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";

const { RangePicker: AntdRangePicker } = DatePicker;

interface RangePickerPropsExtended extends RangePickerProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const RangePicker: React.FC<RangePickerPropsExtended> = ({
  label,
  className = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label
          className={`absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-[#666CFF] ${labelClassName} z-10`}
        >
          {label}
        </label>
      )}
      <AntdRangePicker className="w-full" {...props} />
    </div>
  );
};

export default RangePicker;
