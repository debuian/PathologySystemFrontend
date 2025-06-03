import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TestTypeFormValues } from "../useTestTypeForm";
import axiosInstance from "~/lib/axiosInstance";
import { TestTypesQueryKey } from "./useTestTypesData";

const useUpdateDepartment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TestTypeFormValues) => {
      const response = await axiosInstance.patch(
        `/medical_departments/${id}`,
        data
      );
      return response;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TestTypesQueryKey });
    },
  });
};

export default useUpdateDepartment;
