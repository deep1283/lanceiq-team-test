"use client";

import Script from "next/script";
import { createOrder } from "@/app/actions";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const handlePayment = async () => {
    const orderId = await createOrder();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: "10000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: orderId,
      handler: function (response: any) {
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={handlePayment}>pay for team</button>
    </div>
  );
}
