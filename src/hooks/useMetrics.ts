import { useState, useMemo, useEffect } from "react";
import { getModelsData } from "../api/models";

// Define the structure of individual metrics
export interface MetricInterface {
  system_name: string;
  capacity_indicator: string;
  capacity_feedback: string;
  onboarding_percent: number;
  peak_season: string;
  it_kvi: string;
  business_kvi: string,
  forecast: number,
}

// Define the return type of the hook
export interface UseMetricsResult {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
  metricsToDisplay: MetricInterface[];
  isLoading: boolean;
  error: string | null;
}

export const useMetrics = (): UseMetricsResult => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [apiMetrics, setApiMetrics] = useState<MetricInterface[]>([]); // State to store API data
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getModelsData();
        setApiMetrics(JSON.parse(response));
      } catch (err: any) {
        setError(err.message || "Failed to fetch metrics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);


    // Filter metrics based on the search query
    const filteredMetrics: MetricInterface[] = useMemo(() => {
      if (!searchQuery) return apiMetrics;
      return apiMetrics.filter((metric) =>
        Object.entries(metric).some(([key, value]) => {
          const keyLower = key.toLowerCase();
          const valueString = value != null ? value.toString().toLowerCase() : "";
          return (
            keyLower.includes(searchQuery.toLowerCase()) ||
            valueString.includes(searchQuery.toLowerCase())
          );
        })
      );
    }, [apiMetrics, searchQuery]);
  
    const handleSearchQuery = (query: string): void => {
      setSearchQuery(query.toLowerCase());
    };
  
    return {
      searchQuery,
      handleSearchQuery,
      metricsToDisplay: filteredMetrics,
      isLoading,
      error,
    };
};
