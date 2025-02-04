import { List } from "antd";
import React from "react";

interface DetailsListProps {
  data: string[][]; // Array of tuples with label and value, both are strings
}

const DetailsList: React.FC<DetailsListProps> = ({ data }) => (
  <List
    className="mt-3"
    dataSource={data}
    renderItem={([label, value], index) => (
      <div className="flex items-center gap-3 mb-2 last:mb-0" key={index}>
        <h3 className="text-sm font-semibold text-gray-600 max-w-[200px] w-full">
          {label}
        </h3>
        <span className="text-gray-400">{value}</span>
      </div>
    )}
  />
);

export default DetailsList;
