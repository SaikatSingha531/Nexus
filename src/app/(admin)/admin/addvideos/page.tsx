"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  Video, 
  Image as ImageIcon, 
  ChevronRight, 
  Info, 
  Sparkles,
} from "lucide-react";

import Image from "next/image";
import { useAddVideo } from "@/hooks/useVideos";
import { toast } from "sonner";

/* ---------------- Validation ---------------- */



const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  level: yup.string().required("Level is required"),
  instructor: yup.string().required("Instructor required"),
  price: yup.string().trim().required("Price Is Required")
});


// type FormData = yup.InferType<typeof schema>;

interface FormData {
  title: string;
  description: string;
  category: string;
  level: string;
  instructor: string;
  price: string ;
};

/* ---------- Improved UploadBox ---------- */

type UploadBoxProps = {
  label: string;
  accept: string;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
  height?: string;
  isVideo?: boolean;
  icon?: React.ReactNode;
};

const UploadBox = ({
  label,
  accept,
  preview,
  setPreview,
  setFile,
  height = "h-48",
  isVideo = false,
  icon,
}: UploadBoxProps) => (
  <div className="space-y-3 group">
    <div className="flex items-center justify-between">
      <Label className="text-sm font-semibold text-slate-700">{label}</Label>
      {preview && (
        <button 
          type="button" 
          onClick={() => { setPreview(null); if(setFile) setFile(null); }}
          className="text-[10px] uppercase tracking-wider text-red-500 font-bold hover:underline"
        >
          Replace
        </button>
      )}
    </div>

    <label
      className={`relative w-full ${height} border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center group`}
    >
      {preview ? (
        isVideo ? (
          <video src={preview} controls className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <Image alt="preview" src={preview} fill className="absolute inset-0 object-cover" />
        )
      ) : (
        <div className="flex flex-col items-center text-slate-400 group-hover:text-primary transition-colors">
          <div className="p-4 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
            {icon || <Upload className="w-6 h-6" />}
          </div>
          <span className="text-sm font-medium">Click to upload {label.toLowerCase()}</span>
          <span className="text-[10px] text-slate-400 mt-1">Maximum file size: 500MB</span>
        </div>
      )}

      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setPreview(URL.createObjectURL(file));
            if (setFile) setFile(file);
          }
        }}
      />
    </label>
  </div>
);

/* ---------------- Main Component ---------------- */

const AddVideos = () => {
  const { mutateAsync: AddVideos, isPending } = useAddVideo();

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [introPreview, setIntroPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [introVideoFile, setIntroVideoFile] = useState<File | null>(null);
  const [mainVideoFile, setMainVideoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
    title: "",
    description: "",
    category: "",
    level: "",
    instructor: "",
    price: "" 
  }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await AddVideos({ data, imageFile, introVideoFile, mainVideoFile });
      toast.success("Course Published Successfully");
      setCoverPreview(null);
      setIntroPreview(null);
      setVideoPreview(null);
      setImageFile(null);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish course");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b pb-8 border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              Creator Studio
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight italic">Publish New Course</h1>
            <p className="text-slate-500 mt-2">Fill in the details below to launch your latest curriculum.</p>
          </div>
        </div>

        <form id="course-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Media Assets */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" /> Media Assets
              </h2>
              
              <UploadBox
                label="Course Thumbnail"
                accept="image/*"
                preview={coverPreview}
                setPreview={setCoverPreview}
                setFile={setImageFile}
                height="h-56"
                icon={<ImageIcon className="w-6 h-6" />}
              />

              <UploadBox
                label="Intro Preview (Trailer)"
                accept="video/*"
                preview={introPreview}
                setPreview={setIntroPreview}
                setFile={setIntroVideoFile}
                height="h-40"
                isVideo
              />

              <div className="p-4 bg-blue-50/50 rounded-2xl flex gap-3 items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  High-quality thumbnails and a catchy intro video increase course clicks by up to 40%.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Course Content */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-4 border-slate-50">
                   General Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Course Title</Label>
                    <Input 
                      {...register("title")} 
                      placeholder="e.g. Advanced UI/UX Principles 2024"
                      className="h-14 rounded-xl border-slate-200 focus:ring-primary text-lg font-medium" 
                    />
                    {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Instructor Name</Label>
                    <Input {...register("instructor")} className="h-12 rounded-xl" placeholder="John Doe" />
                    {errors.instructor && <p className="text-xs text-red-500 font-medium">{errors.instructor.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Pricing (USD)</Label>
                    <Input type="text" {...register("price")} className="h-12 rounded-xl" placeholder="$99.00" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Category</Label>
                    <select
                      {...register("category")}
                      className="w-full h-12 border border-slate-200 rounded-xl px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {["IT", "Design", "Business", "Health", "Music"].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-xs text-red-500 font-medium">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Difficulty Level</Label>
                    <select
                      {...register("level")}
                      className="w-full h-12 border border-slate-200 rounded-xl px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                    >
                      <option value="">Select Level</option>
                      {["Beginner", "Intermediate", "Expert"].map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                    {errors.level && <p className="text-xs text-red-500 font-medium">{errors.level.message}</p>}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-slate-400">Description</Label>
                    <Textarea
                      {...register("description")}
                      placeholder="Describe what students will learn..."
                      className="min-h-[150px] rounded-xl border-slate-200 resize-none"
                    />
                    {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <UploadBox
                  label="Full Course Content (Master Video)"
                  accept="video/*"
                  preview={videoPreview}
                  setPreview={setVideoPreview}
                  setFile={setMainVideoFile}
                  height="h-64"
                  isVideo
                  icon={<Video className="w-8 h-8" />}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4 pb-12">
               <Button 
                type="submit" 
                disabled={isPending}
                className="w-full md:w-auto h-14 px-12 text-lg font-bold rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-3"
              >
                {isPending ? "Uploading Course Data..." : "Publish & Sync to Library"}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideos;