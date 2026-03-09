"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Filter,
} from "lucide-react";
import { useVideos } from "@/hooks/useVideos";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";

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

const CourseVideos = () => {
  const { data: videos, isLoading, error } = useVideos();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");

  const { toggleWishlist, isInWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-violet-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-violet-600 animate-spin"></div>
        </div>
        <p className="text-violet-600 font-bold animate-pulse text-sm uppercase tracking-widest">
          Initializing Nexus Hub...
        </p>
      </div>
    );
  }

  if (error)
    return (
      <p className="p-10 text-red-500 text-center font-semibold">
        Error connecting to Nexus. Please refresh.
      </p>
    );

  const filteredVideos =
    category === "All"
      ? videos
      : videos?.filter((v: any) => v.category === category);
  const totalPages = Math.ceil((filteredVideos?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVideos = filteredVideos?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 selection:bg-violet-100 selection:text-violet-900">
      {/* 1. TOP FILTER BAR */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter size={16} className="text-violet-600" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Filter By:
            </span>
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  category === cat
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="relative overflow-hidden pt-16 pb-12 px-6 lg:px-10 bg-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-violet-50 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto space-y-5">
          <Badge className="bg-violet-100 text-violet-700 border-none px-4 py-1 hover:bg-violet-100">
            <Sparkles size={14} className="mr-2" /> 2026 Curriculum Updated
          </Badge>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              {category === "All" ? (
                <>
                  Unlock Your <span className="text-violet-600">Potential</span>
                </>
              ) : (
                <>
                  Master <span className="text-violet-600">{category}</span>
                </>
              )}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Join{" "}
              <span className="text-slate-900 font-bold">50,000+ students</span>
              . Expert-led courses designed for your career.
            </p>
          </div>
        </div>
      </div>

      {/* 3. COURSE GRID SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedVideos?.map((video: any) => (
            <div
              key={video.id}
              className="group relative bg-white rounded-3xl border border-slate-200/70 overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.12)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* IMAGE WRAPPER - Changed to aspect-video to make it shorter/wider */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <button
                  onClick={() => toggleWishlist(video)}
                  className={`absolute top-3 right-3 z-10 p-1.5 rounded-lg shadow-sm backdrop-blur-md transition-all duration-300 ${
                    isInWishlist(video.id)
                      ? "bg-rose-500 text-white"
                      : "bg-white/90 text-slate-600 hover:bg-rose-50"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${isInWishlist(video.id) ? "fill-current" : ""}`}
                  />
                </button>
                {video.isBestseller !== false && (
                  <Badge className="absolute top-3 left-3 bg-white/95 text-slate-900 border-none text-[10px] font-bold shadow-sm px-2 py-0">
                    ✨ Bestseller
                  </Badge>
                )}
              </div>

              {/* CONTENT - Reduced padding for a more compact look */}
              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-600/80">
                    {video.category || "General"}
                  </span>
                  <h2 className="font-bold text-slate-900 text-base leading-tight line-clamp-2 h-10 group-hover:text-violet-600 transition-colors">
                    {video.title}
                  </h2>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-slate-50">
                  <div className="flex items-center gap-1 text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-xs">4.8</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>2.4k</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-black text-slate-900">
                      ₹{video.price}
                    </p>
                  </div>
                  <button className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-violet-600 hover:text-white transition-all duration-300">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                {/* Shortened button height */}
                <Link href={`/videos/${video.id}`} className="block">
                  <button className="w-full bg-slate-900 group-hover:bg-violet-600 text-white py-3 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2">
                    View Course
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-16 flex justify-center">
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/40">
            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    className="rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all border-none cursor-pointer scale-90"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index} className="hidden sm:block">
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      className={
                        currentPage === index + 1
                          ? "bg-violet-600 text-white rounded-lg shadow-md"
                          : "cursor-pointer rounded-lg hover:bg-slate-100 scale-90"
                      }
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className="rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all border-none cursor-pointer scale-90"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseVideos;
