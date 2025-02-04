import React from "react";
import { CardHeaderPropsInterface } from "./type";

const CardHeader: React.FC<CardHeaderPropsInterface> = ({ title, filter }) => (
  <div className="flex items-center justify-between">
    <h3 className="text-gray-600 text-[16px] font-semibold">{title}</h3>
    {filter && filter}
  </div>
);

export default CardHeader;
