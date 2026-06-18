import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "info@shabbosvillage.com";
const FROM_EMAIL  = process.env.RESEND_FROM_EMAIL ?? "Shabbos Village <bookings@shabbosvillage.com>";

function tentLabel(v: string) {
  if (v === "large") return "Large (up to 8 person)";
  if (v === "xl")    return "XL Tent";
  return "Standard (up to 4 person)";
}

function groupLabel(v: string) {
  if (v === "group") return "Group / Friends";
  if (v === "camp")  return "Camp / Organization";
  if (v === "event") return "Private Event";
  return "Family Stay";
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 402 });
    }

    const m = session.metadata ?? {};
    const guestEmail = session.customer_email ?? m.email ?? "";
    const guestName  = `${m.firstName ?? ""} ${m.lastName ?? ""}`.trim();
    const total      = (session.amount_total ?? 0) / 100;

    const resend = new Resend(process.env.RESEND_API_KEY!);

    // ── Owner notification ──────────────────────────────────────────────────
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family: Georgia, serif; background: #FDFAF5; color: #1a1a12; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 32px;">
    <p style="font-size: 0.75rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8B5E3C; margin-bottom: 8px;">New Booking</p>
    <h1 style="font-size: 2rem; font-weight: 700; color: #2D5016; margin: 0 0 32px;">Shabbos Village Reservation</h1>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070; width: 40%;">Guest Name</td>
        <td style="padding: 12px 0; font-weight: 600;">${guestName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Email</td>
        <td style="padding: 12px 0;"><a href="mailto:${guestEmail}" style="color: #2D5016;">${guestEmail}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Phone</td>
        <td style="padding: 12px 0;">${m.phone ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Arrival</td>
        <td style="padding: 12px 0;">${m.arrivalDate ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Departure</td>
        <td style="padding: 12px 0;">${m.departureDate ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Guests</td>
        <td style="padding: 12px 0;">${m.guests ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Vehicles</td>
        <td style="padding: 12px 0;">${m.vehicles ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Tent Size</td>
        <td style="padding: 12px 0;">${tentLabel(m.tentType ?? "standard")}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Booking Type</td>
        <td style="padding: 12px 0;">${groupLabel(m.groupType ?? "family")}</td>
      </tr>
      ${m.notes ? `<tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Notes</td><td style="padding: 12px 0;">${m.notes}</td></tr>` : ""}
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Waiver Signed</td>
        <td style="padding: 12px 0;">Yes ✓ (inline at checkout)</td>
      </tr>
      <tr>
        <td style="padding: 16px 0; color: #2D5016; font-weight: 700; font-size: 1.1rem;">Total Paid</td>
        <td style="padding: 16px 0; color: #2D5016; font-weight: 700; font-size: 1.4rem;">$${total.toFixed(2)}</td>
      </tr>
    </table>

    <div style="margin-top: 32px; padding: 20px; background: #F8F3E9; border-left: 3px solid #D4A853;">
      <p style="margin: 0; font-size: 0.88rem; color: #4a4a3a; line-height: 1.7;">
        Remember to send directions to the guest before their arrival date.<br/>
        Reply to this email to contact the guest directly.
      </p>
    </div>

    <p style="margin-top: 40px; font-size: 0.8rem; color: #8B8070;">
      Stripe session: <code>${sessionId}</code>
    </p>
  </div>
</body>
</html>`;

    // ── Guest confirmation ──────────────────────────────────────────────────
    const guestHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family: Georgia, serif; background: #FDFAF5; color: #1a1a12; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 32px;">
    <p style="font-size: 0.75rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8B5E3C; margin-bottom: 8px;">Booking Confirmed</p>
    <h1 style="font-size: 2rem; font-weight: 700; color: #2D5016; margin: 0 0 20px;">Your Shabbos is booked.</h1>
    <p style="font-size: 1rem; line-height: 1.8; color: #4a4a3a; margin-bottom: 32px; border-left: 2px solid #D4A853; padding-left: 16px;">
      Shalom ${guestName}! We're looking forward to hosting you. Here's a summary of your reservation.
    </p>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; margin-bottom: 32px;">
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070; width: 40%;">Arrival</td>
        <td style="padding: 12px 0; font-weight: 600;">${m.arrivalDate ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Departure</td>
        <td style="padding: 12px 0; font-weight: 600;">${m.departureDate ?? "—"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Guests</td>
        <td style="padding: 12px 0;">${m.guests}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Vehicles</td>
        <td style="padding: 12px 0;">${m.vehicles}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EDE4D3;">
        <td style="padding: 12px 0; color: #8B8070;">Tent Size</td>
        <td style="padding: 12px 0;">${tentLabel(m.tentType ?? "standard")}</td>
      </tr>
      <tr>
        <td style="padding: 16px 0; color: #2D5016; font-weight: 700;">Total Paid</td>
        <td style="padding: 16px 0; color: #2D5016; font-weight: 700; font-size: 1.2rem;">$${total.toFixed(2)}</td>
      </tr>
    </table>

    <div style="background: #1a2a0f; padding: 28px 24px; border-radius: 3px; margin-bottom: 32px;">
      <p style="color: #D4A853; font-size: 0.7rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 12px;">What Happens Next</p>
      <ol style="color: rgba(253,250,245,0.85); font-size: 0.92rem; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>Directions to Shabbos Village will be sent separately before your arrival.</li>
        <li>One way in, one way out — follow the directions exactly.</li>
        <li>Review the <a href="https://shabbosvillage.com/rules" style="color: #D4A853;">Rules & Safety guidelines</a> before arriving.</li>
        <li>Pack your tent, sleeping bags, and Shabbos essentials (candles, challah, wine).</li>
        <li>Arrive before Shabbos starts. We'll see you there — Shabbat Shalom!</li>
      </ol>
    </div>

    <p style="font-size: 0.88rem; color: #4a4a3a; line-height: 1.7;">
      Questions? Reply to this email or contact us at
      <a href="mailto:info@shabbosvillage.com" style="color: #2D5016; font-weight: 600;">info@shabbosvillage.com</a>.
    </p>

    <p style="margin-top: 40px; font-size: 0.8rem; color: #8B8070; border-top: 1px solid #EDE4D3; padding-top: 24px;">
      © ${new Date().getFullYear()} Shabbos Village · All rights reserved
    </p>
  </div>
</body>
</html>`;

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: guestEmail,
        subject: `New Booking — ${guestName} · ${m.arrivalDate} → ${m.departureDate}`,
        html: ownerHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: guestEmail,
        replyTo: OWNER_EMAIL,
        subject: "Your Shabbos Village booking is confirmed!",
        html: guestHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-confirmation error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
