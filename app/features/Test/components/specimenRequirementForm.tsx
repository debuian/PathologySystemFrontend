import { AlertTriangle, TestTube, Trash2 } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { TestFormValues } from "types/form/TestFormValues";
import { useContainersData } from "~/features/Containers/hooks/api/useContainersData";
import { useSpecimensData } from "~/features/Specimen/hooks/api/useSpecimenData";

interface SpecimenRequirementFormProps {
  register: UseFormRegister<TestFormValues>;
  errors: FieldErrors<TestFormValues>;
  index: number;
  onRemove: () => void;
  control: Control<TestFormValues>;
}

const SpecimenRequirementForm = ({
  index,
  register,
  errors,
  onRemove,
  control,
}: SpecimenRequirementFormProps) => {
  const { data: specimenData } = useSpecimensData();
  const { data: containerData } = useContainersData();

  const getFieldError = (
    fieldName: keyof TestFormValues["specimenRequirements"][0]
  ) => errors?.specimenRequirements?.[index]?.[fieldName]?.message;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TestTube className="w-5 h-5 text-blue-600" />
          Specimen Requirement #{index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
          title="Remove this specimen requirement"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specimen Select */}
        <div className="space-y-2">
          <label
            htmlFor={`specimenId-${index}`}
            className="text-sm font-medium text-gray-700"
          >
            Specimen
          </label>
          <Controller
            name={`specimenRequirements.${index}.specimenId`}
            control={control}
            rules={{ required: "Specimen is required" }}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a specimen">
                    {specimenData?.find((s) => s.id === field.value)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {specimenData?.map((specimen) => (
                    <SelectItem key={specimen.id} value={String(specimen.id)}>
                      {specimen.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {getFieldError("specimenId") && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {getFieldError("specimenId")}
            </p>
          )}
        </div>

        {/* Container Select */}
        <div className="space-y-2">
          <label
            htmlFor={`containerId-${index}`}
            className="text-sm font-medium text-gray-700"
          >
            Container
          </label>
          <Controller
            name={`specimenRequirements.${index}.containerId`}
            control={control}
            rules={{ required: "Container is required" }}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a container">
                    {
                      containerData?.find(
                        (c) => String(c.id) == String(field.value)
                      )?.name
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {containerData?.map((container) => {
                    return (
                      <SelectItem
                        key={container.id}
                        value={String(container.id)}
                      >
                        {container.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {getFieldError("containerId") && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {getFieldError("containerId")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecimenRequirementForm;
