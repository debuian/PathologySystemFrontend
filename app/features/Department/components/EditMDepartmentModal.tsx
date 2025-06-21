import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";

import useUpdateDepartment from "../hooks/api/useUpdateDepartment";
import type { Department } from "~/constants/types/api/Department";
import { useNavigate } from "react-router";
import useDepartmentForm, {
  type DepartmentFormValues,
} from "../hooks/useDepartmentForm";
import DepartmentForm from "./TestTypeForm";

interface Props {
  data: Department;
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
  } = useDepartmentForm(FormData);

  const { mutateAsync: UpdateDepartment, isPending } = useUpdateDepartment(
    String(id)
  );
  const onSubmit = async (formData: DepartmentFormValues) => {
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
      <DepartmentForm
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
