// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { DepartmentsQueryKey } from "./useTestTypesData";
import type { DepartmentFormValues } from "types/form/DepartmentFormValues";

export const useAddDepartmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: DepartmentFormValues) => {
      const response = await axiosInstance.post("/medical_departments", {
        ...formData,
      });
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating test:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DepartmentsQueryKey });
    },
  });
};
