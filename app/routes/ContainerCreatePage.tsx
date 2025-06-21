import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ContainerForm } from "~/features/Containers/components/ContainerForm";
import { useAddContainerMutation } from "~/features/Containers/hooks/api/addContainersMutation";
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
  const { mutateAsync } = useAddContainerMutation();

  const onSubmit = async (formData: ContainerFormValues) => {
    try {
      console.log("Submitting container data:", formData);

      await mutateAsync(formData);
      toast.success("Container created successfully!");
      reset();

      // Navigate or show success message
      navigate("/containers");
    } catch (error) {
      toast.error("Failed to create container. Please try again.");

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
