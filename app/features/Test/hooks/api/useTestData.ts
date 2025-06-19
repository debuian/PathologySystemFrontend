// src/hooks/api/useTestData.ts
import { useQuery } from "@tanstack/react-query";
import type { TestCategory } from "../../../TestCategories/hooks/api/useTestCategoriesData";
import axiosInstance from "~/lib/axiosInstance";
import type { TestUnit } from "~/features/TestUnits/hooks/api/useUnitsData";
import type { TestType } from "~/features/TestTypes/hooks/api/useTestTypesData";
import type { SpecimenData } from "~/features/Specimen/hooks/api/useSpecimenData";

interface CategoryMapping {
  id: number;
  category: TestCategory;
}

interface specimenRequirement {
  id: number;
  specimen: SpecimenData;
  container: {
    id: number;
    name: string;
  };
}

export interface Test {
  id: number;
  name: string;
  price: number;
  testUnit: TestUnit | null;
  medicalDepartment: TestType | null;
  categoryMappings: CategoryMapping[];
  specimenRequirements: specimenRequirement[];
  referenceRanges: {
    id: number;
    age_min_years: string;
    age_max_years: string;
    gender: string;
    normal_min: string;
    normal_max: string;
    critical_min: string;
    critical_max: string;
    notes: string;
  }[];
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
  return useQuery({
    queryKey: testsQueryKeys.list({ page, limit }),
    queryFn: () => fetchTests(page, limit),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
