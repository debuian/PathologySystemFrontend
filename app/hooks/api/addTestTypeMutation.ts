// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestTypesQueryKey } from "./useTestTypesData";
import type { TestTypeFormValues } from "../useTestTypeForm";
import axiosInstance from "~/lib/axiosInstance";

export const useAddTestTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestTypeFormValues) => {
      console.log(formData);

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
      queryClient.invalidateQueries({ queryKey: TestTypesQueryKey });
    },
  });
};
