"use client";

import React, { useState, useMemo } from "react";
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Layers, 
  UserCircle2 
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useVideos } from "@/hooks/useVideos";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuthStore } from "@/zustand/authStore";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;
const categories = ["All", "IT", "Design", "Business", "Health", "Music"];

/* ---------- CourseCard Component ---------- */
const CourseCard = ({ video, handleWishlist, isInWishlist }: any) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-3 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem]">
        <img
          src={video.image}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleWishlist(video);
          }}
          className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 z-10 ${
            isInWishlist(video.id)
              ? "bg-rose-500 text-white shadow-lg"
              : "bg-white/70 text-slate-900 hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(video.id) ? "fill-current" : ""}`} />
        </button>

        {/* Floating Category */}
        <div className="absolute bottom-4 left-4">
          <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">
              {video.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6 space-y-5">
        <div className="space-y-3">
          <h2 className="font-extrabold text-xl text-slate-900 line-clamp-2 leading-[1.2] group-hover:text-violet-600 transition-colors">
            {video.title}
          </h2>

          {/* Redesigned Metadata Layout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg">
              <UserCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-600">{video.instructor}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-600">{video.level}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Enrollment Fee</span>
            <p className="text-2xl font-black text-slate-900">₹{video.price}</p>
          </div>

          <Link href={`/videos/${video.id}`}>
            <button className="h-14 px-6 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center gap-2 transition-all duration-300 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-200">
              Start
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ---------- Main Page Component ---------- */
const CourseVideos = () => {
  const { data: videos, isLoading, error } = useVideos();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");

  const handleWishlist = (video: any) => {
    if (!user) {
      toast.error("Please login to save courses");
      return;
    }
    toggleWishlist(video);
  };

  const filteredVideos = useMemo(() => {
    let filtered = videos || [];
    if (category !== "All") {
      filtered = filtered.filter((v: any) => v.category === category);
    }
    return filtered;
  }, [videos, category]);

  const totalPages = Math.ceil((filteredVideos?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVideos = filteredVideos?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading Studio...</div>;
  if (error) return <div className="p-20 text-center text-rose-500">Error loading library.</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32">
      {/* NAVIGATION / FILTER */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="hidden lg:block">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Curriculum</h3>
              <p className="text-sm font-bold text-slate-900">Browse Hub</p>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setCurrentPage(1); }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    category === cat ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-xl text-violet-600">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold">Sort</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <Badge variant="outline" className="border-slate-200 text-slate-500 px-4 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3 h-3 mr-2 text-violet-500" /> Professional Library
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight italic">
            Expand Your <span className="text-violet-600">Horizon.</span>
          </h1>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {paginatedVideos.map((video: any) => (
            <CourseCard
              key={video.id}
              video={video}
              handleWishlist={handleWishlist}
              isInWishlist={isInWishlist}
            />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center">
            <Pagination>
              <PaginationContent className="gap-2 bg-slate-900 p-2 rounded-[2rem] text-white">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    className="hover:bg-white/10 border-none"
                  />
                </PaginationItem>
                <PaginationItem>
                  <div className="px-4 text-xs font-black uppercase tracking-widest">
                    Page {currentPage} of {totalPages}
                  </div>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    className="hover:bg-white/10 border-none"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseVideos;