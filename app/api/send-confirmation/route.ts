import { NextRequest, NextResponse } from "next/server";
import { confirmAndNotify } from "@/lib/confirmBooking";

export const dynamic = "force-dynamic";

// Fallback confirmation trigger called by the success page. The Stripe webhook is
// the authoritative path; this exists so a booking still gets confirmed/emailed
// even if the webhook is delayed. Both go through the idempotent confirmAndNotify.
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const result = await confirmAndNotify(sessionId);
    if (result.status === "unpaid") {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 402 });
    }
    return NextResponse.json({ ok: true, status: result.status });
  } catch (err) {
    console.error("send-confirmation error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
