import { useForm } from "react-hook-form";
import type { TestUnitFormValues } from "types/form/TestUnitFormValues";

export const useTestUnitForm = (initialData?: TestUnitFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestUnitFormValues>({
    defaultValues: initialData || {
      name: "",
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
