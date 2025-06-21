import { Activity, AlertTriangle, Calendar, Trash2, User } from "lucide-react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { TestFormValues } from "types/form/TestFormValues";

interface Props {
  register: UseFormRegister<TestFormValues>;
  errors: FieldErrors<TestFormValues>;
  index: number;
  onRemove: () => void;
}

const ReferenceRangesForm = ({ index, register, errors, onRemove }: Props) => {
  // Helper function to get nested error messages
  const getFieldError = (
    fieldName: keyof TestFormValues["referenceRanges"][0]
  ) => {
    return errors?.referenceRanges?.[index]?.[fieldName]?.message;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
      {/* Header with remove button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Reference Range #{index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
          title="Remove this reference range"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Gender Selection */}
        <div className="space-y-2">
          <label
            htmlFor={`gender-${index}`}
            className="text-sm font-medium text-gray-700 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Gender
          </label>
          <select
            id={`gender-${index}`}
            {...register(`referenceRanges.${index}.gender`, {
              required: "Gender is required",
            })}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              getFieldError("gender")
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
          {getFieldError("gender") && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {getFieldError("gender")}
            </p>
          )}
        </div>

        {/* Age Range */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Age Range (Years)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor={`age-min-${index}`}
                className="block text-sm text-gray-600"
              >
                Minimum Age
              </label>
              <input
                id={`age-min-${index}`}
                {...register(`referenceRanges.${index}.age_min_years`, {
                  required: "Minimum age is required",
                  min: { value: 0, message: "Age cannot be negative" },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  getFieldError("age_min_years")
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                type="number"
                min="0"
                placeholder="0"
              />
              {getFieldError("age_min_years") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {getFieldError("age_min_years")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`age-max-${index}`}
                className="block text-sm text-gray-600"
              >
                Maximum Age
              </label>
              <input
                id={`age-max-${index}`}
                {...register(`referenceRanges.${index}.age_max_years`, {
                  required: "Maximum age is required",
                  min: { value: 0, message: "Age cannot be negative" },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  getFieldError("age_max_years")
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                type="number"
                min="0"
                placeholder="100"
              />
              {getFieldError("age_max_years") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {getFieldError("age_max_years")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Normal Range */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-600" />
            Normal Range (g/dL)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor={`normal-min-${index}`}
                className="block text-sm text-gray-600"
              >
                Normal Minimum
              </label>
              <input
                id={`normal-min-${index}`}
                {...register(`referenceRanges.${index}.normal_min`, {
                  required: "Normal minimum is required",
                  min: { value: 0, message: "Value cannot be negative" },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  getFieldError("normal_min")
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                type="number"
                step="0.1"
                min="0"
                placeholder="11.5"
              />
              {getFieldError("normal_min") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {getFieldError("normal_min")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`normal-max-${index}`}
                className="block text-sm text-gray-600"
              >
                Normal Maximum
              </label>
              <input
                id={`normal-max-${index}`}
                {...register(`referenceRanges.${index}.normal_max`, {
                  required: "Normal maximum is required",
                  min: { value: 0, message: "Value cannot be negative" },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  getFieldError("normal_max")
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                type="number"
                step="0.1"
                min="0"
                placeholder="15.5"
              />
              {getFieldError("normal_max") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {getFieldError("normal_max")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Critical Range */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Critical Range (g/dL)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor={`critical-min-${index}`}
                className="block text-sm text-gray-600"
              >
                Critical Minimum
              </label>
              <input
                id={`critical-min-${index}`}
                {...register(`referenceRanges.${index}.critical_min`, {
                  required: "Critical minimum is required",
                  min: { value: 0, message: "Value cannot be negative" },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  getFieldError("critical_min")
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                type="number"
                step="0.1"
                min="0"
                placeholder="7.0"
              />
              {getFieldError("critical_min") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {getFieldError("critical_min")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`critical-max-${index}`}
                className="block text-sm text-gray-600"
              >
                Critical Maximum
              </label>
              <input
                id={`critical-max-${index}`}
                {...register(`referenceRanges.${index}.critical_max`, {
                  required: "Critical maximum is required",
                  min: { value: 0, message: "Value cannot be negative" },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  getFieldError("critical_max")
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                type="number"
                step="0.1"
                min="0"
                placeholder="18.0"
              />
              {getFieldError("critical_max") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {getFieldError("critical_max")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label
            htmlFor={`notes-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Notes (Optional)
          </label>
          <textarea
            id={`notes-${index}`}
            {...register(`referenceRanges.${index}.notes`)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
            rows={3}
            placeholder="Add any additional notes about this reference range..."
          />
        </div>
      </div>
    </div>
  );
};

export default ReferenceRangesForm;
