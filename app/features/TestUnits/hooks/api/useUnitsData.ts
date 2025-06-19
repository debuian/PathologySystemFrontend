// src/hooks/useUnitsData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "~/lib/axiosInstance";

// Define the type for your data
export interface TestUnit {
  id: string;
  name: string;
  // Add other properties based on your API response
}

// Function to fetch data
const fetchTestUnits = async (): Promise<TestUnit[]> => {
  const response = await axiosInstance.get("/test-units");
  return response.data;
};
export const TestUnitsQueryKey = ["test", "units"];

// Custom hook
export function useTestUnitsData() {
  return useQuery({
    queryKey: TestUnitsQueryKey,
    queryFn: fetchTestUnits,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 3, // Only retry once if the request fails
  });
}
