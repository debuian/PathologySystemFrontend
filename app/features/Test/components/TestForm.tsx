import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "~/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utlis";
import type { TestFormValues } from "~/constants/types/TestFormValues";
import { useTestCategoriesData } from "~/features/TestCategories/hooks/api/useTestCategoriesData";
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
import { useTestTypesData } from "../../TestTypes/hooks/api/useTestTypesData";
import { useTestUnitsData } from "../../TestUnits/hooks/api/useUnitsData";
import ReferenceRangesForm from "./ReferenceRangesForm";
import { Button } from "~/components/ui/button";
import { useSpecimensData } from "~/features/Specimen/hooks/api/useSpecimenData";

interface TestFormProps {
  register: UseFormRegister<TestFormValues>;
  handleSubmit: UseFormHandleSubmit<TestFormValues, TestFormValues>;
  control: Control<TestFormValues, any, TestFormValues>;
  setValue: UseFormSetValue<TestFormValues>;
  watch: UseFormWatch<TestFormValues>;
  errors: FieldErrors<TestFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: TestFormValues) => Promise<void>;
  submitButtonText?: string;
  referenceRanges: {
    fields: FieldArrayWithId<TestFormValues, "referenceRanges", "id">[];
    append: UseFieldArrayAppend<TestFormValues, "referenceRanges">;
    remove: UseFieldArrayRemove;
  };
}

export const TestForm = ({
  register,
  handleSubmit,
  control,
  setValue,
  watch,
  errors,
  isSubmitting,
  onSubmit,
  submitButtonText = "Create Test",
  referenceRanges: { fields, append, remove },
}: TestFormProps) => {
  const { data: testUnits } = useTestUnitsData();
  const { data: testTypes } = useTestTypesData();
  const { data: categories } = useTestCategoriesData();
  const { data: specimenData } = useSpecimensData();
  const [openCategoriesPopover, setOpenCategoriesPopover] = useState(false);
  const categoryIds = watch("categoryIds");

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = categoryIds || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];
    setValue("categoryIds", newCategories);
  };

  const getSelectedCategoryNames = () => {
    if (!categoryIds || categoryIds.length === 0) return "Select categories";
    return categoryIds
      .map((id) => categories?.find((cat) => cat.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };
  const formSubmit = async (data: TestFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {}
  };
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(formSubmit)}>
      {/* Text Input Example */}

      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mt-2 mb-2"
          htmlFor="test-name"
        >
          Test Name
        </label>
        <input
          type="text"
          id="test-name"
          {...register("name", { required: "Test name is required" })}
          placeholder="Enter test name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs ">{errors.name.message}</p>
        )}
      </div>

      {/* Number Input Example */}

      <div className="space-y-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          })}
          placeholder="Enter Price for the Test"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.price && (
          <p className="text-red-500 text-xs ">{errors.price.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select Input Example */}

        <div className="space-y-2 ">
          <label htmlFor="testUnitId">Test Unit</label>

          <Controller
            name="testUnitId"
            control={control}
            rules={{ required: "Test unit is required" }}
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit">
                      {testUnits?.find((test) => test.id === field.value)?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {testUnits?.map((unit) => (
                      <SelectItem key={unit.id} value={String(unit.id)}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.testUnitId && (
            <p className="text-red-500 text-xs ">{errors.testUnitId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="medicalDepartmentId">Department</label>
          <Controller
            name="medicalDepartmentId"
            control={control}
            rules={{ required: "Medical Department is required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type">
                    {testTypes?.find((type) => type.id === field.value)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {testTypes?.map((type) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="specimenId">Department</label>
        <Controller
          name="specimenId"
          control={control}
          rules={{ required: "specimen is required" }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a specimen">
                  {testTypes?.find((type) => type.id === field.value)?.name}
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
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Categories (Select multiple)
        </label>
        <Popover
          open={openCategoriesPopover}
          onOpenChange={setOpenCategoriesPopover}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              role="combobox"
              aria-expanded={openCategoriesPopover}
              className="flex h-10 w-full items-center justify-between rounded-md px-3 py-2 bg-white text-black border border-input"
            >
              {getSelectedCategoryNames()}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full p-0 bg-white"
            style={{ width: "var(--radix-popover-trigger-width)" }}
          >
            <Command className="bg-white">
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {categories?.map((category) => {
                    const isSelected = categoryIds?.includes(category.id);
                    return (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={() => {
                          handleCategoryToggle(category.id);
                        }}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {fields.map((field, index) => {
        return (
          <ReferenceRangesForm
            index={index}
            errors={errors}
            register={register}
            onRemove={remove}
          />
        );
      })}
      <Button
        variant={"outline"}
        className="w-min p-2"
        type="button"
        onClick={() =>
          append({
            age_min_years: "",
            age_max_years: "",
            gender: "male",
            normal_min: "",
            normal_max: "",
            critical_min: "",
            critical_max: "",
            notes: "",
          })
        }
      >
        Add Range
      </Button>
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
