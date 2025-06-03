import { ClipboardMinus, House, TestTubeDiagonal } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utlis";
import UserAvatar from "./ui/UserAvatar";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: <House size={16} strokeWidth={1.5} />,
  },
  {
    path: "/reports",
    label: "Reports",
    icon: <ClipboardMinus size={16} strokeWidth={1.5} />,
  },
  {
    path: "/tests",
    label: "Tests",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
  {
    path: "/tests/units",
    label: "Test Unit",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
  {
    path: "/medical_department",
    label: "Medical Department",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
  {
    path: "/tests/categories",
    label: "Test Categories",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
];
export default function AppSideBar() {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "min-h-lvh bg-white shadow-lg w-64 flex-shrink-0 flex flex-col h-full border-r border-neutral-200 transition-all duration-300 ease-in-out "
      )}
    >
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <div className="w-full flex items-center justify-center">
          <p className="text-lg font-semibold text-primary-700">
            Pathology Report
          </p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 gap-2 rounded-md",
                location.pathname === item.path
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="w-full p-4">
        <UserAvatar />
      </div>
    </aside>
  );
}
