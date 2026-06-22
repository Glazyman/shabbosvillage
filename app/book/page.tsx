"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CAPACITY,
  PLOT_SIZES,
  PLOT_ORDER,
  PLOT_PRICE_PER_NIGHT,
  RV_PRICE_PER_NIGHT,
  nightsBetween,
  totalPlots,
  calcRegularTotalCents,
  groupSites,
  plotSummary,
  MAX_CARS_PER_PLOT,
  type BookingKind,
  type PlotCounts,
} from "@/lib/booking";

type FormData = {
  kind: BookingKind;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  small: string;
  medium: string;
  large: string;
  rv: string;
  campSites: string;
  guests: string;
  cars: string;
  notes: string;
  waiverSigned: boolean;
  waiverSignature: string;
};

const initialForm: FormData = {
  kind: "regular",
  firstName: "", lastName: "", email: "", phone: "",
  arrivalDate: "", departureDate: "",
  small: "1", medium: "0", large: "0", rv: "0",
  campSites: "10",
  guests: "1", cars: "1", notes: "",
  waiverSigned: false, waiverSignature: "",
};

const RENTAL_OPTIONS: { kind: BookingKind; title: string; desc: string }[] = [
  { kind: "regular", title: "Tent plot or RV spot", desc: `Tent plots $${PLOT_PRICE_PER_NIGHT}/night, RV spots $${RV_PRICE_PER_NIGHT}/night — pay online.` },
  { kind: "whole", title: "Whole campground", desc: "Private — all 50 plots. Request a quote." },
  { kind: "half", title: "Half campground", desc: "~25 plots for your group. Request a quote." },
  { kind: "camp", title: "Camp / Organization", desc: "Choose how many plots. Request a quote." },
];

export default function BookPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [available, setAvailable] = useState<number | null>(null);
  const [availLoading, setAvailLoading] = useState(false);

  const set = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const isGroup = form.kind !== "regular";
  const plots: PlotCounts = {
    small: Math.max(0, parseInt(form.small) || 0),
    medium: Math.max(0, parseInt(form.medium) || 0),
    large: Math.max(0, parseInt(form.large) || 0),
    rv: Math.max(0, parseInt(form.rv) || 0),
  };
  const plotCount = totalPlots(plots);
  const nights = nightsBetween(form.arrivalDate, form.departureDate);
  const cars = Math.max(0, parseInt(form.cars) || 0);
  const campSites = Math.max(1, parseInt(form.campSites) || 0);
  const sitesNeeded = isGroup ? groupSites(form.kind, campSites) : plotCount;
  const total = calcRegularTotalCents(plots, nights || 1) / 100;

  // Live availability whenever both dates are set.
  useEffect(() => {
    if (!form.arrivalDate || !form.departureDate || nightsBetween(form.arrivalDate, form.departureDate) < 1) {
      setAvailable(null);
      return;
    }
    let cancelled = false;
    setAvailLoading(true);
    fetch(`/api/availability?arrival=${form.arrivalDate}&departure=${form.departureDate}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setAvailable(typeof d.available === "number" ? d.available : null); })
      .catch(() => { if (!cancelled) setAvailable(null); })
      .finally(() => { if (!cancelled) setAvailLoading(false); });
    return () => { cancelled = true; };
  }, [form.arrivalDate, form.departureDate]);

  const validateStay = (): string | null => {
    if (nights < 1) return "Please choose valid arrival and departure dates.";
    if (isGroup) {
      if (form.kind === "camp" && campSites < 1) return "Please enter how many sites you need.";
    } else {
      if (plotCount < 1) return "Please add at least one plot.";
      if (cars > plotCount * MAX_CARS_PER_PLOT) {
        return `Up to ${MAX_CARS_PER_PLOT} cars per plot — max ${plotCount * MAX_CARS_PER_PLOT} for ${plotCount} plot${plotCount > 1 ? "s" : ""}.`;
      }
    }
    if (available !== null && sitesNeeded > available) {
      return `Only ${available} of ${CAPACITY} plot${available !== 1 ? "s" : ""} are open on those dates — this request needs ${sitesNeeded}.`;
    }
    return null;
  };

  const handleCheckout = async () => {
    if (!form.waiverSignature.trim()) { setError("Please type your name as a signature before proceeding."); return; }
    if (!form.waiverSigned) { setError("Please check the agreement box before proceeding."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Something went wrong. Please try again.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleRequest = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/request-rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });
      const data = await res.json();
      if (data.ok) setSubmitted(true);
      else setError(data.error || "Something went wrong. Please try again.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const availabilityLine = () => {
    if (availLoading) return <span style={{ color: "#8B8070" }}>Checking availability…</span>;
    if (available === null) return null;
    const ok = sitesNeeded <= available;
    return (
      <span style={{ color: ok ? "#2D5016" : "#c0392b", fontWeight: 600 }}>
        {available} of {CAPACITY} plots available on these dates{!ok ? ` — need ${sitesNeeded}` : ""}
      </span>
    );
  };

  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "45vh", minHeight: "320px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1920&q=85"
          alt="Camping in nature"
          fill
          style={{ objectFit: "cover", objectPosition: "center 50%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,8,0.4) 0%, rgba(10,20,8,0.75) 100%)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
            Reservations
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Book Your Shabbos
          </h1>
        </div>
      </section>

      {/* ── FORM AREA ── */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(24px,5vw,60px)" }}>

        {/* Step indicators */}
        {!submitted && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "48px" }}>
          {[{ n: 1, label: "Your Details" }, { n: 2, label: "Stay Info" }, { n: 3, label: isGroup ? "Review" : "Review & Pay" }].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
              <button
                onClick={() => step > s.n && setStep(s.n)}
                style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: step > s.n ? "pointer" : "default", padding: "0", flexShrink: 0 }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: step >= s.n ? "#2D5016" : "#EDE4D3", color: step >= s.n ? "#FDFAF5" : "#8B8070", fontSize: "0.82rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className="step-label" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: step === s.n ? "#2D5016" : "#8B8070", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </button>
              {i < 2 && <div style={{ flex: 1, height: "1px", backgroundColor: step > s.n ? "#2D5016" : "#EDE4D3", margin: "0 12px", minWidth: "16px", transition: "background-color 0.3s" }} />}
            </div>
          ))}
        </div>
        )}

        {/* ── SUBMITTED (group request) ── */}
        {submitted && (
          <div style={{ maxWidth: "620px" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "12px" }}>Request Received</p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 700, color: "#2D5016", marginBottom: "16px" }}>Thanks — we&apos;ve got your request.</h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#4a4a3a", marginBottom: "28px" }}>
              We&apos;ve reserved your dates while we review your {RENTAL_OPTIONS.find((o) => o.kind === form.kind)?.title.toLowerCase()} request. We&apos;ll email you shortly to confirm availability and send a payment link. A copy of the request was sent to {form.email}.
            </p>
            <Link href="/" style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.04em", padding: "14px 32px", borderRadius: "3px", textDecoration: "none" }}>
              Back to Home
            </Link>
          </div>
        )}

        {/* ── STEP 1 ── */}
        {!submitted && step === 1 && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a12", marginBottom: "8px" }}>
              Tell us about yourself
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8B8070", marginBottom: "40px" }}>
              We&apos;ll use this to confirm your booking and send directions.
            </p>

            <div className="form-two-col" style={{ marginBottom: "32px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input className="form-input" type="text" value={form.firstName} onChange={set("firstName")} placeholder="Moshe" />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input className="form-input" type="text" value={form.lastName} onChange={set("lastName")} placeholder="Cohen" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input className="form-input" type="email" value={form.email} onChange={set("email")} placeholder="moshe@example.com" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input className="form-input" type="tel" value={form.phone} onChange={set("phone")} placeholder="(555) 000-0000" />
              </div>
            </div>

            {/* Rental type chooser */}
            <div style={{ marginBottom: "48px" }}>
              <label style={labelStyle}>What kind of booking?</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                {RENTAL_OPTIONS.map((o) => {
                  const selected = form.kind === o.kind;
                  return (
                    <button
                      key={o.kind}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, kind: o.kind }))}
                      style={{
                        textAlign: "left", cursor: "pointer", padding: "16px 18px", borderRadius: "4px",
                        border: selected ? "2px solid #2D5016" : "1px solid #EDE4D3",
                        backgroundColor: selected ? "#F2F6EC" : "#fff", fontFamily: "inherit",
                      }}
                    >
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700, color: "#2D5016", marginBottom: "4px" }}>{o.title}</p>
                      <p style={{ fontSize: "0.82rem", color: "#6b6b55", lineHeight: 1.5 }}>{o.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "16px" }}>{error}</p>}
            <button
              className="btn-primary"
              style={{ borderRadius: "3px" }}
              onClick={() => { if (!form.firstName || !form.email || !form.phone) { setError("Please fill in your name, email, and phone."); return; } setError(""); setStep(2); }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {!submitted && step === 2 && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a12", marginBottom: "8px" }}>
              Plan your stay
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8B8070", marginBottom: "40px" }}>
              {isGroup ? "Choose your dates and group size — we'll confirm and send a quote." : `Choose your dates and the sites you need — tent plots $${PLOT_PRICE_PER_NIGHT}/night, RV spots $${RV_PRICE_PER_NIGHT}/night.`}
            </p>

            <div className="form-two-col" style={{ marginBottom: "8px" }}>
              <div>
                <label style={labelStyle}>Arrival Date (Friday)</label>
                <input
                  className="form-input"
                  type="date"
                  min={todayStr()}
                  value={form.arrivalDate}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((p) => ({
                      ...p,
                      arrivalDate: v,
                      // clear departure if it's no longer after the new arrival
                      departureDate: p.departureDate && v && p.departureDate <= v ? "" : p.departureDate,
                    }));
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Departure Date</label>
                <input
                  className="form-input"
                  type="date"
                  min={form.arrivalDate ? addDays(form.arrivalDate, 1) : todayStr()}
                  value={form.departureDate}
                  disabled={!form.arrivalDate}
                  onChange={set("departureDate")}
                  style={{ opacity: form.arrivalDate ? 1 : 0.55, cursor: form.arrivalDate ? "auto" : "not-allowed" }}
                />
                {!form.arrivalDate && (
                  <p style={{ fontSize: "0.75rem", color: "#8B8070", marginTop: "6px" }}>Pick your arrival date first.</p>
                )}
              </div>
            </div>
            <p style={{ fontSize: "0.82rem", marginBottom: "32px", minHeight: "20px" }}>{availabilityLine()}</p>

            {!isGroup && (
              <div style={{ marginBottom: "28px" }}>
                <label style={labelStyle}>Plots &amp; RV Spots</label>
                <div style={{ border: "1px solid #EDE4D3", borderRadius: "4px", overflow: "hidden" }}>
                  {PLOT_ORDER.map((size, i) => (
                    <div key={size} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 18px", borderBottom: i < PLOT_ORDER.length - 1 ? "1px solid #EDE4D3" : "none" }}>
                      <div>
                        <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700, color: "#2D5016" }}>{PLOT_SIZES[size].label}</span>
                        <span style={{ fontSize: "0.82rem", color: "#8B8070" }}> · {PLOT_SIZES[size].fits} · up to {PLOT_SIZES[size].people} people · ${PLOT_SIZES[size].price}/night</span>
                      </div>
                      <input className="form-input" type="number" min="0" max="50" value={form[size]} onChange={set(size)} style={{ width: "80px", textAlign: "center" }} />
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#6b6b55", marginTop: "8px" }}>
                  {plotCount} site{plotCount !== 1 ? "s" : ""} selected{nights > 0 ? ` · $${total} for ${nights} night${nights !== 1 ? "s" : ""}` : ""}
                </p>
              </div>
            )}

            {form.kind === "camp" && (
              <div style={{ marginBottom: "28px" }}>
                <label style={labelStyle}>How many plots do you need?</label>
                <input className="form-input" type="number" min="1" max={CAPACITY} value={form.campSites} onChange={set("campSites")} style={{ maxWidth: "160px" }} />
                <p style={{ fontSize: "0.8rem", color: "#8B8070", marginTop: "6px" }}>Up to {CAPACITY} total. We&apos;ll confirm and send a quote.</p>
              </div>
            )}

            <div className="form-two-col" style={{ marginBottom: "28px" }}>
              <div>
                <label style={labelStyle}>Number of Guests</label>
                <input className="form-input" type="number" min="1" max="500" value={form.guests} onChange={set("guests")} />
              </div>
              {!isGroup && (
                <div>
                  <label style={labelStyle}>Number of Cars</label>
                  <input className="form-input" type="number" min="0" max={plotCount * MAX_CARS_PER_PLOT || 2} value={form.cars} onChange={set("cars")} />
                  <p style={{ fontSize: "0.75rem", color: "#8B8070", marginTop: "6px" }}>Max {MAX_CARS_PER_PLOT} per plot{plotCount > 0 ? ` (${plotCount * MAX_CARS_PER_PLOT} allowed)` : ""}.</p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: "48px" }}>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea className="form-input" rows={3} value={form.notes} onChange={set("notes")}
                placeholder="Special needs, accessibility requirements, or anything we should know..."
                style={{ resize: "vertical" }} />
            </div>

            {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "16px" }}>{error}</p>}
            <div className="btn-row" style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(1)} style={backBtnStyle}>← Back</button>
              <button className="btn-primary" style={{ borderRadius: "3px" }}
                onClick={() => { const err = validateStay(); if (err) { setError(err); return; } setError(""); setStep(3); }}>
                {isGroup ? "Review Request →" : "Review Booking →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {!submitted && step === 3 && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a12", marginBottom: "8px" }}>
              {isGroup ? "Review & request" : "Review & pay"}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8B8070", marginBottom: "48px" }}>
              {isGroup ? "Confirm your details — we'll follow up to finalize and take payment." : "Confirm your details and complete your reservation."}
            </p>

            {/* Summary */}
            <div style={{ marginBottom: "40px" }}>
              {[
                { label: "Name", value: `${form.firstName} ${form.lastName}` },
                { label: "Email", value: form.email },
                { label: "Phone", value: form.phone },
                { label: "Booking", value: RENTAL_OPTIONS.find((o) => o.kind === form.kind)?.title || form.kind },
                { label: "Arrival", value: form.arrivalDate || "—" },
                { label: "Departure", value: form.departureDate || "—" },
                { label: "Nights", value: `${nights} night${nights !== 1 ? "s" : ""}` },
                ...(isGroup
                  ? [{ label: "Sites", value: String(sitesNeeded) }]
                  : [{ label: "Sites", value: plotSummary(plots) || "—" }, { label: "Cars", value: form.cars }]),
                { label: "Guests", value: form.guests },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #EDE4D3" : "none" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B8070" }}>{row.label}</span>
                  <span style={{ fontSize: "0.97rem", color: "#1a1a12", fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              {!isGroup && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "24px", marginTop: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2D5016" }}>Total</span>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 700, color: "#2D5016" }}>${total}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#8B8070", marginTop: "6px", textAlign: "right" }}>
                    {plotSummary(plots)} × {nights} night{nights !== 1 ? "s" : ""}
                  </p>
                </>
              )}
            </div>

            {/* Inline waiver — regular bookings only */}
            {!isGroup && (
              <div style={{ borderTop: "2px solid #EDE4D3", paddingTop: "32px", marginBottom: "32px" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "16px" }}>
                  Electronic Agreement
                </p>
                <div style={{ border: "1px solid #EDE4D3", borderRadius: "3px", padding: "20px 24px", maxHeight: "180px", overflowY: "auto", backgroundColor: "#F8F3E9", marginBottom: "20px" }}>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "#4a4a3a", marginBottom: "12px" }}>
                    By signing below, I acknowledge and agree to the full terms of the{" "}
                    <Link href="/waiver" target="_blank" style={{ color: "#2D5016", fontWeight: 700, textDecoration: "underline" }}>Hold Harmless Agreement</Link>
                    {" "}and the{" "}
                    <Link href="/rules" target="_blank" style={{ color: "#2D5016", fontWeight: 700, textDecoration: "underline" }}>Campground Rules &amp; Safety Guidelines</Link>.
                  </p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "#4a4a3a", marginBottom: "12px" }}>
                    I voluntarily assume all risks associated with camping and outdoor activities, including uneven terrain, wildlife, weather conditions, water areas, fire, and other natural hazards. I forever release, hold harmless, and agree to indemnify Joseph Farkas, individually and doing business as Shabbos Village, together with the property owner(s) and their respective heirs, agents, employees, and representatives, from any and all claims arising from my presence on the property or participation in any activities, including claims caused by ordinary negligence, to the fullest extent permitted by law.
                  </p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "#4a4a3a" }}>
                    I accept full responsibility for myself and all members of my party, including minors. I understand that management may require any guest to leave if conduct violates campground rules.
                  </p>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ ...labelStyle, marginBottom: "8px" }}>Type Your Full Name as Signature</label>
                  <input
                    className="form-input"
                    type="text"
                    value={form.waiverSignature}
                    onChange={(e) => setForm((p) => ({ ...p, waiverSignature: e.target.value }))}
                    placeholder={`${form.firstName || "Your"} ${form.lastName || "Name"}`}
                    style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", fontStyle: "italic" }}
                  />
                  <p style={{ fontSize: "0.75rem", color: "#8B8070", marginTop: "6px" }}>
                    Signed on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>

                <label style={{ display: "flex", gap: "14px", alignItems: "flex-start", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.waiverSigned}
                    onChange={(e) => setForm((p) => ({ ...p, waiverSigned: e.target.checked }))}
                    style={{ width: "18px", height: "18px", marginTop: "3px", accentColor: "#2D5016" }} />
                  <span style={{ fontSize: "0.88rem", color: "#3a3a2a", lineHeight: 1.7 }}>
                    I have read and fully understand the{" "}
                    <Link href="/waiver" target="_blank" style={{ color: "#2D5016", fontWeight: 700, textDecoration: "underline" }}>Hold Harmless Agreement</Link>
                    {" "}and the{" "}
                    <Link href="/rules" target="_blank" style={{ color: "#2D5016", fontWeight: 700, textDecoration: "underline" }}>Campground Rules</Link>.
                    {" "}I agree on behalf of myself and all members of my party.
                  </span>
                </label>
              </div>
            )}

            {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "16px" }}>{error}</p>}

            <div className="btn-row" style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <button onClick={() => setStep(2)} style={backBtnStyle}>← Back</button>
              {isGroup ? (
                <button className="btn-primary" style={{ flex: 1, borderRadius: "3px", opacity: loading ? 0.7 : 1 }}
                  onClick={handleRequest} disabled={loading}>
                  {loading ? "Sending…" : "Submit Request"}
                </button>
              ) : (
                <button className="btn-primary" style={{ flex: 1, borderRadius: "3px", opacity: loading ? 0.7 : 1 }}
                  onClick={handleCheckout} disabled={loading}>
                  {loading ? "Redirecting..." : `Pay $${total} Securely`}
                </button>
              )}
            </div>
            <p style={{ fontSize: "0.78rem", color: "#8B8070", textAlign: "center" }}>
              {isGroup ? "No payment now — we'll send a secure payment link after confirming." : "Secured by Stripe — we never store your card details."}
            </p>
          </div>
        )}

        {/* Side info — only on step 1 & 2 */}
        {!submitted && step < 3 && (
          <div className="booking-info-strip" style={{ marginTop: "80px", borderTop: "1px solid #EDE4D3", paddingTop: "48px" }}>
            {[
              { label: "Directions", desc: "Provided after booking confirmation. One way in, one way out." },
              { label: "Questions?", desc: "Email info@shabbosvillage.com — we reply quickly." },
              { label: "Secure Payment", desc: "Stripe-encrypted. No card data stored on our servers." },
            ].map((b) => (
              <div key={b.label}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2D5016", marginBottom: "8px" }}>{b.label}</p>
                <p style={{ fontSize: "0.88rem", color: "#6b6b55", lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Local (timezone-safe) YYYY-MM-DD helpers for the date inputs.
function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(dateStr: string, n: number): string {
  const [y, m, dd] = dateStr.split("-").map(Number);
  const d = new Date(y, m - 1, dd + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "#2D5016",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const backBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid #EDE4D3",
  color: "#4a4a3a",
  fontWeight: 600,
  fontSize: "0.88rem",
  padding: "13px 28px",
  borderRadius: "3px",
  cursor: "pointer",
  fontFamily: "inherit",
};
