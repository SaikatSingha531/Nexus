
"use client";

import Script from "next/script";
import { PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/authStore";

export default function EnrollButton({ video }: { video: any }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const purchased = localStorage.getItem(`course_${video.id}`);
    if (purchased) {
      setIsPurchased(true);
    }
  }, [video.id]);

  const handlePayment = async () => {
    if (!user) {
      toast.error("Login first to purchase this course");
      return;
    }

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        body: JSON.stringify({
          amount: video.price,
          videoId: video.id,
        }),
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Creator Studio",
        description: `Enrolling in ${video.title}`,
        order_id: order.id,

        handler: function () {
          toast.success("Payment Successful!");

          localStorage.setItem(`course_${video.id}`, "purchased");
          setIsPurchased(true);

          window.location.reload();
        },

        theme: { color: "#7C3AED" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed.");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <button
        onClick={!isPurchased ? handlePayment : undefined}
        className={`w-full py-6 rounded-[1.5rem] font-bold text-xl transition-all flex items-center justify-center gap-3
        ${
          isPurchased
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-slate-900 hover:bg-violet-600 text-white"
        }`}
      >
        {isPurchased
          ? "Course Unlocked 🎉"
          : !user
          ? "Enroll Now"
          : "Enroll Now"}

        <PlayCircle className="w-6 h-6" />
      </button>
    </>
  );
}

