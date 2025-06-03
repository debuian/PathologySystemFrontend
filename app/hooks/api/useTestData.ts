// src/hooks/api/useTestData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { TestUnit } from "./useUnitsData";
import type { TestCategory } from "./useTestCategoriesData";
import type { TestType } from "./useTestTypesData";
import axiosInstance from "~/lib/axiosInstance";

interface CategoryMapping {
  id: number;
  category: TestCategory;
}

interface Test {
  id: number;
  name: string;
  price: number;
  testUnit: TestUnit | null;
  testType: TestType | null;
  categoryMappings: CategoryMapping[];
  normalRangeMin: number;
  normalRangeMax: number;
}

interface TestResponse {
  data: Test[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const fetchTests = async (
  page: number,
  limit: number
): Promise<TestResponse> => {
  const response = await axiosInstance.get(
    `/tests?page=${page}&limit=${limit}`
  );
  return response.data;
};

// Query Key Factory Pattern

export const testsQueryKeys = {
  all: ["tests"] as const,
  lists: () => [...testsQueryKeys.all, "list"] as const,
  list: (filters: { page: number; limit: number }) =>
    [...testsQueryKeys.lists(), filters] as const,
};

export function useTestsData(page: number = 1, limit: number = 10) {
  console.log(page, limit);

  return useQuery({
    queryKey: testsQueryKeys.list({ page, limit }),
    queryFn: () => fetchTests(page, limit),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
