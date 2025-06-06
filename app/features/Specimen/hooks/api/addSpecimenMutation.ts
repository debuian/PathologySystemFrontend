import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";
import type { SpecimenFormValues } from "../useSpecimenForm";
import { SpecimensQueryKey } from "./useSpecimenData";

interface addSpecimenMutationProsp {
  id: string;
  data: SpecimenFormValues;
}
const addSpecimenMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SpecimenFormValues) => {
      const response = await axiosInstance.post("/specimens", data);
      return response.data;
    },
    onError: (error) => {
      Promise.reject(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SpecimensQueryKey });
    },
  });
};

export default addSpecimenMutation;
