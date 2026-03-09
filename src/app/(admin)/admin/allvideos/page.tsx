"use client";

import { useState } from "react";
import Image from "next/image"; // Re-enabled for better performance
import { 
  Edit3, 
  Trash2, 
  ExternalLink, 
  User, 
  BarChart,
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* 1. Correct Hook Imports */
import { useVideos, useDeleteVideo } from "@/hooks/useVideos"; 

const Allvideos = () => {
  /* 2. Initialize both hooks separately */
  const { data: videos, isLoading } = useVideos();
  const { mutateAsync: deleteVideoMutation } = useDeleteVideo();
  
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const handleDelete = async (id: string | number, title: string) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${title}"? This will permanently remove the video files from storage.`
    );
    
    if (confirmDelete) {
      setDeletingId(id);
      try {
        /* 3. Call the mutation function from your hook */
        await deleteVideoMutation(id);
      } catch (error) {
        // Error is handled by the onError in useDeleteVideo hook, 
        // but we catch it here to stop the loading state.
        console.error("Delete operation failed", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="font-medium text-slate-500">Loading your library...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight italic text-slate-900">Video Library</h1>
          <p className="text-slate-500 mt-2">Manage and monitor your published course content.</p>
        </div>

        {/* Video List/Grid */}
        <div className="grid gap-6">
          {videos?.map((video: any) => (
            <Card key={video.id} className="group border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center">
                  
                  {/* Thumbnail Section */}
                  <div className="relative w-full md:w-64 h-44 bg-slate-100 shrink-0">
                    {video.image ? (
                      /* 4. Changed <image> to standard <img> or Next.js <Image /> */
                      <img 
                        src={video.image} 
                        alt={video.title} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase">
                            {video.category || "General"}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400 text-xs">
                            <BarChart className="w-3 h-3" /> {video.level || "All Levels"}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{video.title}</h3>
                        
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" /> {video.instructor || "Unknown"}
                          </div>
                          <div className="font-semibold text-slate-900">
                            ${video.price}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-primary gap-2"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </Button>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={deletingId === video.id}
                          onClick={() => handleDelete(video.id, video.title)}
                          className="rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 gap-2 min-w-[100px]"
                        >
                          {deletingId === video.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          {deletingId === video.id ? "Deleting..." : "Delete"}
                        </Button>

                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="rounded-xl text-slate-400 hover:text-slate-900"
                        >
                          <a href={video.main_video} target="_blank" rel="noreferrer">
                             <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>

                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {(!videos || videos.length === 0) && (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
              <p className="text-slate-400">No videos found in your library.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Allvideos;