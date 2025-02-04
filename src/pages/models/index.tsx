import React from "react";
import { Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useMetrics } from "../../hooks/useMetrics";
import MetricCard from "../../components/pages/models/metricCard";
import Header from "../../components/header";
import EmptyText from "../../components/emptyText";

const Models: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, searchQuery, handleSearchQuery, metricsToDisplay } =
    useMetrics();

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Models"
        showFilter={
          <div className="max-w-[400px] w-full">
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchQuery(e.target.value)}
              placeholder="Enter your query to filter a data"
              allowClear
            />
          </div>
        }
      />
      <div className="flex-1 bg-[#f0f2f5] p-5 overflow-y-auto">
        {isLoading ? (
          <Spin fullscreen />
        ) : metricsToDisplay.length > 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {metricsToDisplay?.map((metric, i) => (
              <MetricCard
                key={i}
                metric={metric}
                onClick={
                  () => navigate(`/readiness/${metric.system_name}`)
                }
              />
            ))}
          </div>
        ) : (
          <EmptyText text="Data not found" />
        )}
      </div>
    </div>
  );
};

export default Models;
