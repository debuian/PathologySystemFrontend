import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { TestCategoryFormValues } from "types/form/TestCategoryFormValues";

interface TestCategoryFormProps {
  register: UseFormRegister<TestCategoryFormValues>;
  handleSubmit: UseFormHandleSubmit<
    TestCategoryFormValues,
    TestCategoryFormValues
  >;
  control: Control<TestCategoryFormValues, any, TestCategoryFormValues>;
  setValue: UseFormSetValue<TestCategoryFormValues>;
  watch: UseFormWatch<TestCategoryFormValues>;
  errors: FieldErrors<TestCategoryFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: TestCategoryFormValues) => Promise<void>;
  submitButtonText?: string;
}
const TestCategoryForm = ({
  register,
  handleSubmit,
  control,
  setValue,
  watch,
  errors,
  isSubmitting,
  onSubmit,
  submitButtonText = "Create Test Category",
}: TestCategoryFormProps) => {
  const formSubmit = async (data: TestCategoryFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {}
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mt-2 mb-2"
          htmlFor="test-name"
        >
          Test Cateogry Name
        </label>
        <input
          type="text"
          id="test-name"
          {...register("name", { required: "Test Types name is required" })}
          placeholder="Enter test name"
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

export default TestCategoryForm;
