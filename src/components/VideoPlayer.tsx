"use client";

import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";

export default function VideoPlayer({
  videoUrl,
  videoId,
}: {
  videoUrl: string;
  videoId: string;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const purchased = localStorage.getItem(`course_${videoId}`);
    if (purchased) setIsUnlocked(true);
  }, [videoId]);

  if (!isUnlocked) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white">
        <PlayCircle className="w-16 h-16 mb-4 opacity-70" />
        <p className="text-xl font-semibold">Course Locked</p>
        <p className="text-gray-400 text-sm">
          Please complete payment to unlock this video
        </p>
      </div>
    );
  }

  return (
    <video src={videoUrl} controls className="w-full h-full" />
  );
}