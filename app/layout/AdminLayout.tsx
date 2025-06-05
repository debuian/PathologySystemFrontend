import { Outlet } from "react-router";
import AppSideBar from "~/components/AppSideBar";
import Header from "~/components/Header";
import { Card } from "~/components/ui/card";

export default function AdminLayout() {
  return (
    <div className="admin-layout w-full min-h-screen flex">
      <AppSideBar />
      <Card className="flex-1 flex flex-col rounded-s-3xl">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </Card>
    </div>
  );
}
