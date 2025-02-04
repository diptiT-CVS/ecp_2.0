import React from "react";
import Header from "../../components/header";
import Input from "../../components/Input";
import CapacityDataCard from "../../components/pages/capacityModel/capacityDataCard";
import { Spin } from "antd";
import { useReadinessContext } from "../../context/readinessContext";

const CapacityModel: React.FC = () => {
  const { hostLevelData, loading } = useReadinessContext();
  
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header
        backButton
        title="Claimsxten capacity model"
        showFilter={
          <div className="max-w-[450px] w-full">
            <Input
              label="Search By field"
              className="w-full"
              placeholder="Enter your query to filter a data  "
            />
          </div>
        }
      />
      <div className="flex-1 overflow-y-auto md:p-5 p-4">
        {loading ? (
          <Spin fullscreen />
        ) : (
          <div className="grid 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 gap-3">
            {hostLevelData.map((item, index) => {
              return <CapacityDataCard key={index} data={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CapacityModel;
