
"use client";

import { Download } from "lucide-react";
import { useAuthStore } from "@/zustand/authStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function DownloadButton({
  image,
  videoId,
}: {
  image: string;
  videoId: string;
}) {
  const { user } = useAuthStore();
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const purchased = localStorage.getItem(`course_${videoId}`);
    if (purchased) {
      setIsPurchased(true);
    }
  }, [videoId]);

  const handleDownload = () => {
    if (!user) {
      toast.error("Login first to download the certificate");
      return;
    }

    if (!isPurchased) {
      toast.error("Complete payment to download the certificate");
      return;
    }

    const link = document.createElement("a");
    link.href = image;
    link.download = "certificate";
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition
      ${
        isPurchased
          ? "bg-violet-600 text-white hover:bg-violet-700"
          : "bg-slate-400 text-white cursor-not-allowed"
      }`}
    >
      <Download className="w-5 h-5" />

      {!user
        ? "Download Certificate"
        : !isPurchased
        ? "Purchase to unlock certificate"
        : "Download Certificate"}
    </button>
  );
}

