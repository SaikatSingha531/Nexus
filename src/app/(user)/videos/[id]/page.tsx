import { getVideoById } from "@/zustand/addvideostore";
import { notFound } from "next/navigation";
import Link from "next/link";

import EnrollButton from "@/components/EnrollButton";

import VideoPlayer from "@/components/VideoPlayer";

import {
  PlayCircle,
  CheckCircle2,
  Clock,
  Globe,
  Users,
  Award,
  ShieldCheck,
  ArrowLeft,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Videowithid = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const video = await getVideoById(resolvedParams.id);

  if (!video) notFound();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full bg-[#0B0F1A] pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[140px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* BACK BUTTON */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to Courses</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-400 text-xs font-bold uppercase tracking-widest">
                <PlayCircle className="w-4 h-4" /> {video.category}
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                {video.title}
              </h1>

              <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                Master the art of{" "}
                <span className="text-white capitalize">
                  {video.category.toLowerCase()}
                </span>{" "}
                with professional-grade curriculum designed by{" "}
                <span className="text-white">{video.instructor}</span>. Gain the
                skills needed to excel in today's competitive market.
              </p>

              <div className="flex flex-wrap gap-8 text-slate-300 text-sm font-semibold pt-4">
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-violet-500" /> 1,240 Students
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-violet-500" /> Professional
                  Certificate
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-violet-500" /> English / Hindi
                </div>
              </div>
            </div>

            {/* Right Side: THE INTRO VIDEO (Hero Card) */}
            <div className="relative group">
              {/* Glow Effect behind the video */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                <video
                  src={video.intro_video}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT SIDE: Course Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Key Outcomes */}
            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                What you'll learn in this masterclass
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Industry-standard workflows and techniques",
                  "Advanced concepts explained simply",
                  "Hands-on projects with real-world application",
                  "Direct mentorship and community access",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-6 px-4">
              <h2 className="text-3xl font-bold text-slate-900">
                About this course
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed">
                <p>
                  {video.description ||
                    "Detailed curriculum content is being prepared for this session."}
                </p>
                <p className="mt-4">
                  This comprehensive program is designed to take you from a
                  foundational understanding to an expert level. We focus on
                  practical execution rather than just theory, ensuring you have
                  a portfolio-ready project by the end of the masterclass.
                </p>
              </div>
            </div>

            {/* MAIN FULL MODULE VIDEO */}
            <div className="space-y-6 pb-20">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-3xl font-bold text-slate-900">
                  Masterclass Module
                </h2>
                <span className="flex items-center gap-2 text-sm font-bold text-violet-600 bg-violet-50 px-4 py-2 rounded-full border border-violet-100">
                  <Clock className="w-4 h-4" /> Full Access Enabled
                </span>
              </div>

              <div className="aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-200">
                <VideoPlayer videoUrl={video.main_video} videoId={video.id} />
              </div>

              <div className="flex justify-end px-4 mt-4">
                <a
                  href={video.image}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Pricing & Action */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-6 pb-10">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/60">
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-black text-slate-900">
                    ₹{video.price}
                  </span>
                  <span className="text-slate-400 line-through text-xl">
                    ₹{(parseInt(video.price) * 1.5).toFixed(0)}
                  </span>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-violet-600" />
                    </div>
                    30-Day Guarantee
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-violet-600" />
                    </div>
                    Full Lifetime Access
                  </div>
                </div>

                <EnrollButton video={video} />

                <p className="text-center text-[11px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
                  Secure checkout powered by Creator Studio
                </p>
              </div>

              {/* Community Card */}
              <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-10 rounded-[3rem] text-white shadow-xl">
                <h4 className="font-bold text-xl mb-3">Join the Community</h4>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Get access to our private Discord with over 5,000+ creators
                  and weekly live Q&A sessions.
                </p>
                <button className="w-full py-4 bg-white text-violet-600 rounded-2xl text-sm font-bold hover:bg-violet-50 transition-all shadow-lg">
                  Learn More about Discord
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videowithid;
