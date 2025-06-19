import { useForm } from "react-hook-form";

export interface ContainerFormValues {
  name: string;
}
export const useContainerForm = (initialData?: ContainerFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContainerFormValues>({
    defaultValues: initialData || { name: "" },
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
