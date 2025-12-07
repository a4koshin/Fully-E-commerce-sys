import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { navigation } from "../../data/navigation.js";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const location = useLocation();
  const sidebarWidth = collapsed ? "w-20" : "w-72";

  const renderNavItems = () => (
    <nav className="mt-6 space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={[
              "group flex items-center rounded-xl hover:bg-green-50 px-3 py-2.5 text-sm font-semibold hover:scale-105 transition-all duration-200",
              isActive
                ? "bg-primary/10 text-primary shadow-soft"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.label : undefined}
          >
            <Icon className="h-5 w-5" />
            {!collapsed ? <span className="ml-3">{item.label}</span> : null}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      <div
        className={[
          "fixed inset-0 h-full z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex h-screen flex-col overflow-y-auto border-r border-slate-100 bg-white px-4 py-6 transition-all duration-300",
          sidebarWidth,
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0", // Always visible on large screens
        ].join(" ")}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            {!collapsed ? (
              <div>
                <p className="text-sm font-semibold tracking-wide text-slate-500">
                  E-COMMERCE
                </p>
                <p className="text-lg font-bold text-slate-900">Admin Suite</p>
              </div>
            ) : null}
          </div>
          <button
            className="hidden rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-primary hover:text-primary lg:block"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
        {renderNavItems()}
      </aside>
    </>
  );
}
