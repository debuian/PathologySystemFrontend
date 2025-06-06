import { useForm } from "react-hook-form";
export interface SpecimenFormValues {
  name: string;
  storage: string;
}
const useSpecimenForm = (initialData?: SpecimenFormValues) => {
  return useForm({
    defaultValues: initialData || { name: "", storage: "" },
  });
};

export default useSpecimenForm;
