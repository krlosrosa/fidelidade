"use client";
import { Button } from "@/components/ui/button";
import { stripePromise } from "@/lib/stripe";

type Props = {
  priceId: string;
  enable?: boolean
};

export default function ButtonPay({ priceId, enable = false }: Props) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: priceId }), // Plano Intermediário
    });

    const { id } = await res.json();
    stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <Button
      onClick={handleCheckout}
      className={` ${enable? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg":"border-purple-300 hover:bg-purple-50"} w-full`}
    >
      Assinar agora
    </Button>
  );
}
