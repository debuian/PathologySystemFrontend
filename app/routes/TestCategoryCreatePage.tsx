import { useNavigate } from "react-router";
import TestCategoryForm from "~/features/TestCategories/components/TestCategoryForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useAddTestCategoryMutation } from "~/features/TestCategories/hooks/api/addTestCategoryMutation";
import useTestCategoryForm, {
  type TestCategoryFormValues,
} from "~/features/TestCategories/hooks/useTestCategoryForm";

export default function TestCategoryCreatePage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestCategoryForm();
  const navigate = useNavigate();
  const { mutateAsync: addTestCategory, isPending } =
    useAddTestCategoryMutation();

  const onSubmit = async (data: TestCategoryFormValues) => {
    try {
      await addTestCategory(data);
      console.log("Toasting");
      reset();
      navigate("/tests/categories");
    } catch (error) {
      console.error("Failed to create test type:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-1/2">
      <CardHeader>
        <CardTitle>Create Test Category</CardTitle>
        <CardDescription>
          Fill in the details to create test category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TestCategoryForm
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isSubmitting={isSubmitting && isPending}
          onSubmit={onSubmit}
          submitButtonText="Create Test Category"
        />
      </CardContent>
    </Card>
  );
}
