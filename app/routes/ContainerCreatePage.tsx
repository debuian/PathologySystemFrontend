import { FilePlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ContainerForm } from "~/features/Containers/components/ContainerForm";
import {
  useContainerForm,
  type ContainerFormValues,
} from "~/features/Containers/hooks/useContainerForm";

export default function ContainerCreatePage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useContainerForm();

  const navigate = useNavigate();

  const onSubmit = async (formData: ContainerFormValues) => {
    try {
      console.log("Submitting container data:", formData);

      // Add your API call here
      // await createContainer(formData);

      // Reset form on success
      reset();

      // Navigate or show success message
      // navigate("/containers");
    } catch (error) {
      console.error("Failed to create container:", error);
      // Handle error (show toast, etc.)
    }
  };
  return (
    <Card className="mx-auto max-w-1/2">
      <CardHeader>
        <CardTitle>Container Management {/* Fixed typo */}</CardTitle>
        <CardDescription>
          Fill in the details to Create Container
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContainerForm
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
}
