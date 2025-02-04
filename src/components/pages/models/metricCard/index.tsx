import React from "react";
import { Card, Tag } from "antd";
import { MetricInterface } from "../../../../hooks/useMetrics";

interface MetricCardProps {
  metric: MetricInterface;
  onClick: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer"
      title={
        <div className="flex items-center gap-2 justify-between">
          <p>{metric.system_name}</p>
          <Tag
            color={
              metric.capacity_feedback === "High Risk"
                ? "red"
                : metric.capacity_feedback === "Moderate Risk"
                ? "yellow"
                : "green"
            }
            className="uppercase text-[10px]"
          >
            {metric.capacity_feedback}
          </Tag>
        </div>
      }
      bordered={false}
    >
      <div className="grid grid-cols-1">
        <div className="flex items-center gap-3 mb-2 last:mb-0">
          <h3 className="text-sm font-semibold text-gray-600 max-w-[200px] w-full">
            Capacity Indicator:
          </h3>
          <span className="text-gray-400">{metric.capacity_indicator}</span>
        </div>
        <div className="flex items-center gap-3 mb-2 last:mb-0">
          <h3 className="text-sm font-semibold text-gray-600 max-w-[200px] w-full">
            Business kvi:
          </h3>
          <span className="text-gray-400">{metric.business_kvi}</span>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
