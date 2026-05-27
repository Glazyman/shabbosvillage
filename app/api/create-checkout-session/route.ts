import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { form, total, nights } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shabbos Village — Camping Reservation",
              description: `${form.firstName} ${form.lastName} | ${form.arrivalDate} → ${form.departureDate} | ${nights} night${nights > 1 ? "s" : ""} | ${form.guests} guest${form.guests > 1 ? "s" : ""} | ${form.vehicles} vehicle${form.vehicles > 1 ? "s" : ""}`,
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: form.email,
      metadata: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        arrivalDate: form.arrivalDate,
        departureDate: form.departureDate,
        guests: form.guests,
        vehicles: form.vehicles,
        tentType: form.tentType,
        hookup: form.hookup,
        groupType: form.groupType,
        notes: form.notes || "",
        waiverSigned: "true",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
