import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TestUnitFormValues } from "types/form/TestUnitFormValues";
import axiosInstance from "~/lib/axiosInstance";
import { TestUnitsQueryKey } from "./useTestUnitsData";

interface UseTestUpdateMutation {
  id: string;
  data: TestUnitFormValues;
}

const useTestUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: UseTestUpdateMutation) => {
      const response = await axiosInstance.patch(`/test-units/${id}`, data);
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
