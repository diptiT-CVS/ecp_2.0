import axios, { AxiosResponse } from "axios";
import { modelsData } from "../dummyData/models";

export const getHostCapacityModelData = async (systemName: string,hostname:string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://oceanspot.dev.cvshealth.com/host_capacity_model/${systemName}?hostname=${hostname}`,
    );
    return response.data;
    // return modelsData;
  } catch (e) {
    console.error("Error calling host_capacity_model API:", e);
    throw e;
  }
};