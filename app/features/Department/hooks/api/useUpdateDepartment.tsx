import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { DepartmentsQueryKey } from "./useTestTypesData";
import type { DepartmentFormValues } from "../useDepartmentForm";

const useUpdateDepartment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DepartmentFormValues) => {
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
      queryClient.invalidateQueries({ queryKey: DepartmentsQueryKey });
    },
  });
};

export default useUpdateDepartment;
