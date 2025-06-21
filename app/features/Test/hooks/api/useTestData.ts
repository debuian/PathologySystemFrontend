// src/hooks/api/useTestData.ts
import { useQuery } from "@tanstack/react-query";
import type { Test } from "types/api/Test";
import axiosInstance from "~/lib/axiosInstance";

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
  return useQuery({
    queryKey: testsQueryKeys.list({ page, limit }),
    queryFn: () => fetchTests(page, limit),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
