import { useNavigate } from "react-router";
import useSpecimenForm, {
  type SpecimenFormValues,
} from "~/features/Specimen/hooks/useSpecimenForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import SpecimenForm from "~/features/Specimen/components/SpecimenForm";
import addSpecimenMutation from "~/features/Specimen/hooks/api/addSpecimenMutation";

export default function CreateSpecimenPage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useSpecimenForm();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = addSpecimenMutation();
  const onSubmit = async (data: SpecimenFormValues) => {
    try {
      await mutateAsync(data);
      console.log("Toasting");
      reset();
      navigate("/specimens");
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };
  return (
    <Card className="max-w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Create Specimen </CardTitle>
        <CardDescription>
          Fill in the details to create Specimen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SpecimenForm
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
