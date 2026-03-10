"use client";

import { Video, Bell, BarChart3, LayoutDashboard, Layers, Settings, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Add Videos",
      icon: Video,
      path: "/admin/addvideos",
    },
    {
      label: "All Videos",
      icon: Layers,
      path: "/admin/allvideos",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/admin/addnotification",
    },
    // {
    //   label: "User Progress",
    //   icon: BarChart3,
    //   path: "/admin/progress",
    // },
  ];

  return (
    <div className="h-screen w-72 bg-white border-r border-slate-100 flex flex-col transition-all duration-300">
      {/* Brand Logo Section */}
      <div className="px-8 py-10 flex items-center gap-3">
        <div className="h-9 w-9 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
          <Layers className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-800 italic">
          ADMIN<span className="text-purple-600">.</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
          Main Menu
        </p>
        
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <div
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`
                group relative flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                ${isActive 
                  ? "bg-purple-50 text-purple-700 shadow-sm shadow-purple-100/50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-purple-600 rounded-r-full" />
              )}
              
              <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-purple-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              
              <span className={`text-sm font-semibold tracking-tight`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Bottom Profile/Action Section */}
      <div className="p-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group">
          <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" alt="avatar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate leading-none">Admin Studio</p>
            <p className="text-[11px] text-slate-400 truncate mt-1">Manage Workspace</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </div>
  );
}