// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TestUnitsQueryKey } from "./useUnitsData";
import type { TestUnitFormValues } from "~/constants/types/TestUnitFormValues";
import axiosInstance from "~/lib/axiosInstance";

export const useAddTestUnitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestUnitFormValues) => {
      const response = await axiosInstance.post("/tests/units", {
        ...formData,
      });
      console.log(response.data);
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
