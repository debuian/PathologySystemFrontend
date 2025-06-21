// src/hooks/useUnitsData.ts
import { useQuery } from "@tanstack/react-query";
import type { TestUnit } from "types/api/TestUnit";
import axiosInstance from "~/lib/axiosInstance";

export const TestUnitsQueryKey = ["test", "units"] as const;

// Function to fetch data
const fetchTestUnits = async () => {
  const response = await axiosInstance.get<TestUnit[]>("/test-units");
  return response.data;
};

// Custom hook
export function useTestUnitsData() {
  return useQuery({
    queryKey: TestUnitsQueryKey,
    queryFn: fetchTestUnits,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 3, // Only retry once if the request fails
  });
}
