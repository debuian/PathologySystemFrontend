// src/hooks/useUnitsData.ts
import { useQuery } from "@tanstack/react-query";
import type { BaseApiResposne } from "~/global/api.response";
import axiosInstance from "~/lib/axiosInstance";

export interface TestCategory {
  id: string;
  name: string;
}

export interface TestCategoriesResp extends BaseApiResposne {
  data: TestCategory[];
}
// Function to fetch data
const fetchTestCategories = async (): Promise<TestCategory[]> => {
  const response = await axiosInstance.get("/test-categories");
  console.log("Fetched test categories:", response.data);

  return response.data;
};

export const TestCategoriesQueryKey = ["test", "categories"];

// Custom hook
export function useTestCategoriesData() {
  return useQuery({
    queryKey: TestCategoriesQueryKey,
    queryFn: fetchTestCategories,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Only retry once if the request fails
  });
}
