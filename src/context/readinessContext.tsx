import { createContext, useContext, useEffect, useState } from "react";
import {
  ClaimXTenDataInterface,
  ContextProviderProps,
  DataValidationDataInterface,
  HostLevelDataInterface,
  ReadinessContextInterface,
} from "./type";
import {
  getCapacityModelOverviewDataRequest,
  getClaimXTenDataRequest,
  getDataValidationDataRequest,
} from "../api/readiness";
import { useParams } from "react-router-dom";

const ReadinessContext = createContext<ReadinessContextInterface | null>(null);

export const useReadinessContext = () => {
  const context = useContext(ReadinessContext);
  if (!context) {
    throw new Error(
      "useReadinessContext must be used within a ReadinessProvider"
    );
  }
  return context;
};

export const ReadinessProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [claimXtenData, setClaimXtenData] = useState<ClaimXTenDataInterface>(
    {} as ClaimXTenDataInterface
  );
  const [dataValidationData, setDataValidationData] =
    useState<DataValidationDataInterface>({} as DataValidationDataInterface);
  const [hostLevelData, setHostLevelData] = useState<HostLevelDataInterface[]>(
    [] as HostLevelDataInterface[]
  );
  const [capacityOverviewTrendsData, setCapacityOverviewTrendsData] =
    useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { system_name } = useParams<{ system_name: string }>();

  const getClaimXTenData = async (system_name: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getClaimXTenDataRequest(system_name);
      setClaimXtenData(JSON.parse(data));
    } catch (err) {
      console.error("Error fetching SQL query:", err);
      setError("Failed to generate SQL query.");
    } finally {
      setLoading(false);
    }
  };

  const getDataValidationData = async (system_name: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDataValidationDataRequest(system_name);
      setDataValidationData(JSON.parse(data));
    } catch (err) {
      console.error("Error fetching SQL query:", err);
      setError("Failed to generate SQL query.");
    } finally {
      setLoading(false);
    }
  };

  const getCapacityOverviewData = async (
    system_name: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCapacityModelOverviewDataRequest(system_name);
      const responseData = JSON.parse(data);
      setHostLevelData(responseData.host_level_capacity);
      setCapacityOverviewTrendsData(responseData.capacity_overview_trends);
    } catch (err) {
      console.error("Error fetching SQL query:", err);
      setError("Failed to generate SQL query.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (system_name) {
      getClaimXTenData(system_name);
      getDataValidationData(system_name);
      getCapacityOverviewData(system_name);
    }
  }, [system_name]);

  const value: ReadinessContextInterface = {
    claimXtenData,
    dataValidationData,
    hostLevelData,
    capacityOverviewTrendsData,
    getClaimXTenData,
    getDataValidationData,
    getCapacityOverviewData,
    loading,
    error,
  };

  return (
    <ReadinessContext.Provider value={value}>
      {children}
    </ReadinessContext.Provider>
  );
};
