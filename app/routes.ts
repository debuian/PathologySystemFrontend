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
    route("department", "routes/DepartmentPage.tsx"),
    route("department/create", "routes/DepartmentCreatePage.tsx"),
    route("tests", "routes/TestsPage.tsx"),
    route("tests/create", "routes/TestCreatePage.tsx"),
    route("tests/units", "routes/TestUnitsPage.tsx"),
    route("tests/units/create", "routes/TestUnitCreatePage.tsx"),
    route("tests/categories", "routes/TestCategoryPage.tsx"),
    route("tests/categories/create", "routes/TestCategoryCreatePage.tsx"),
    route("/specimens", "routes/SpecimenPage.tsx"),
    route("/specimens/create", "routes/CreateSpecimenPage.tsx"),
    route("containers", "routes/ContainersPage.tsx"),
    route("containers/create", "routes/ContainerCreatePage.tsx"),
  ]),
] satisfies RouteConfig;
