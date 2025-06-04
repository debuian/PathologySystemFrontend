// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TestCategoryFormValues } from "../useTestCategoryForm";
import { TestCategoriesQueryKey } from "./useTestCategoriesData";
import axiosInstance from "~/lib/axiosInstance";

export const useAddTestCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestCategoryFormValues) => {
      console.log(formData);

      const response = await axiosInstance.post("/tests/categories", {
        ...formData,
      });
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating test:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TestCategoriesQueryKey });
    },
  });
};
