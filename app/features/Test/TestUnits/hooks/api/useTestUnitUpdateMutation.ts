import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TestUnitFormValues } from "~/constants/types/TestUnitFormValues";
import axiosInstance from "~/lib/axiosInstance";
import { TestUnitsQueryKey } from "./useUnitsData";

const useTestUpdateMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: TestUnitFormValues) => {
      const response = await axiosInstance.patch(
        `/tests/units/${id}`,
        formData
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating test:", error);
      Promise.reject(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TestUnitsQueryKey,
      });
    },
  });
};

export default useTestUpdateMutation;
