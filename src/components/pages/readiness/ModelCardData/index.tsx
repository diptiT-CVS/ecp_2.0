import React from "react";

interface ModelCardDataProps {
  value: string | number;
  description: string;
  className?: string;
}

const ModelCardData: React.FC<ModelCardDataProps> = ({
  value,
  description,
  className
}) => {
  return (
    <div className={`border rounded-lg sm:px-4 px-3 sm:py-3 py-2 ${className}`}>
      <div className="flex flex-col">
        <h3 className="text-[#4c4e64] md;text-[18px] text-base font-semibold truncate">{value}</h3>
        <p className="text-[12px] text-[#a6a6a6]">{description}</p>
      </div>
    </div>
  );
};

export default ModelCardData;
