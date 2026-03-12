"use client";

import { useState, useMemo } from "react";
import {
  Heart,
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
import { useAuthStore } from "@/zustand/authStore";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { toast } from "sonner";

const ITEMS_PER_PAGE = 12;

const categories = ["All", "IT", "Design", "Business", "Health", "Music"];

const priceFilters = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹500", value: "under500" },
  { label: "₹500 - ₹1000", value: "500to1000" },
  { label: "Above ₹1000", value: "above1000" },
];

const CourseVideos = () => {
  const { data: videos, isLoading, error } = useVideos();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuthStore();

  const handleWishlist = (video: any) => {
    if (!user) {
      toast.error("Login To Get More Features");
      return;
    }
    toggleWishlist(video);
  };

  // FILTER USING useMemo
  const filteredVideos = useMemo(() => {
    let filtered = videos || [];

    if (category !== "All") {
      filtered = filtered.filter((v: any) => v.category === category);
    }

    if (priceFilter === "under500") {
      filtered = filtered.filter((v: any) => v.price < 500);
    }

    if (priceFilter === "500to1000") {
      filtered = filtered.filter(
        (v: any) => v.price >= 500 && v.price <= 1000
      );
    }

    if (priceFilter === "above1000") {
      filtered = filtered.filter((v: any) => v.price > 1000);
    }

    return filtered;
  }, [videos, category, priceFilter]);

  const totalPages = Math.ceil((filteredVideos?.length || 0) / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedVideos = filteredVideos?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 selection:bg-violet-100 selection:text-violet-900">
      {/* FILTER NAVBAR */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter size={16} className="text-violet-600" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Filter By:
            </span>
          </div>

          <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
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

            {/* PRICE FILTER */}
            <select
              value={priceFilter}
              onChange={(e) => {
                setPriceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="ml-3 px-3 py-1.5 text-sm font-semibold rounded-full border border-slate-200 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {priceFilters.map((price) => (
                <option key={price.value} value={price.value}>
                  {price.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden pt-16 pb-12 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto space-y-5">
          <Badge className="bg-violet-100 text-violet-700 border-none px-4 py-1">
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

      {/* COURSE GRID */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedVideos?.map((video: any) => (
            <div
              key={video.id}
              className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />

                <button
                  onClick={() => handleWishlist(video)}
                  className={`absolute top-3 right-3 p-2 rounded-lg ${
                    isInWishlist(video.id)
                      ? "bg-rose-500 text-white"
                      : "bg-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(video.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <span className="text-xs font-bold text-violet-600">
                  {video.category}
                </span>

                <h2 className="font-bold text-slate-900 line-clamp-2">
                  {video.title}
                </h2>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    4.8
                  </div>

                  <div className="flex items-center gap-1 text-slate-400">
                    <Users className="w-4 h-4" />
                    2.4k
                  </div>
                </div>

                <p className="text-xl font-black text-slate-900">
                  ₹{video.price}
                </p>

                <Link href={`/videos/${video.id}`}>
                  <button className="w-full bg-slate-900 hover:bg-violet-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                    View Course
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-16 flex justify-center">
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default CourseVideos;