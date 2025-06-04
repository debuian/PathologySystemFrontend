import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { TestTypeFormValues } from "~/features/TestTypes/hooks/useTestTypeForm";

interface TestUnitFormProps {
  register: UseFormRegister<TestTypeFormValues>;
  handleSubmit: UseFormHandleSubmit<TestTypeFormValues, TestTypeFormValues>;
  control: Control<TestTypeFormValues, any, TestTypeFormValues>;
  setValue: UseFormSetValue<TestTypeFormValues>;
  watch: UseFormWatch<TestTypeFormValues>;
  errors: FieldErrors<TestTypeFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: TestTypeFormValues) => Promise<void>;
  submitButtonText?: string;
}
const TestTypeForm = ({
  register,
  handleSubmit,
  control,
  setValue,
  watch,
  errors,
  isSubmitting,
  onSubmit,
  submitButtonText = "Create",
}: TestUnitFormProps) => {
  const formSubmit = async (data: TestTypeFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {}
  };
  return (
    <form className="flex flex-col  gap-4 " onSubmit={handleSubmit(formSubmit)}>
      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mt-2 mb-2"
          htmlFor="test-name"
        >
          Medical Department Name
        </label>
        <input
          type="text"
          id="test-name"
          {...register("name", { required: "Test Types name is required" })}
          placeholder="Enter medical department name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs ">{errors.name.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-end bg-black text-white px-4 py-2 rounded-xl disabled:opacity-50 "
      >
        {isSubmitting ? "Processing..." : submitButtonText}
      </button>
    </form>
  );
};

export default TestTypeForm;
