import { useForm } from "react-hook-form";
export interface TestCategoryFormValues {
  name: "";
}
const useTestCategoryForm = (initialData?: TestCategoryFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestCategoryFormValues>({
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

export default useTestCategoryForm;
