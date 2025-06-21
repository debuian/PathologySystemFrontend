export interface TestFormValues {
  name: string;
  price: string;
  testUnitId: number;
  medicalDepartmentId: number;
  categoryIds: number[];
  specimenRequirements: specimenRequirementFormValues[];
  referenceRanges: ReferenceRangesFormValues[];
  resultValueTypeId: number;
}

export interface ReferenceRangesFormValues {
  age_min_years: string;
  age_max_years: string;
  gender: string;
  normal_min: string;
  normal_max: string;
  critical_min: string;
  critical_max: string;
  notes: string;
}

export interface specimenRequirementFormValues {
  specimenId: number;
  containerId: number;
}
