import { useNavigate } from "react-router";
import TestTypeForm from "~/features/Test/TestTypes/TestTypeForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useAddTestTypeMutation } from "~/hooks/api/addTestTypeMutation";
import useTestTypeForm, {
  type TestTypeFormValues,
} from "~/hooks/useTestTypeForm";

export default function TestTypeCreatePage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestTypeForm();
  const { mutateAsync: addTestType, isPending } = useAddTestTypeMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: TestTypeFormValues) => {
    try {
      console.log(data);
      await addTestType(data);
      console.log("Toasting");
      reset();
      navigate("/medical_department");
    } catch (error) {
      console.error("Failed to create test type:", error);
    }
  };

  return (
    <Card className="max-w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Create Medical Department</CardTitle>
        <CardDescription>
          Fill in the details to create medical department
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TestTypeForm
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isSubmitting={isSubmitting && isPending}
          onSubmit={onSubmit}
          submitButtonText="Create"
        />
      </CardContent>
    </Card>
  );
}
