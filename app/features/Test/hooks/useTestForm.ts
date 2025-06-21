import { useFieldArray, useForm } from "react-hook-form";
import type { TestFormValues } from "types/form/TestFormValues";

export const useTestForm = (initialData?: TestFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestFormValues>({
    defaultValues: initialData || {
      name: "",
      price: "",
      testUnitId: 0,
      medicalDepartmentId: 0,
      categoryIds: [],
      specimenRequirements: [
        {
          specimenId: 0,
          containerId: 0,
        },
      ],
      referenceRanges: [
        {
          age_min_years: "",
          age_max_years: "",
          gender: "male",
          normal_min: "",
          normal_max: "",
          critical_min: "",
          critical_max: "",
          notes: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "referenceRanges",
    control,
  });

  const {
    fields: specimenRequirementFields,
    append: specimenRequirementAppend,
    remove: specimenRequirementRemove,
  } = useFieldArray({
    name: "specimenRequirements",
    control,
  });
  return {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
    referenceRanges: {
      fields,
      append,
      remove,
    },
    specimenRequirements: {
      specimenRequirementFields,
      specimenRequirementAppend,
      specimenRequirementRemove,
    },
  };
};
