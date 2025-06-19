import {
  type Control,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import type { ContainerFormValues } from "../hooks/useContainerForm";

interface ContainerFormProps {
  register: UseFormRegister<ContainerFormValues>;
  handleSubmit: UseFormHandleSubmit<ContainerFormValues, ContainerFormValues>;
  control: Control<ContainerFormValues, any, ContainerFormValues>;
  setValue: UseFormSetValue<ContainerFormValues>;
  watch: UseFormWatch<ContainerFormValues>;
  errors: FieldErrors<ContainerFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: ContainerFormValues) => Promise<void>;
  submitButtonText?: string;
}

export const ContainerForm = ({
  register,
  handleSubmit,
  control,
  setValue,
  watch,
  errors,
  isSubmitting,
  onSubmit,
  submitButtonText = "Create",
}: ContainerFormProps) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mt-2 mb-2"
          htmlFor="name"
        >
          Container Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Container name is required" })}
          placeholder="Enter Container name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs ">{errors.name.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-end bg-black text-white hover:bg-black/80 px-4 py-2 rounded-xl disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : submitButtonText}
      </button>
    </form>
  );
};
