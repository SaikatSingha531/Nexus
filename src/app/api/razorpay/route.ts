import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, 
  key_secret: process.env.RAZORPAY_KEY_SECRET!, 
});

export async function POST(request: Request) {
  try {
    const { amount, videoId } = await request.json();

    const totalAmount = parseInt(amount);

    const options = {
      amount: totalAmount * 100, 
      currency: "INR",
      receipt: `receipt_video_${videoId}`,
      payment_capture: 1, 
    };

    const order = await razorpay.orders.create(options);
    // console.log("this is the order section",order)
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("RAZORPAY ERROR:", error);
    return NextResponse.json({ error: error.message || "Order creation failed" }, { status: 500 });
  }
}