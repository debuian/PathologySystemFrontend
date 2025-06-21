import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { TestUnitsQueryKey } from "./useTestUnitsData";

const useDeletTestUnitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`test-units/${id}`);
      return response.data;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TestUnitsQueryKey });
    },
  });
};

export default useDeletTestUnitMutation;
