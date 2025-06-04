import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { testsQueryKeys } from "./useTestData";
import axiosInstance from "~/lib/axiosInstance";

export const useDeleteTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testId: string) => {
      const response = await axiosInstance.delete(`/tests/${testId}`);
      console.log(response.data);
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
