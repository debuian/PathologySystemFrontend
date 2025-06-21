// src/hooks/useUnitsData.ts
import { useQuery } from "@tanstack/react-query";
import type { TestCategory } from "types/api/TestCategory";
import axiosInstance from "~/lib/axiosInstance";

const fetchTestCategories = async () => {
  const response = await axiosInstance.get<TestCategory[]>("/test-categories");
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
