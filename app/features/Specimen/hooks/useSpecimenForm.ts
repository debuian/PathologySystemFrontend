import { useForm } from "react-hook-form";
import type { SpecimenFormValues } from "types/form/SpecimenFormValues";

const useSpecimenForm = (initialData?: SpecimenFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
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

export default useSpecimenForm;
