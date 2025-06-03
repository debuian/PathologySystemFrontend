import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  layout("layout/AdminLayout.tsx", [
    route("admin", "routes/Dashboard.tsx"),
    route("medical_department", "routes/MedicalDepartmentPage.tsx"),
    route(
      "medical_department/create",
      "routes/MedicalDepartmentCreatePage.tsx"
    ),
    route("tests", "routes/TestsPage.tsx"),
    route("tests/create", "routes/TestCreatePage.tsx"),
    route("tests/units", "routes/TestUnitsPage.tsx"),
    route("tests/units/create", "routes/TestUnitCreatePage.tsx"),
    route("tests/categories", "routes/TestCategoryPage.tsx"),
    route("tests/categories/create", "routes/TestCategoryCreatePage.tsx"),
  ]),
] satisfies RouteConfig;
