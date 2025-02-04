import axios, { AxiosResponse } from "axios";
import { modelsData } from "../dummyData/models";

export const getModelsData = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      "https://oceanspot.dev.cvshealth.com/application_dashboard/",
    );
    return response.data;
    // return modelsData;
  } catch (e) {
    console.error("Error calling application_dashboard API:", e);
    throw e;
  }
};