import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { answers, typeId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STRIPE_SHINDAN_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shindan/result?a=${answers}&paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shindan/result?a=${answers}`,
    metadata: {
      answers,
      typeId: String(typeId),
    },
  });

  return NextResponse.json({ url: session.url });
}