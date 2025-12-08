import { useState } from "react";
import { Bell, Menu, UserRound, Settings, LogOut } from "lucide-react";
import Button from "../ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Topbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);

  // get logout function from context
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-100 bg-white px-4 py-4 backdrop-blur w-full">
      <button
        className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-primary hover:text-primary lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex justify-end w-full">
        <div className="flex items-center gap-3">
          <button className="relative rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-primary hover:text-primary">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="relative">
            <button
              className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 text-left"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/60 text-primary flex items-center justify-center font-semibold">
                EC
              </div>

              <div className="hidden text-sm lg:block">
                <p className="font-semibold text-slate-900">Elena Cruz</p>
                <p className="text-xs text-slate-500">Operations Lead</p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white p-2 text-sm shadow-2xl">
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  leadingIcon={UserRound}
                >
                  Profile
                </Button>

                <Button
                  variant="outline"
                  className="mt-2 w-full justify-center"
                  leadingIcon={Settings}
                >
                  Workspace settings
                </Button>

                <Button
                  variant="outline"
                  className="mt-2 w-full justify-center text-rose-500 hover:border-rose-300 hover:text-rose-600"
                  leadingIcon={LogOut}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
