// src/hooks/useUnitsData.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";

// Define the type for your data
export interface TestType {
  id: string;
  name: string;
  // Add other properties based on your API response
}

// Function to fetch data
const fetchTestTypes = async (): Promise<TestType[]> => {
  const response = await axiosInstance.get("/medical_departments");

  return response.data;
};

export const TestTypesQueryKey = ["test", "types"];

// Custom hook
export function useTestTypesData() {
  return useQuery({
    queryKey: TestTypesQueryKey,
    queryFn: fetchTestTypes,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Only retry once if the request fails
  });
}
