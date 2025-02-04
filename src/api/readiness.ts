import axios, { AxiosResponse } from "axios";
// import { capacityOverviewData, claimXTenData, dataDiscoveryData } from "../dummyData/readiness";

export const getClaimXTenDataRequest = async (systemName: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://oceanspot.dev.cvshealth.com/server_onboarding_status/${systemName}`,
    );
    return response.data;
    // return claimXTenData;
  } catch (e) {
    console.error("Error calling server_onboarding_status API:", e);
    throw e;
  }
};

export const getDataValidationDataRequest = async (systemName: string) => {
  try {
      const response: AxiosResponse = await axios.get(
        `https://oceanspot.dev.cvshealth.com/data_discovery/${systemName}`,
      );
      return response.data;
    // return dataDiscoveryData;
  } catch (e) {
    console.error("Error calling data_discovery API:", e);
    throw e;
  }
};

export const getCapacityModelOverviewDataRequest = async (systemName: string) => {
  try {
      const response: AxiosResponse = await axios.get(
        `https://oceanspot.dev.cvshealth.com/capacity_model_overview/${systemName}`,
      );
      return response.data;
    // return capacityOverviewData;
  } catch (e) {
    console.error("Error calling capacity_model_overview API:", e);
    throw e;
  }
};
