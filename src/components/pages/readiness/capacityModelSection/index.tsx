import { Button, Card } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ModelCardData from "../ModelCardData";
import CapacityModelChart from "../../../charts/capacityModelChart";
import { useReadinessContext } from "../../../../context/readinessContext";

export const CapacityModelSection: React.FC<{ data: any }> = ({ data }) => {
  const navigate = useNavigate();
  const { system_name } = useParams<{ system_name: string }>();
  const { capacityOverviewTrendsData } = useReadinessContext();

  const chartData =
    capacityOverviewTrendsData !== ""
      ? JSON.parse(capacityOverviewTrendsData)
      : undefined;

  return (
    <div className="flex-1 relative h-full flex flex-col">
      <Card
        className="h-full flex flex-col flex-1"
        bodyStyle={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <h3 className="text-base font-semibold text-[#4c4e64]">
          Capacity Model
        </h3>
        <div className="absolute right-5 top-5">
          <Button
            type="primary"
            ghost
            onClick={() => navigate(`/capacity-model/${system_name}`)}
            iconPosition="end"
            icon={
              <MdOutlineRemoveRedEye className="text-[20px] translate-y-[2px]" />
            }
          >
            Show models
          </Button>
        </div>
        <div className="mt-5 flex items-center sm:gap-4 gap-2 flex-wrap max-w-[calc(100%-150px)] w-full">
          {data.upper_data.map(
            ([description, value]: [string, string], index: number) => (
              <ModelCardData
                key={index}
                value={value}
                description={description}
              />
            )
          )}
        </div>
        <div className="flex-1 w-full h-full sm:min-h-[350px] min-h-[250px] mt-5">
          {chartData && <CapacityModelChart data={chartData} />}
        </div>
      </Card>
    </div>
  );
};
