// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TestFormValues } from "~/constants/types/TestFormValues";
import { testsQueryKeys } from "./useTestData";
import axiosInstance from "~/lib/axiosInstance";

export const useUpdateTestMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestFormValues) => {
      console.log(formData);
      console.log("Inside Updae fun");
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
