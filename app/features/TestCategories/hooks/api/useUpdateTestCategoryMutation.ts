import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import type { TestCategoryFormValues } from "../useTestCategoryForm";
import { TestCategoriesQueryKey } from "./useTestCategoriesData";

const useUpdateTestCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: TestCategoryFormValues;
    }) => {
      const response = await axiosInstance.patch(
        `/tests/categories/${id}`,
        data
      );
      return response.data;
    },
    onError: (error) => Promise.reject(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TestCategoriesQueryKey });
    },
  });
};

export default useUpdateTestCategory;
