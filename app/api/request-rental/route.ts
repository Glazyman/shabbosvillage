import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendGroupRequest, type BookingRow } from "@/lib/emails";
import { nightsBetween, groupSites, HOLD_MINUTES, type BookingKind } from "@/lib/booking";

export const dynamic = "force-dynamic";

// Group rentals (whole / half / camp): no online payment. We place a capacity
// hold (48h) and email the owner to confirm + arrange payment.
export async function POST(req: NextRequest) {
  try {
    const { form } = await req.json();
    const kind = form?.kind as BookingKind;
    if (!["whole", "half", "camp"].includes(kind)) {
      return NextResponse.json({ error: "Invalid rental type." }, { status: 400 });
    }

    const arrival = String(form?.arrivalDate || "");
    const departure = String(form?.departureDate || "");
    if (nightsBetween(arrival, departure) < 1) {
      return NextResponse.json({ error: "Please choose valid arrival and departure dates." }, { status: 400 });
    }
    if (!String(form?.firstName || "").trim() || !String(form?.email || "").trim()) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const campSites = Math.max(1, parseInt(form?.campSites) || 0);
    const sites = groupSites(kind, campSites);
    const guests = Math.max(1, parseInt(form?.guests) || 1);

    const supabase = getSupabaseAdmin();
    const { data: bookingId, error: holdError } = await supabase.rpc("check_and_hold", {
      p_kind: kind,
      p_arrival: arrival,
      p_departure: departure,
      p_sites: sites,
      p_small: 0,
      p_medium: 0,
      p_large: 0,
      p_guests: guests,
      p_cars: 0,
      p_amount_cents: null,
      p_first_name: form.firstName || "",
      p_last_name: form.lastName || "",
      p_email: form.email || "",
      p_phone: form.phone || "",
      p_notes: form.notes || "",
      p_waiver_signed: false,
      p_waiver_signature: "",
      p_hold_minutes: HOLD_MINUTES.group,
    });
    if (holdError) throw holdError;
    if (!bookingId) {
      return NextResponse.json(
        { error: "Sorry — there isn't enough availability on those dates for this rental. Please try different dates." },
        { status: 409 }
      );
    }

    const { data: row, error: getErr } = await supabase.rpc("get_booking", { p_booking_id: bookingId });
    if (getErr) throw getErr;
    await sendGroupRequest(row as BookingRow);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("request-rental error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
