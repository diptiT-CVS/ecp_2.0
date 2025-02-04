import React from "react";
import { DatePicker } from "antd";
import { capacityModelData } from "./constant";
import Header from "../../components/header";
import { InfoCard } from "../../components/pages/readiness/infoCard";
import { CapacityModelSection } from "../../components/pages/readiness/capacityModelSection";
import { useReadinessContext } from "../../context/readinessContext";
import { calculatePercentage } from "../../utils/readinessUtils";

const { RangePicker } = DatePicker;

const Readiness: React.FC = () => {
  const { claimXtenData, dataValidationData, hostLevelData } = useReadinessContext();

  console.log("hostLevelData", hostLevelData);
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Readiness overview"
        showFilter={
          <div className="max-w-[300px] w-full">
            <RangePicker
              className="w-full"
              placeholder={["Model Start Date", "Model End Date"]}
            />
          </div>
        }
      />
      <div className="flex-1 bg-[#f0f2f5] p-5 flex flex-col gap-5 overflow-y-auto">
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <InfoCard
            title="ClaimXTen"
            descriptionList={[
              {
                label: "On boarded status",
                value: (
                  <div className="size-[10px] rounded-full bg-[#28FD88]" />
                ),
              },
            ]}
            chartData={claimXtenData.model_server_count}
            chartProps={{
              total: claimXtenData.total_server_count,
              height: 250,
              width: 250,
              middleDataTitle: `${claimXtenData.total_server_count} Total Metrics`,
            }}
            extraInfo={[
              { label: "Modal server count", value: claimXtenData.model_server_count },
              { label: "Not model server count", value: claimXtenData.not_modeled_server_count },
            ]}
          />
          <InfoCard
            title="Data Validation"
            descriptionList={[
              {
                label: "On boarded status",
                value: (
                  <div className="size-[10px] rounded-full bg-[#28FD88]" />
                ),
              },
            ]}
            chartData={dataValidationData.discovered}
            chartProps={{
              total: dataValidationData.total,
              height: 250,
              width: 250,
              middleDataTitle: `${calculatePercentage(
                dataValidationData.total,
                dataValidationData.discovered
              )}% Data Found`,
            }}
            extraInfo={[
              { label: "Total", value: dataValidationData.total },
              { label: "Discovered", value: dataValidationData.discovered },
              { label: "Discovered percentage", value: dataValidationData.discovered_percentage },
            ]}
          />
          <div className="flex-1 flex xl:flex-col sm:flex-row flex-col gap-4 w-full xl:col-span-1 sm:col-span-2">
            <InfoCard
              title="Observability Model"
              descriptionList={[
                {
                  label: "On boarded status",
                  value: (
                    <div className="size-[10px] rounded-full bg-[#28FD88]" />
                  ),
                },
                {
                  label: "Variance 4% to Actuals",
                  value: (
                    <div className="size-[10px] rounded-full bg-[#28FD88]" />
                  ),
                },
                {
                  label: "Forecast Adjustment +2%",
                  value: (
                    <div className="size-[10px] rounded-full bg-[#28FD88]" />
                  ),
                },
              ]}
            />
            <InfoCard
              title="Forecast Approvals"
              descriptionList={[
                {
                  label: "No Forecast Created",
                  value: <div className="size-[10px] rounded-full bg-[red]" />,
                },
                {
                  label: "No Forecast Approvals",
                  value: <div className="size-[10px] rounded-full bg-[red]" />,
                },
              ]}
            />
          </div>
        </div>
        <CapacityModelSection data={capacityModelData} />
      </div>
    </div>
  );
};

export default Readiness;
