import React from "react";
import Header from "../../components/header";
import { Card, Spin } from "antd";
import { presentationData, presentationLowerTableColumn } from "./constant";
import TimeTrendChart from "../../components/charts/timeTrendChart";
import PresentationFilters from "../../components/pages/modelPresentation/presentationFilter";
import { useModelPresentationContext } from "../../context/modelPresentationContext";
import DetailsList from "../../components/pages/modelPresentation/detailsList";
import DataTable from "../../components/dataTable";
import RegressionChart from "../../components/charts/regressionChart";
import { TimeTrendChartPropsInterface, TimeTrendDataInterface } from "../../components/charts/timeTrendChart/type";

const ModelPresentation = () => {
  const { selectedModel, loading } = useModelPresentationContext();
  const selectedModelTable = selectedModel?.data?.table;

  const upperTable = selectedModelTable
    ? [
      ["Hostname(s)", selectedModelTable.hostname],
      ["Metric Interval", selectedModelTable.metric_interval],
      ["Time Slice", selectedModelTable.timeslice],
      // Units is not there in api
    ]
    : [];

  const lowerTableFormatted = Object.entries(selectedModelTable).map(([header, currentInfo], index) => ({
    key: index,
    header,
    currentInfo,
    priorInfo: null 
  }));

  if (loading) {
    return <Spin fullscreen />;
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`; // Format as "2024-08-13 19:00"
  };

  const transformTimeTrendData = (rawData: {
    x_label: string;
    y_label: string;
    y2_label: string;
    x: string[];
    y: number[];
    y2: number[];
  }): TimeTrendChartPropsInterface => {
    const { x, y, y2, x_label, y_label, y2_label } = rawData;

    const data: TimeTrendDataInterface[] = x.map((timestamp, index) => ({
      x: formatTimestamp(timestamp),
      y: Number(y[index]) ?? null,
      y2: Number(y2[index]) ?? null,
    }));

    return { data };
  };

  const transformedTimeTrendChartData: TimeTrendChartPropsInterface = transformTimeTrendData(selectedModel.data.chart_data.timetrend_chart);
  return (
    <div className="flex flex-col h-screen" key={selectedModel.metric}>
      <Header
        title="ECP Model presentation layer"
        showFilter={<PresentationFilters />}
      />
      <div className="p-5 flex-1 bg-[#f0f2f5] overflow-y-auto">
        <div className="flex items-center gap-4">
          <div
            className="size-[25px] rounded-full"
            style={{ background: selectedModel?.metric_indicator }} // there is no field in api
          />
          <span className="text-[#666CFF] text-[18px] font-bold">
            {selectedModel?.metric}
          </span>
        </div>
        <div className="flex gap-5 mt-5 w-full">
          <div className="max-w-[600px] w-full flex flex-col gap-5">
            <Card bordered={false}>
              <h3 className="text-gray-500 text-[16px] font-bold pb-[10px] border-b border-gray-200 mb-3">
                CPU Main Details
              </h3>
              <DetailsList data={upperTable} />
            </Card>
            <DataTable
              columns={presentationLowerTableColumn}
              dataSource={lowerTableFormatted as []}
            />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            {selectedModel.data.chart_data.timetrend_chart && (
              <TimeTrendChart
                data={transformedTimeTrendChartData.data} />
            )}
            {selectedModel.data.chart_data.regression_chart && (
              <RegressionChart
                chartData={selectedModel.data.chart_data.regression_chart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPresentation;
