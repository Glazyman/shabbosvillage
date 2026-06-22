import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import {
  calcRegularTotalCents,
  nightsBetween,
  totalPlots,
  plotSummary,
  validateRegular,
  HOLD_MINUTES,
  type PlotCounts,
} from "@/lib/booking";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { form } = await req.json();

    // --- Server-authoritative validation (never trust the client) ---
    const plots: PlotCounts = {
      small: Math.max(0, parseInt(form?.small) || 0),
      medium: Math.max(0, parseInt(form?.medium) || 0),
      large: Math.max(0, parseInt(form?.large) || 0),
      rv: Math.max(0, parseInt(form?.rv) || 0),
    };
    const cars = Math.max(0, parseInt(form?.cars) || 0);
    const guests = Math.max(1, parseInt(form?.guests) || 1);
    const arrival = String(form?.arrivalDate || "");
    const departure = String(form?.departureDate || "");

    const validationError = validateRegular(plots, cars, arrival, departure);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    if (!form?.waiverSigned || !String(form?.waiverSignature || "").trim()) {
      return NextResponse.json({ error: "The waiver must be signed before booking." }, { status: 400 });
    }

    const nights = nightsBetween(arrival, departure);
    const sites = totalPlots(plots);
    const amountCents = calcRegularTotalCents(plots, nights); // server-computed total

    // --- Atomically reserve capacity (creates a short-lived hold) ---
    const supabase = getSupabaseAdmin();
    const { data: bookingId, error: holdError } = await supabase.rpc("check_and_hold", {
      p_kind: "regular",
      p_arrival: arrival,
      p_departure: departure,
      p_sites: sites,
      p_small: plots.small,
      p_medium: plots.medium,
      p_large: plots.large,
      p_rv: plots.rv,
      p_guests: guests,
      p_cars: cars,
      p_amount_cents: amountCents,
      p_first_name: form.firstName || "",
      p_last_name: form.lastName || "",
      p_email: form.email || "",
      p_phone: form.phone || "",
      p_notes: form.notes || "",
      p_waiver_signed: true,
      p_waiver_signature: form.waiverSignature || "",
      p_hold_minutes: HOLD_MINUTES.regular,
    });
    if (holdError) throw holdError;
    if (!bookingId) {
      return NextResponse.json(
        { error: "Sorry — those dates are full for the number of plots requested. Please try fewer plots or different dates." },
        { status: 409 }
      );
    }

    // --- Create the Stripe Checkout session ---
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
    });

    const summary = plotSummary(plots);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shabbos Village — Plot Reservation",
              description: `${form.firstName} ${form.lastName} | ${arrival} → ${departure} | ${nights} night${nights > 1 ? "s" : ""} | ${summary} | ${guests} guest${guests > 1 ? "s" : ""}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: form.email,
      metadata: {
        bookingId,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        arrivalDate: arrival,
        departureDate: departure,
        nights: String(nights),
        guests: String(guests),
        cars: String(cars),
        small: String(plots.small),
        medium: String(plots.medium),
        large: String(plots.large),
        rv: String(plots.rv),
        plots: String(sites),
        notes: String(form.notes || "").slice(0, 480),
        waiverSigned: "true",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
    });

    // Link the Stripe session to the held booking so the webhook can confirm it.
    await supabase.rpc("attach_session", { p_booking_id: bookingId, p_session_id: session.id });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe/checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
