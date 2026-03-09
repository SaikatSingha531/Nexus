"use client";

import { ShoppingCart, Bell, Search, Heart, User, LogOut, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";
import { useNotifications } from "@/hooks/useNotifications";

const Navbar = () => {
  const router = useRouter();
  const { user, logoutUser, loading } = useAuthStore();
  const { data: notifications } = useNotifications();

  const count = notifications?.length || 0;

  const handleAuthClick = async () => {
    if (user) {
      const response = await logoutUser();
      if (response.success) router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-2xl border-b border-slate-200/40 px-6 h-20 flex items-center justify-between">
      
      {/* 💎 PREMIUM LAYERED LOGO */}
      <div 
        onClick={() => router.push("/")}
        className="group relative flex items-center gap-4 cursor-pointer"
      >
        <div className="relative">
          {/* Animated Glow Backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur-md opacity-25 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-pulse"></div>
          
          {/* The Glass Icon */}
          <div className="relative h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden">
            <Sparkles className="absolute top-1 right-1 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-white font-black text-2xl tracking-tighter">N</span>
            {/* Shimmer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        <div className="flex flex-col leading-none">
          <h1 className="text-2xl font-[900] tracking-tighter text-purple-500 group-hover:text-black transition-colors">
            NEXUS
          </h1>
          <span className="text-[10px] font-bold tracking-[0.3em] text-purple-500/80">LEARNING</span>
        </div>
      </div>

      {/* 🔍 THE "FLOATING ISLAND" SEARCH BAR */}
      <div className="hidden lg:flex flex-1 max-w-xl mx-12 relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-slate-200 via-purple-400/40 to-slate-200 rounded-2xl opacity-100 group-focus-within:from-purple-500 group-focus-within:to-blue-500 transition-all duration-500" />
        <div className="relative w-full flex items-center bg-white/90 rounded-[15px] px-5 py-2.5 shadow-inner">
          <Search size={18} className="text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          <input
            type="text"
            placeholder="Search your future..."
            className="bg-transparent w-full outline-none text-sm ml-4 text-slate-800 placeholder:text-slate-400 font-medium"
          />
          <div className="flex items-center gap-1.5 ml-2">
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* ⚡ ACTION HUB */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
            {/* WISHLIST */}
            <button 
              onClick={() => router.push("/wishlist")}
              className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"
            >
              <Heart size={20} />
            </button>

            {/* CART */}
            <button 
              onClick={() => router.push("/cart")}
              className="relative p-2.5 text-slate-500 hover:text-purple-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 h-4 w-4 bg-slate-900 text-[9px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white">0</span>
            </button>

            {/* NOTIFICATIONS */}
            <button 
              onClick={() => router.push("/notification")}
              className="relative p-2.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm group"
            >
              <Bell size={20} className="group-hover:animate-bounce" />
              {count > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-600 border-2 border-white"></span>
                </span>
              )}
            </button>
          </div>
        )}

        {/* AUTH BUTTON - THE "CTA" */}
        <button
          onClick={handleAuthClick}
          disabled={loading}
          className={`
            ml-2 h-11 px-7 rounded-xl font-bold text-sm transition-all duration-300
            ${user 
              ? "bg-white text-slate-700 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200" 
              : "bg-gradient-to-br from-slate-800 to-black text-white hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 shadow-md flex items-center gap-2"}
          `}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <LogOut size={16} />
              <span>Sign Out</span>
            </div>
          ) : (
            <>
              <User size={16} />
              <span>Get Started</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;