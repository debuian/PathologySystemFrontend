import {
  ChevronLeft,
  ChevronRight,
  ClipboardMinus,
  House,
  TestTubeDiagonal,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utlis";
import UserAvatar from "./ui/UserAvatar";
import { useState } from "react";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: <House size={16} strokeWidth={1.5} />,
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
    path: "/department",
    label: "Department",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
  {
    path: "/tests/categories",
    label: "Test Categories",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
  {
    path: "/specimens",
    label: "specimens",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
  {
    path: "/containers",
    label: "containers",
    icon: <TestTubeDiagonal size={16} strokeWidth={1.5} />,
  },
];
export default function AppSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  return (
    <aside
      className={cn(
        "min-h-lvh  w-64 flex-shrink-0 flex flex-col h-full transition-all duration-600 ease-in-out z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        {!isCollapsed && (
          <div className="w-full flex items-center justify-center">
            <p className="text-lg font-semibold text-primary-700">
              Pathology Report
            </p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-black/5 transition-colors mx-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
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
                  ? "text-primary-700 bg-primary border-r-4 border-secondary"
                  : "text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
      {!isCollapsed ? (
        <div className="w-full p-4">
          <UserAvatar />
        </div>
      ) : null}
    </aside>
  );
}
