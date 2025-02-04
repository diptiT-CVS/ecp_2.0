import React from "react";

// Define props for EmptyText
interface EmptyTextProps {
  text: string;
}

const EmptyText: React.FC<EmptyTextProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-sm text-gray-500">{text}</span>
    </div>
  );
};

export default EmptyText;
