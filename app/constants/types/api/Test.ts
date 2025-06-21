import type { Department } from "./Department";
import type { Specimen } from "./Specimen";
import type { TestCategory } from "./TestCategory";
import type { TestUnit } from "./TestUnit";

interface CategoryMapping {
  id: number;
  category: TestCategory;
}

interface specimenRequirement {
  id: number;
  specimen: Specimen;
  container: {
    id: number;
    name: string;
  };
}

export interface Test {
  id: number;
  name: string;
  price: number;
  testUnit: TestUnit | null;
  medicalDepartment: Department | null;
  categoryMappings: CategoryMapping[];
  specimenRequirements: specimenRequirement[];
  referenceRanges: {
    id: number;
    age_min_years: string;
    age_max_years: string;
    gender: string;
    normal_min: string;
    normal_max: string;
    critical_min: string;
    critical_max: string;
    notes: string;
  }[];
}
