"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";
import { LogOut, LayoutDashboard } from "lucide-react"; 

const AdminNav = () => {
  const router = useRouter();
  const { logoutUser, loading } = useAuthStore();

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res?.success ) {
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-violet-600 p-2 rounded-xl group-hover:rotate-6 transition-transform duration-300">
             <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-800 italic">
            NEXUS<span className="text-violet-600">.</span>
          </span>
        </div>

        {/* Center: System Status or Breadcrumbs (Optional) */}
        <div className="hidden md:block">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Admin Console
            </span>
        </div>

        {/* Right Side: Logout Button */}
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="group relative flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-200 active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <span>Logout</span>
                <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default AdminNav;