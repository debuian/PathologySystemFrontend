import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useAddDepartmentMutation } from "~/features/Department/hooks/api/useAddDepartmentMutation";
import useDepartmentForm from "~/features/Department/hooks/useDepartmentForm";
import DepartmentForm from "~/features/Department/components/TestTypeForm";
import type { DepartmentFormValues } from "types/form/DepartmentFormValues";

export default function DepartmentCreatePage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useDepartmentForm();
  const { mutateAsync: addDepartment, isPending } = useAddDepartmentMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      await addDepartment(data);
      toast.success("Medical Department created successfully");
      reset();
      navigate("/department");
    } catch (error) {
      toast.error("Failed to create medical department");
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
        <DepartmentForm
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
