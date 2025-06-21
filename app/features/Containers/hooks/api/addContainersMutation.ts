import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import { ContainerQueryKeys } from "./useContainersData";
import type { ContainerFormValues } from "types/form/ContainerFormValues";

export const useAddContainerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ContainerFormValues) => {
      const response = await axiosInstance.post("/test-containers", {
        ...data,
      });
      return response.data;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContainerQueryKeys });
    },
  });
};
