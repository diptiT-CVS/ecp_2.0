import { Card } from "antd";
import PieChart from "../../../charts/PieChart";
import React from "react";

export interface InfoCardProps {
  title: string;
  descriptionList: { label: string; value: string | React.ReactNode }[];
  chartData?: any;
  chartProps?: {
    total: number;
    height: number;
    width: number;
    middleDataTitle: string;
  };
  extraInfo?: { label: string; value: string | number }[];
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  descriptionList,
  chartData,
  chartProps,
  extraInfo,
}) => (
  <Card className="flex-1">
    <h3 className="text-base font-semibold text-[#4c4e64]">{title}</h3>
    <div className="mt-4 text-[#8e8e90]">
      {descriptionList.map(({ label, value }, index) => (
        <p key={index} className="flex items-center gap-2">
          {label}
          {value}
        </p>
      ))}
    </div>
    {chartData && chartProps && (
      <div className="flex items-center justify-evenly md:flex-row flex-col gap-5 mt-5">
        <div className="max-w-[260px] w-full ">
          <PieChart data={chartData} {...chartProps} />
        </div>
        {extraInfo && (
          <div className="flex md:flex-col flex-wrap gap-5">
            {extraInfo.map(({ label, value }, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-[#4c4e64] text-[18px] font-semibold truncate">
                  {value}
                </h3>
                <p className="text-[12px] text-[#a6a6a6]">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </Card>
);
