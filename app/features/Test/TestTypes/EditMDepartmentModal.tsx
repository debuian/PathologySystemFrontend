import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import type { TestTypeFormValues } from "./hooks/useTestTypeForm";
import type { TestType } from "./hooks/api/useTestTypesData";
import useTestTypeForm from "./hooks/useTestTypeForm";
import { useNavigate } from "react-router";
import TestTypeForm from "./TestTypeForm";
import useUpdateDepartment from "./hooks/api/useUpdateDepartment";

interface Props {
  data: TestType;
  ModalCloseFn: () => void;
}
const EditMDepartmentModal = ({ data, ModalCloseFn }: Props) => {
  const { id, ...FormData } = data;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestTypeForm(FormData);

  const { mutateAsync: UpdateDepartment, isPending } = useUpdateDepartment(id);
  const onSubmit = async (formData: TestTypeFormValues) => {
    try {
      await UpdateDepartment(formData);
      console.log("Toasting");
      reset();
      ModalCloseFn();
      navigate("/medical_department");
      console.log("Redirecting");
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Delete</DialogTitle>
      <DialogDescription>Edit the Test Units Details</DialogDescription>
      <TestTypeForm
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        submitButtonText="Edit "
      />
    </DialogContent>
  );
};

export default EditMDepartmentModal;
