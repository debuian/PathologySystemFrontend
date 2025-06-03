import { useForm } from "react-hook-form";
export interface TestTypeFormValues {
  name: "";
}
const useTestTypeForm = (initialData?: TestTypeFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestTypeFormValues>({
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

export default useTestTypeForm;
