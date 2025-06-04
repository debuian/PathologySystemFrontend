import type { TestUnitFormValues } from "~/constants/types/TestUnitFormValues";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useTestUnitForm } from "~/features/TestUnits/hooks/useTestUnitForm";
import { useAddTestUnitMutation } from "~/features/TestUnits/hooks/api/addTestUnitMutation";
import TestUnitForm from "~/features/TestUnits/TestUnitForm";

export default function TestUnitCreate() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestUnitForm();

  const { mutateAsync: addTestUnit, isPending } = useAddTestUnitMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: TestUnitFormValues) => {
    try {
      await addTestUnit(data);
      console.log("Toasting");
      reset();
      navigate("/tests/units");
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };
  return (
    <Card className="max-w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Create Test Unit</CardTitle>
        <CardDescription>
          Fill in the details to create test unit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TestUnitForm
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isSubmitting={isSubmitting && isPending}
          onSubmit={onSubmit}
          submitButtonText="Create Test Unit"
        />
      </CardContent>
    </Card>
  );
}
