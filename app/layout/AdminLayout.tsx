import { Outlet } from "react-router";
import AppSideBar from "~/components/AppSideBar";
import Header from "~/components/Header";

export default function AdminLayout() {
  return (
    <div className="admin-layout w-full min-h-screen flex">
      <AppSideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
