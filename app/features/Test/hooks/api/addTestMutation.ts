// ~/hooks/api/addTestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TestFormValues } from "types/form/TestFormValues";
import axiosInstance from "~/lib/axiosInstance";
import { testsQueryKeys } from "./useTestData";

export const useAddTestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TestFormValues) => {
      const payload = {
        ...formData,
        specimenRequirements: formData.specimenRequirements.map((specimen) => ({
          specimenId: Number(specimen.specimenId),
          containerId: Number(specimen.containerId),
        })),
        categoryIds: formData.categoryIds.map(Number),
        medicalDepartmentId: Number(formData.medicalDepartmentId),
        testUnitId: Number(formData.testUnitId),
      };

      console.log("Submitting payload:", payload);

      const response = await axiosInstance.post("/tests", payload);
      console.log(response.data);
      return response.data;
    },

    onError: (error) => {
      console.error("Error creating test:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testsQueryKeys.all });
    },
  });
};
