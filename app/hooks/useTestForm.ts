import { useForm } from "react-hook-form";
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
      testTypeId: "",
      categoryIds: [],
      normalRangeMin: "",
      normalRangeMax: "",
    },
  });

  return {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  };
};
