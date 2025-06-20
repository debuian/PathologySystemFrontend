import { useForm } from "react-hook-form";
import type { TestCategoryFormValues } from "types/form/TestCategoryFormValues";

const useTestCategoryForm = (initialData?: TestCategoryFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<TestCategoryFormValues>({
    defaultValues: initialData || {
      name: "",
    },
  });
  console.log("name value", getValues("name"));

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

export default useTestCategoryForm;
