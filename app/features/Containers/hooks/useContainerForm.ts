import { useForm } from "react-hook-form";
import type { ContainerFormValues } from "types/form/ContainerFormValues";

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
