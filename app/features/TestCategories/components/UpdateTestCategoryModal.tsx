import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { useNavigate } from "react-router";
import useUpdateTestCategory from "../hooks/api/useUpdateTestCategoryMutation";
import TestCategoryForm from "./TestCategoryForm";
import { useEffect } from "react";
import type { TestCategoryFormValues } from "types/form/TestCategoryFormValues";
import useTestCategoryForm from "../hooks/useTestCategoryForm";

interface updateTestCategoryModalProps {
  id: string;
  data: TestCategoryFormValues;
  ModalCloseFn: () => void;
}
const UpdateTestCategoryModal = ({
  id,
  data,
  ModalCloseFn,
}: updateTestCategoryModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useTestCategoryForm(data);

  const navigate = useNavigate();

  useEffect(() => {
    reset(data);
    return () => reset(); // Optional: Clear form when unmounting
  }, [data]);

  const { mutateAsync: updateTestCategoryFn, isPending } =
    useUpdateTestCategory();
  const onSubmit = async (data: TestCategoryFormValues) => {
    try {
      await updateTestCategoryFn({ id, data });
      console.log("Toasting");
      reset();
      ModalCloseFn();
      navigate("/tests/categories");
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogDescription>Edit the Test Units Details</DialogDescription>
      <TestCategoryForm
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        submitButtonText="Edit"
      />
    </DialogContent>
  );
};

export default UpdateTestCategoryModal;
