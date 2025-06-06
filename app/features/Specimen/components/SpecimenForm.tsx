import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import type { SpecimenFormValues } from "../hooks/useSpecimenForm";
import { Button } from "~/components/ui/button";

interface SpecimenFormProps {
  register: UseFormRegister<SpecimenFormValues>;
  handleSubmit: UseFormHandleSubmit<SpecimenFormValues, SpecimenFormValues>;
  control: Control<SpecimenFormValues, any, SpecimenFormValues>;
  setValue: UseFormSetValue<SpecimenFormValues>;
  watch: UseFormWatch<SpecimenFormValues>;
  errors: FieldErrors<SpecimenFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: SpecimenFormValues) => Promise<void>;
  submitButtonText?: string;
}

const SpecimenForm = ({
  register,
  handleSubmit,
  control,
  setValue,
  watch,
  errors,
  isSubmitting,
  onSubmit,
  submitButtonText = "Create",
}: SpecimenFormProps) => {
  const formSubmit = async (data: SpecimenFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {}
  };
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(formSubmit)}>
      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mt-2 mb-2"
          htmlFor="name"
        >
          Test Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Test name is required" })}
          placeholder="Enter test name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs ">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mt-2 mb-2"
          htmlFor="storage"
        >
          Test Name
        </label>
        <input
          type="text"
          id="storage"
          {...register("storage", { required: "Test name is required" })}
          placeholder="Enter storage name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.storage && (
          <p className="text-red-500 text-xs ">{errors.storage.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="self-end bg-black text-white px-4 py-2 rounded-xl disabled:opacity-50 "
      >
        {isSubmitting ? "Processing..." : submitButtonText}
      </Button>
    </form>
  );
};

export default SpecimenForm;
