import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { TestCategoriesQueryKey } from "./useTestCategoriesData";

const useDeleteTestCategoryMutatuion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (TestCategoryId: string) => {
      const resposne = await axiosInstance.delete(
        `tests/categories/${TestCategoryId}`
      );
      return resposne.data;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      // Alternative: More targeted invalidation
      queryClient.invalidateQueries({
        queryKey: TestCategoriesQueryKey,
      });
    },
  });
};

export default useDeleteTestCategoryMutatuion;
