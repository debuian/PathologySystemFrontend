import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { TestTypesQueryKey } from "./useTestTypesData";

const useDelDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`medical_departments/${id}`);
      return response.data;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TestTypesQueryKey });
    },
  });
};

export default useDelDepartment;
