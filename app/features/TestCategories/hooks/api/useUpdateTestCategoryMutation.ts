import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { TestCategoriesQueryKey } from "./useTestCategoriesData";
import type { TestCategoryFormValues } from "types/form/TestCategoryFormValues";

interface props {
  id: string;
  data: TestCategoryFormValues;
}

const useUpdateTestCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: props) => {
      const response = await axiosInstance.patch(
        `/test-categories/${id}`,
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
