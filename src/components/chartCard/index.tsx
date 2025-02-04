import React from "react";
import { Card } from "antd";
import CardHeader from "./cardHeader";
import { ChartCardPropsInterface } from "./type";

const ChartCard: React.FC<ChartCardPropsInterface> = ({ title, children, filter, className = "" }) => (
  <Card
    bordered={false}
    className={`flex-1 flex flex-col ${className}`}
    bodyStyle={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
    }}
  >
    <CardHeader title={title} filter={filter} />
    <div className="flex-1">{children}</div>
  </Card>
);

export default ChartCard;
