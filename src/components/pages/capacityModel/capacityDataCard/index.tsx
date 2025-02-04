import React from "react";
import { getStatusStyles } from "../../../../pages/capacityModel/utils";
import { useNavigate, useParams } from "react-router-dom";
import { HostLevelDataInterface } from "../../../../context/type";

export interface CapacityCardProps {
  data: HostLevelDataInterface
}

const CapacityDataCard: React.FC<CapacityCardProps> = ({ data }) => {
  const { textColor, borderColor, bgColor } = getStatusStyles(data.headroom_indicator);
  const navigate = useNavigate();
  const { system_name } = useParams<{ system_name: string }>();

  return (
    <div
      className={`rounded-lg md:p-4 p-3 cursor-pointer ${textColor} ${borderColor} ${bgColor} border`}
      onClick={() => navigate(`/model-presentation/${system_name}?hostname=${data.hostname}`)}
    >
      <h3 className="font-bold truncate flex-1">{data.hostname ? data.hostname : "Hostname - null"}</h3>
      <div className="md:mt-2 mt-1">
        <h3>
          CPU: <span className="font-semibold">{data.CPU}</span>
        </h3>
        <h3>
          MEM: <span className="font-semibold">{data.MEM}</span>
        </h3>
      </div>
    </div>
  );
};

export default CapacityDataCard;
