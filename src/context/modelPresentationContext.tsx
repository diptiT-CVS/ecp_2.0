import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useParams,
  useMemo,
} from "react";
import { presentationData, ECPModelPresentationData } from "../pages/modelPresentation/constant";
import {
  ContextProviderProps,
  ECPModel,
  MetricDataInterface,
  ModelPresentationContextInterface,
} from "./type";
import { getHostCapacityModelData } from "../api/modelPresentation";
import {useLocation} from "react-router-dom"

const ModelPresentationContext =
  createContext<ModelPresentationContextInterface | null>(null);

export const useModelPresentationContext = () => {
  const context = useContext(ModelPresentationContext);

  if (!context) {
    throw new Error(
      "useModelPresentationContext must be used within a ModelPresentationProvider"
    );
  }

  return context;
};

export const ModelPresentationProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState(
    ECPModelPresentationData[0] as ECPModel
  );
  const [totalModelData, setTotalModelData] = useState(
    ECPModelPresentationData as ECPModel[]
  );
  // const [selectedModel, setSelectedModel] = useState(
  //   presentationData[0] as MetricDataInterface
  // );
  // const [totalModelData, setTotalModelData] = useState(
  //   presentationData as MetricDataInterface[]
  // );
  const [cpuOptions, setCpuOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { system_name } = useParams<{ system_name: string }>();
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const hostname = queryParams.get("hostname")

  const uniqueMetrics = useMemo(() => {
    return Array.from(new Set(ECPModelPresentationData.map((data) => data.metric))).map(
      (metric) => ({ value: metric, label: metric })
    );
  }, [ECPModelPresentationData]);

  const goToPreviousModel = () => {
    if (loading) return;

    setLoading(true);
    setCurrentIndex((prevIndex: never) => Math.max(prevIndex - 1, 0));
    setLoading(false);
  };

  const goToNextModel = () => {
    if (loading) return;

    setLoading(true);
    setCurrentIndex((prevIndex: never) =>
      Math.min(prevIndex + 1, ECPModelPresentationData.length - 1)
    );
    setLoading(false);
  };

  useEffect(() => {
    setCpuOptions(uniqueMetrics);
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedModel(ECPModelPresentationData[currentIndex] as ECPModel);
    setLoading(false);
  }, [currentIndex]);

  const handleModelDataChange = (selectedMetric: string) => {
    if (loading) return;

    setLoading(true);
    const newModel = ECPModelPresentationData.find(
      (data) => data.metric === selectedMetric
    );

    if (newModel) {
      setSelectedModel(newModel as ECPModel);

      const newIndex = ECPModelPresentationData.findIndex(
        (data) => data.metric === selectedMetric
      );
      if (newIndex >= 0) {
        setCurrentIndex(newIndex);
      }
    }
    setLoading(false);
  };

  const getCapacityOverviewData = async (
    system_name: string,
    hostname: string
  ): Promise<void> => {
    setLoading(true);

    try {
      const data = await getHostCapacityModelData(system_name, hostname);
      const responseData = JSON.parse(data);
    } catch (err) {
      console.error("Error fetching SQL query:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(system_name && hostname){
      getCapacityOverviewData(system_name, hostname)
    }
  },[system_name, hostname])

  return (
    <ModelPresentationContext.Provider
      value={{
        selectedModel,
        currentIndex,
        totalModelData,
        cpuOptions,
        goToPreviousModel,
        goToNextModel,
        handleModelDataChange,
        getCapacityOverviewData,
        loading
      }}
    >
      {children}
    </ModelPresentationContext.Provider>
  );
};
