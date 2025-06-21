import { useNavigate } from "react-router";
import { TestForm } from "~/features/Test/components/TestForm";
import type { TestFormValues } from "types/form/TestFormValues";
import { useUpdateTestMutation } from "~/features/Test/hooks/api/updateTestMutation";
import { useTestForm } from "~/features/Test/hooks/useTestForm";

interface TestEditProps {
  initialData: TestFormValues;
  dataId: string;
  ModalCLoseFn: () => void;
}
// nedd to use Function Expression rather than Function Declaration
// for the component that receive props.
const TestEdit = ({ initialData, dataId, ModalCLoseFn }: TestEditProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
    referenceRanges: { fields, append, remove },
    specimenRequirements: {
      specimenRequirementFields,
      specimenRequirementAppend,
      specimenRequirementRemove,
    },
  } = useTestForm(initialData);

  const { mutateAsync: updateTest, isPending: isAddTestPending } =
    useUpdateTestMutation(dataId);

  const navigate = useNavigate();
  const onSubmit = async (formData: TestFormValues) => {
    try {
      await updateTest(formData);
      console.log("Toasting");
      reset();
      ModalCLoseFn();
      navigate("/tests");
      console.log("Redirecting");
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };

  return (
    <TestForm
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      setValue={setValue}
      watch={watch}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      submitButtonText="Edit Test"
      referenceRanges={{ fields, append, remove }}
      specimenRequirements={{
        specimenRequirementFields,
        specimenRequirementAppend,
        specimenRequirementRemove,
      }}
    />
  );
};
TestEdit.displayName = "TestEditPage";
export default TestEdit;
