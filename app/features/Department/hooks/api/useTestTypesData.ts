// src/hooks/useUnitsData.ts
import { useQuery } from "@tanstack/react-query";
import type { Department } from "~/constants/types/api/Department";
import axiosInstance from "~/lib/axiosInstance";

// Define the type for your data

// Function to fetch data
const fetchDepartments = async (): Promise<Department[]> => {
  const response = await axiosInstance.get("/medical_departments");

  return response.data;
};

export const DepartmentsQueryKey = ["test", "types"];

// Custom hook
export function useDepartmentsData() {
  return useQuery({
    queryKey: DepartmentsQueryKey,
    queryFn: fetchDepartments,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Only retry once if the request fails
  });
}
