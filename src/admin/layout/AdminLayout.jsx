import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-72">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-[#090909] via-[#101010] to-[#141414]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}