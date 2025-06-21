import type { TestUnitFormValues } from "types/form/TestUnitFormValues";
import TestUnitForm from "./TestUnitForm";
import { useNavigate } from "react-router";
import { useTestUnitForm } from "../hooks/useTestUnitForm";
import useTestUpdateMutation from "../hooks/api/useTestUnitUpdateMutation";
import toast from "react-hot-toast";

interface TestUnitEditProps {
  initialData: TestUnitFormValues;
  dataId: string;
  ModalCLoseFn: () => void;
}
const TestUnitEdit = ({
  initialData,
  dataId,
  ModalCLoseFn,
}: TestUnitEditProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestUnitForm(initialData);

  const navigate = useNavigate();
  const { mutateAsync: updateTestUnit, isPending: isAddTestPending } =
    useTestUpdateMutation();

  const onSubmit = async (formData: TestUnitFormValues) => {
    try {
      await updateTestUnit({ data: formData, id: dataId });
      toast.success("Test Unit updated successfully");
      reset();
      ModalCLoseFn();
      navigate("/tests/units");
      console.log("Redirecting");
    } catch (error) {
      toast.error("Failed to update Test Unit");
      console.error("Failed to create test:", error);
    }
  };

  return (
    <TestUnitForm
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      setValue={setValue}
      watch={watch}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      submitButtonText="Edit Test"
    />
  );
};

export default TestUnitEdit;
