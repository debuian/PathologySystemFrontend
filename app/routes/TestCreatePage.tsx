import { useNavigate } from "react-router";
import { TestForm } from "~/features/Test/TestForm";
import { useAddTestMutation } from "~/hooks/api/addTestMutation";
import { useTestForm } from "~/hooks/useTestForm";
import type { TestFormValues } from "~/constants/types/TestFormValues";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function TestCreatePage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestForm();

  const navigate = useNavigate();
  const { mutateAsync: addTest, isPending: isAddTestPending } =
    useAddTestMutation();

  const onSubmit = async (formData: TestFormValues) => {
    try {
      await addTest(formData);
      console.log("Toasting");
      reset();
      navigate("/tests");
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
        />
      </CardContent>
    </Card>
  );
}
