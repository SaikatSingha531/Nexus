"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Heart,
  User,
  LogOut,
  Loader2,
  Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";
import { useNotifications } from "@/hooks/useNotifications";
import { getVideos } from "@/zustand/addvideostore";

const Navbar = () => {
  const router = useRouter();
  const { user, logoutUser, loading } = useAuthStore();
  const { data: notifications } = useNotifications();

  const count = notifications?.length || 0;

  /* ---------- SEARCH STATES ---------- */
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);

  /* ---------- FETCH VIDEOS ---------- */
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideos(data || []);
    };
    fetchVideos();
  }, []);

  /* ---------- FILTER SEARCH ---------- */
  useEffect(() => {
    const filtered = videos.filter((v) =>
      `${v.title} ${v.category} ${v.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [search, videos]);

  const handleAuthClick = async () => {
    if (user) {
      const response = await logoutUser();
      if (response.success) router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-2xl border-b border-slate-200/40 px-4 md:px-8 py-3 lg:py-0 lg:h-20 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-4">
      
      {/* 💎 PREMIUM LAYERED LOGO */}
      <div
        onClick={() => router.push("/")}
        className="group relative flex items-center gap-3 md:gap-4 cursor-pointer"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur-md opacity-25 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-pulse"></div>

          <div className="relative h-10 w-10 md:h-12 md:w-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden">
            <Sparkles className="absolute top-1 right-1 w-2 md:w-3 h-2 md:h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter">
              N
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        <div className="flex flex-col leading-none">
          <h1 className="text-xl md:text-2xl font-[900] tracking-tighter text-purple-500 group-hover:text-black transition-colors">
            NEXUS
          </h1>
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-purple-500/80">
            LEARNING
          </span>
        </div>
      </div>

      {/* 🔍 SEARCH BAR - Now visible on all screens */}
      <div className="order-3 lg:order-none w-full lg:flex-1 lg:max-w-xl lg:mx-12 relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-slate-200 via-purple-400/40 to-slate-200 rounded-2xl opacity-100 group-focus-within:from-purple-500 group-focus-within:to-blue-500 transition-all duration-500" />

        <div className="relative w-full flex items-center bg-white/90 rounded-[15px] px-4 py-2.5 shadow-inner">
          <Search
            size={18}
            className="text-slate-400 group-focus-within:text-purple-600 transition-colors"
          />

          <input
            type="text"
            placeholder="Search your future..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full outline-none text-sm ml-3 text-slate-800 placeholder:text-slate-400 font-medium"
          />

          <div className="flex items-center gap-1.5 ml-2">
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* 🔎 SEARCH RESULTS */}
        {search && filteredVideos.length > 0 && (
          <div className="absolute top-14 w-full bg-white rounded-xl shadow-2xl border border-slate-100 p-2 max-h-80 overflow-y-auto z-[110]">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => {
                  router.push(`/videos/${video.id}`);
                  setSearch("");
                  setFilteredVideos([]);
                }}
              >
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-10 h-10 object-cover rounded-md"
                />

                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-800 truncate">{video.title}</p>
                  <p className="text-xs text-slate-500">{video.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-2 md:gap-3">
        {user && (
          <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
            <button
              onClick={() => router.push("/wishlist")}
              className="relative p-2 text-slate-500 hover:text-red-500 hover:bg-white rounded-xl transition-all"
            >
              <Heart size={20} />
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 border-2 border-white"></span>
              </span>
            </button>

            <button
              onClick={() => router.push("/notification")}
              className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all group"
            >
              <Bell size={20} className="group-hover:animate-bounce" />

              {count > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-600 border-2 border-white"></span>
                </span>
              )}
            </button>
          </div>
        )}

        <button
          onClick={handleAuthClick}
          disabled={loading}
          className={`
            h-10 md:h-11 px-4 md:px-7 rounded-xl font-bold text-xs md:text-sm transition-all duration-300
            ${
              user
                ? "bg-white text-slate-700 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                : "bg-gradient-to-br from-slate-800 to-black text-white hover:shadow-lg hover:-translate-y-0.5 shadow-md flex items-center gap-2"
            }
          `}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
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