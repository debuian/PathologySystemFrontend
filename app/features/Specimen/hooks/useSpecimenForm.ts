import { useForm } from "react-hook-form";
export interface SpecimenFormValues {
  name: string;
}
const useSpecimenForm = (initialData?: SpecimenFormValues) => {
  return useForm({
    defaultValues: initialData || { name: "" },
  });
};

export default useSpecimenForm;
