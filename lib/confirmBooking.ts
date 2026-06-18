import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendBookingConfirmation, type BookingRow } from "@/lib/emails";

// Idempotently confirm a paid Stripe checkout session and send the confirmation
// emails exactly once. Both the Stripe webhook and the success-page fallback call
// this; `confirm_booking` only flips hold -> confirmed on the FIRST call, so
// whichever runs first sends the emails and the other is a no-op.
export async function confirmAndNotify(
  sessionId: string
): Promise<{ status: "confirmed" | "already" | "unpaid" }> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" });
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") return { status: "unpaid" };

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("confirm_booking", { p_session_id: sessionId });
  if (error) throw error;

  const row = data as BookingRow | null;
  if (!row) return { status: "already" };

  await sendBookingConfirmation(row);
  return { status: "confirmed" };
}
