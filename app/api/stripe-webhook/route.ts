import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { confirmAndNotify } from "@/lib/confirmBooking";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Stripe webhook — the authoritative source of booking confirmation.
// Configure in Stripe Dashboard → Webhooks: endpoint /api/stripe-webhook,
// events checkout.session.completed + checkout.session.expired, and set
// STRIPE_WEBHOOK_SECRET.
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) {
    return NextResponse.json({ error: "Missing webhook secret or signature." }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" });
  const body = await req.text(); // raw body required for signature verification

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await confirmAndNotify(session.id);
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      const supabase = getSupabaseAdmin();
      await supabase.rpc("expire_booking", { p_session_id: session.id });
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }
}
