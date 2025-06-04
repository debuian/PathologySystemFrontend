// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TestFormValues } from "~/constants/types/TestFormValues";
import axiosInstance from "~/lib/axiosInstance";
import { testsQueryKeys } from "./useTestData";

export const useUpdateTestMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestFormValues) => {
      const response = await axiosInstance.patch(`/tests/${id}`, {
        ...formData,
      });
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating test:", error);
    },
    onSuccess: () => {
      // Alternative: More targeted invalidation
      queryClient.invalidateQueries({
        queryKey: testsQueryKeys.lists(),
      });
    },
  });
};
