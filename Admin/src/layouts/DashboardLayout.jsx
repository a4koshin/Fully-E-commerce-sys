import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sidebar width values (must match Sidebar)
  const contentPadding = collapsed ? "pl-20" : "pl-72";

  return (
    <div
      className={`flex min-h-screen bg-[#f5f7fb] text-slate-900 ${contentPadding}`}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-1 flex-col lg:ml-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
