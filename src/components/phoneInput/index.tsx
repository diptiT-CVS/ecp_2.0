import React from "react";
import { InputNumber as AntdInputNumber, InputNumberProps as AntdInputNumberProps } from "antd";

// Type definitions for props
interface InputNumberProps extends AntdInputNumberProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({ label, className, labelClassName, ...props }) => {
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label
          className={`absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-[#666CFF] ${labelClassName} z-10`}
        >
          {label}
        </label>
      )}
      {/* Ant Design InputNumber */}
      <AntdInputNumber className="w-full" {...props} />
    </div>
  );
};

export default InputNumber;
