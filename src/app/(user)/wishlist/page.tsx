"use client";
import { useWishlist } from "@/hooks/useWishlist";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Heart size={48} className="text-slate-200" />
        <h2 className="text-xl font-bold text-slate-900">Your wishlist is empty</h2>
        <Link href="/" className="text-violet-600 font-semibold hover:underline">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">My Wishlist ({wishlist.length})</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((video) => (
          <div key={video.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="relative aspect-video">
              <img src={video.image} className="w-full h-full object-cover" alt={video.title} />
              <button 
                onClick={() => toggleWishlist(video)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full text-rose-500 shadow-md hover:bg-rose-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <h2 className="font-bold text-slate-900 line-clamp-1">{video.title}</h2>
              <p className="text-lg font-black text-violet-600">₹{video.price}</p>
              <Link href={`/videos/${video.id}`}>
                <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                  View Course <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;