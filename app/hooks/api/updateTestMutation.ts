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
        price: Number(formData.price),
        normalRangeMin: Number(formData.normalRangeMin),
        normalRangeMax: Number(formData.normalRangeMax),
      });
      console.log(response.data);
      return response.data;
      //   return new Promise((resolve, rejects) => {
      //     setTimeout(() => resolve(response.data), 4000);
      //   });
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
