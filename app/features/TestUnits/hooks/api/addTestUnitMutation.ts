// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestUnitsQueryKey } from "./useTestUnitsData";
import axiosInstance from "~/lib/axiosInstance";
import type { TestUnitFormValues } from "types/form/TestUnitFormValues";

export const useAddTestUnitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestUnitFormValues) => {
      const response = await axiosInstance.post("/test-units", {
        ...formData,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating test:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TestUnitsQueryKey });
    },
  });
};
