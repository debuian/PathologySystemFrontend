import { useNavigate } from "react-router";
import { TestForm } from "~/features/Test/components/TestForm";
import { useAddTestMutation } from "~/features/Test/hooks/api/addTestMutation";
import { useTestForm } from "~/features/Test/hooks/useTestForm";
import type { TestFormValues } from "types/form/TestFormValues";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import toast from "react-hot-toast";

export default function TestCreatePage() {
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
  } = useTestForm();

  const navigate = useNavigate();
  const { mutateAsync: addTest, isPending: isAddTestPending } =
    useAddTestMutation();

  const onSubmit = async (formData: TestFormValues) => {
    console.log(formData);
    try {
      await addTest(formData);
      toast.success("Test created successfully!");
      reset();
      navigate("/tests/categories");
      console.log("Redirecting");
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> {"Create Test"}</CardTitle>
        <CardDescription>Fill in the details to Create Test</CardDescription>
      </CardHeader>
      <CardContent>
        <TestForm
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          submitButtonText="Create Test"
          referenceRanges={{ fields, append, remove }}
          specimenRequirements={{
            specimenRequirementFields,
            specimenRequirementAppend,
            specimenRequirementRemove,
          }}
        />
      </CardContent>
    </Card>
  );
}
