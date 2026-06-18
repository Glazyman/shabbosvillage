import { Resend } from "resend";
import { tentSummary } from "@/lib/booking";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "info@shabbosvillage.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Shabbos Village <bookings@shabbosvillage.com>";

// Shape returned by the Supabase booking RPCs (snake_case columns).
export type BookingRow = {
  id: string;
  status: string;
  kind: "regular" | "whole" | "half" | "camp";
  arrival_date: string;
  departure_date: string;
  sites: number;
  small: number;
  medium: number;
  large: number;
  guests: number;
  cars: number;
  amount_cents: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  waiver_signed: boolean;
  waiver_signature: string | null;
  stripe_session_id: string | null;
};

const KIND_LABEL: Record<BookingRow["kind"], string> = {
  regular: "Tent reservation",
  whole: "Whole campground (private)",
  half: "Half campground",
  camp: "Camp / organization",
};

function fullName(b: BookingRow) {
  return `${b.first_name ?? ""} ${b.last_name ?? ""}`.trim();
}

function tentsLine(b: BookingRow) {
  const s = tentSummary({ small: b.small, medium: b.medium, large: b.large });
  return s || `${b.sites} site${b.sites !== 1 ? "s" : ""}`;
}

function resend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

// ── Paid regular booking: owner notification + guest confirmation ────────────
export async function sendBookingConfirmation(b: BookingRow) {
  const guestEmail = b.email ?? "";
  const guestName = fullName(b);
  const total = (b.amount_cents ?? 0) / 100;

  const ownerHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="font-family: Georgia, serif; background: #FDFAF5; color: #1a1a12; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 32px;">
    <p style="font-size: 0.75rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8B5E3C; margin-bottom: 8px;">New Booking</p>
    <h1 style="font-size: 2rem; font-weight: 700; color: #2D5016; margin: 0 0 32px;">Shabbos Village Reservation</h1>
    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070; width: 40%;">Guest Name</td><td style="padding: 12px 0; font-weight: 600;">${guestName}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Email</td><td style="padding: 12px 0;"><a href="mailto:${guestEmail}" style="color: #2D5016;">${guestEmail}</a></td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Phone</td><td style="padding: 12px 0;">${b.phone ?? "—"}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Arrival</td><td style="padding: 12px 0;">${b.arrival_date}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Departure</td><td style="padding: 12px 0;">${b.departure_date}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Tents</td><td style="padding: 12px 0;">${tentsLine(b)} (${b.sites} site${b.sites !== 1 ? "s" : ""})</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Guests</td><td style="padding: 12px 0;">${b.guests}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Cars</td><td style="padding: 12px 0;">${b.cars}</td></tr>
      ${b.notes ? `<tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Notes</td><td style="padding: 12px 0;">${b.notes}</td></tr>` : ""}
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Waiver Signed</td><td style="padding: 12px 0;">Yes ✓ (${b.waiver_signature ?? ""})</td></tr>
      <tr><td style="padding: 16px 0; color: #2D5016; font-weight: 700; font-size: 1.1rem;">Total Paid</td><td style="padding: 16px 0; color: #2D5016; font-weight: 700; font-size: 1.4rem;">$${total.toFixed(2)}</td></tr>
    </table>
    <div style="margin-top: 32px; padding: 20px; background: #F8F3E9; border-left: 3px solid #D4A853;">
      <p style="margin: 0; font-size: 0.88rem; color: #4a4a3a; line-height: 1.7;">Remember to send directions to the guest before their arrival date.<br/>Reply to this email to contact the guest directly.</p>
    </div>
    <p style="margin-top: 40px; font-size: 0.8rem; color: #8B8070;">Booking ID: <code>${b.id}</code></p>
  </div>
</body></html>`;

  const guestHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="font-family: Georgia, serif; background: #FDFAF5; color: #1a1a12; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 32px;">
    <p style="font-size: 0.75rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8B5E3C; margin-bottom: 8px;">Booking Confirmed</p>
    <h1 style="font-size: 2rem; font-weight: 700; color: #2D5016; margin: 0 0 20px;">Your Shabbos is booked.</h1>
    <p style="font-size: 1rem; line-height: 1.8; color: #4a4a3a; margin-bottom: 32px; border-left: 2px solid #D4A853; padding-left: 16px;">Shalom ${guestName}! We're looking forward to hosting you. Here's a summary of your reservation.</p>
    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; margin-bottom: 32px;">
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070; width: 40%;">Arrival</td><td style="padding: 12px 0; font-weight: 600;">${b.arrival_date}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Departure</td><td style="padding: 12px 0; font-weight: 600;">${b.departure_date}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Tents</td><td style="padding: 12px 0;">${tentsLine(b)}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Guests</td><td style="padding: 12px 0;">${b.guests}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Cars</td><td style="padding: 12px 0;">${b.cars}</td></tr>
      <tr><td style="padding: 16px 0; color: #2D5016; font-weight: 700;">Total Paid</td><td style="padding: 16px 0; color: #2D5016; font-weight: 700; font-size: 1.2rem;">$${total.toFixed(2)}</td></tr>
    </table>
    <div style="background: #1a2a0f; padding: 28px 24px; border-radius: 3px; margin-bottom: 32px;">
      <p style="color: #D4A853; font-size: 0.7rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 12px;">What Happens Next</p>
      <ol style="color: rgba(253,250,245,0.85); font-size: 0.92rem; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>Directions to Shabbos Village will be sent separately before your arrival.</li>
        <li>One way in, one way out — follow the directions exactly.</li>
        <li>Review the <a href="https://shabbosvillage.com/rules" style="color: #D4A853;">Rules &amp; Safety guidelines</a> before arriving.</li>
        <li>Pack your tent, sleeping bags, and Shabbos essentials (candles, challah, wine).</li>
        <li>Arrive before Shabbos starts. We'll see you there — Shabbat Shalom!</li>
      </ol>
    </div>
    <p style="font-size: 0.88rem; color: #4a4a3a; line-height: 1.7;">Questions? Reply to this email or contact us at <a href="mailto:info@shabbosvillage.com" style="color: #2D5016; font-weight: 600;">info@shabbosvillage.com</a>.</p>
    <p style="margin-top: 40px; font-size: 0.8rem; color: #8B8070; border-top: 1px solid #EDE4D3; padding-top: 24px;">© ${new Date().getFullYear()} Shabbos Village · All rights reserved</p>
  </div>
</body></html>`;

  const r = resend();
  await Promise.all([
    r.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: guestEmail || OWNER_EMAIL,
      subject: `New Booking — ${guestName} · ${b.arrival_date} → ${b.departure_date}`,
      html: ownerHtml,
    }),
    guestEmail
      ? r.emails.send({
          from: FROM_EMAIL,
          to: guestEmail,
          replyTo: OWNER_EMAIL,
          subject: "Your Shabbos Village booking is confirmed!",
          html: guestHtml,
        })
      : Promise.resolve(),
  ]);
}

// ── Group rental request (whole/half/camp): owner alert + guest acknowledgement ──
export async function sendGroupRequest(b: BookingRow) {
  const guestEmail = b.email ?? "";
  const guestName = fullName(b);
  const kindLabel = KIND_LABEL[b.kind];

  const ownerHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="font-family: Georgia, serif; background: #FDFAF5; color: #1a1a12; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 32px;">
    <p style="font-size: 0.75rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8B5E3C; margin-bottom: 8px;">Group Rental Request</p>
    <h1 style="font-size: 1.8rem; font-weight: 700; color: #2D5016; margin: 0 0 24px;">${kindLabel}</h1>
    <p style="font-size: 0.95rem; color: #4a4a3a; line-height: 1.7; margin-bottom: 24px;">This request is holding <strong>${b.sites} of ${50} site${b.sites !== 1 ? "s" : ""}</strong> for the dates below for the next 48 hours. Confirm it in Supabase and send a payment link, or it will auto-expire and release the dates.</p>
    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070; width: 40%;">Contact</td><td style="padding: 12px 0; font-weight: 600;">${guestName}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Email</td><td style="padding: 12px 0;"><a href="mailto:${guestEmail}" style="color: #2D5016;">${guestEmail}</a></td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Phone</td><td style="padding: 12px 0;">${b.phone ?? "—"}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Arrival</td><td style="padding: 12px 0;">${b.arrival_date}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Departure</td><td style="padding: 12px 0;">${b.departure_date}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Sites held</td><td style="padding: 12px 0;">${b.sites}</td></tr>
      <tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Guests (est.)</td><td style="padding: 12px 0;">${b.guests}</td></tr>
      ${b.notes ? `<tr style="border-bottom: 1px solid #EDE4D3;"><td style="padding: 12px 0; color: #8B8070;">Notes</td><td style="padding: 12px 0;">${b.notes}</td></tr>` : ""}
    </table>
    <p style="margin-top: 32px; font-size: 0.8rem; color: #8B8070;">Booking ID: <code>${b.id}</code> · status: <strong>hold</strong></p>
  </div>
</body></html>`;

  const guestHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="font-family: Georgia, serif; background: #FDFAF5; color: #1a1a12; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 32px;">
    <p style="font-size: 0.75rem; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8B5E3C; margin-bottom: 8px;">Request Received</p>
    <h1 style="font-size: 2rem; font-weight: 700; color: #2D5016; margin: 0 0 20px;">We've got your request.</h1>
    <p style="font-size: 1rem; line-height: 1.8; color: #4a4a3a; margin-bottom: 24px; border-left: 2px solid #D4A853; padding-left: 16px;">
      Shalom ${guestName}! Thanks for your interest in a <strong>${kindLabel.toLowerCase()}</strong> at Shabbos Village for ${b.arrival_date} → ${b.departure_date}. We've reserved your spot while we review it. We'll be in touch shortly to confirm availability and send a payment link.
    </p>
    <p style="font-size: 0.88rem; color: #4a4a3a; line-height: 1.7;">Questions? Just reply to this email or reach us at <a href="mailto:info@shabbosvillage.com" style="color: #2D5016; font-weight: 600;">info@shabbosvillage.com</a>.</p>
    <p style="margin-top: 40px; font-size: 0.8rem; color: #8B8070; border-top: 1px solid #EDE4D3; padding-top: 24px;">© ${new Date().getFullYear()} Shabbos Village</p>
  </div>
</body></html>`;

  const r = resend();
  await Promise.all([
    r.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: guestEmail || OWNER_EMAIL,
      subject: `Group Request (${b.kind}) — ${guestName} · ${b.arrival_date} → ${b.departure_date}`,
      html: ownerHtml,
    }),
    guestEmail
      ? r.emails.send({
          from: FROM_EMAIL,
          to: guestEmail,
          replyTo: OWNER_EMAIL,
          subject: "We received your Shabbos Village request",
          html: guestHtml,
        })
      : Promise.resolve(),
  ]);
}
