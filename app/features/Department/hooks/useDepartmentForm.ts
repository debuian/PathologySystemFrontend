import { useForm } from "react-hook-form";

export interface DepartmentFormValues {
  name: string;
}
const useDepartmentForm = (initialData?: DepartmentFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormValues>({
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

export default useDepartmentForm;
