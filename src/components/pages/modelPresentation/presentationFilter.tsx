import React from "react";
import { Button } from "antd";
import Select from "../../select";
import RangePicker from "../../rangePicker";
import { useModelPresentationContext } from "../../../context/modelPresentationContext";

const PresentationFilters = () => {
  const {
    selectedModel,
    totalModelData,
    cpuOptions,
    handleModelDataChange,
    goToPreviousModel,
    goToNextModel,
    currentIndex,
  } = useModelPresentationContext();

  const isPreviousDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === totalModelData.length - 1;

  return (
    <div className="flex gap-4 justify-end flex-1">
      <div className="max-w-[150px] w-full">
        <Select
          label="Model"
          value="ClaimXTen"
          className="w-full"
          options={[{ value: "claimxten", label: "ClaimXTen" }]}
        />
      </div>
      <div className="max-w-[250px] w-full">
        <RangePicker label="Date Range" />
      </div>
      <Button
        color="primary"
        variant="outlined"
        onClick={goToPreviousModel}
        disabled={isPreviousDisabled}
      >
        Previous
      </Button>
      <div className="max-w-[220px] w-full">
        <Select
          label="CPU Name"
          value={selectedModel?.metric}
          options={cpuOptions}
          onChange={(value) => handleModelDataChange(value)}
        />
      </div>
      <Button
        color="primary"
        variant="outlined"
        onClick={goToNextModel}
        disabled={isNextDisabled}
      >
        Next
      </Button>
    </div>
  );
};

export default PresentationFilters;
