import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "~/lib/axiosInstance";
import { testsQueryKeys } from "./useTestData";

export const useDeleteTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testId: string) => {
      const response = await axiosInstance.delete(`/tests/${testId}`);
      return response.data;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      // Alternative: More targeted invalidation
      queryClient.invalidateQueries({
        queryKey: testsQueryKeys.lists(),
      });
    },
  });
};
