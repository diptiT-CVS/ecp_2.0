import React from "react";
import { Select as AntdSelect, SelectProps } from "antd";

interface SelectPropsExtended extends SelectProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const Select: React.FC<SelectPropsExtended> = ({
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
      <AntdSelect className="w-full" {...props} />
    </div>
  );
};

export default Select;