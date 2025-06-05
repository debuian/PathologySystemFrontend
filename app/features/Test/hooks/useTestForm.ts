import { useFieldArray, useForm } from "react-hook-form";
import type { TestFormValues } from "~/constants/types/TestFormValues";

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
      testUnitId: "",
      medicalDepartmentId: "",
      categoryIds: [],
      normalRangeMin: "",
      normalRangeMax: "",
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
  };
};
