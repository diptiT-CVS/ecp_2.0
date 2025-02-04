import React from "react";
import { Input as AntdInput, InputProps } from "antd";

interface InputPropsExtended extends InputProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const Input: React.FC<InputPropsExtended> = ({
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
      <AntdInput className="w-full" {...props} />
    </div>
  );
};

export default Input;