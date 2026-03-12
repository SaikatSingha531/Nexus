"use client";

import Script from "next/script";
import { PlayCircle } from "lucide-react";
import { toast } from "sonner";

export default function EnrollButton({ video }: { video: any }) {
  const handlePayment = async () => {
    try {
      // 1. Create Order on Server
      const response = await fetch("/api/razorpay", {
        method: "POST",
        body: JSON.stringify({ amount: video.price, videoId: video.id }),
      });
      const order = await response.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Creator Studio",
        description: `Enrolling in ${video.title}`,
        order_id: order.id,
        handler: async function (response: any) {
          toast.success("Payment Successful! Welcome to the course.");
          console.log("Payment ID:", response.razorpay_payment_id);
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
        },
        theme: { color: "#7C3AED" }, 
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong with the payment.");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={handlePayment}
        className="w-full bg-slate-900 hover:bg-violet-600 text-white py-6 rounded-[1.5rem] font-bold text-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group"
      >
        Enroll Now
        <PlayCircle className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </>
  );
}