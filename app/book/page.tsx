"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  guests: string;
  vehicles: string;
  tentType: string;
  hookup: string;
  groupType: string;
  notes: string;
  waiverSigned: boolean;
};

const initialForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  arrivalDate: "", departureDate: "", guests: "1",
  vehicles: "1", tentType: "standard", hookup: "no",
  groupType: "family", notes: "", waiverSigned: false,
};

const PRICING = { base: 45, hookup: 20, perGuest: 15, perVehicle: 10 };

function calcTotal(form: FormData) {
  const nights = (() => {
    if (!form.arrivalDate || !form.departureDate) return 1;
    const diff = new Date(form.departureDate).getTime() - new Date(form.arrivalDate).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();
  const guests = Math.max(1, parseInt(form.guests) || 1);
  const vehicles = Math.max(0, parseInt(form.vehicles) || 0);
  const hookup = form.hookup === "yes" ? PRICING.hookup : 0;
  const total = (PRICING.base + hookup + (guests - 1) * PRICING.perGuest + vehicles * PRICING.perVehicle) * nights;
  return { total, nights };
}

export default function BookPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const { total, nights } = calcTotal(form);

  const handleCheckout = async () => {
    if (!form.waiverSigned) { setError("Please agree to the hold harmless waiver before proceeding."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, total, nights }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Something went wrong. Please try again.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
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
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 60px 60px" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
            Reservations
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Book Your Shabbos
          </h1>
        </div>
      </section>

      {/* ── FORM AREA ── */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 60px" }}>

        {/* Step indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "64px" }}>
          {[{ n: 1, label: "Your Details" }, { n: 2, label: "Stay Info" }, { n: 3, label: "Review & Pay" }].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
              <button
                onClick={() => step > s.n && setStep(s.n)}
                style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: step > s.n ? "pointer" : "default", padding: "0" }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: step >= s.n ? "#2D5016" : "#EDE4D3", color: step >= s.n ? "#FDFAF5" : "#8B8070", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-playfair)", fontStyle: step > s.n ? "normal" : "normal" }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: step === s.n ? "#2D5016" : "#8B8070", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </button>
              {i < 2 && <div style={{ flex: 1, height: "1px", backgroundColor: step > s.n ? "#2D5016" : "#EDE4D3", margin: "0 16px", transition: "background-color 0.3s" }} />}
            </div>
          ))}
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a12", marginBottom: "8px" }}>
              Tell us about yourself
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8B8070", marginBottom: "48px" }}>
              We&apos;ll use this to confirm your booking and send directions.
            </p>

            <div className="form-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
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
            <div style={{ marginBottom: "48px" }}>
              <label style={labelStyle}>Booking Type</label>
              <select className="form-input" value={form.groupType} onChange={set("groupType")}>
                <option value="family">Family Stay</option>
                <option value="group">Group / Friends</option>
                <option value="camp">Camp / Organization</option>
                <option value="event">Private Event</option>
              </select>
            </div>

            {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "16px" }}>{error}</p>}
            <button
              className="btn-primary"
              style={{ borderRadius: "3px" }}
              onClick={() => { if (!form.firstName || !form.email || !form.phone) { setError("Please fill in all required fields."); return; } setError(""); setStep(2); }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a12", marginBottom: "8px" }}>
              Plan your stay
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8B8070", marginBottom: "48px" }}>
              Choose your dates and tell us what you&apos;re bringing.
            </p>

            <div className="form-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>Arrival Date (Friday)</label>
                <input className="form-input" type="date" value={form.arrivalDate} onChange={set("arrivalDate")} />
              </div>
              <div>
                <label style={labelStyle}>Departure Date</label>
                <input className="form-input" type="date" value={form.departureDate} onChange={set("departureDate")} />
              </div>
              <div>
                <label style={labelStyle}>Number of Guests</label>
                <input className="form-input" type="number" min="1" max="50" value={form.guests} onChange={set("guests")} />
              </div>
              <div>
                <label style={labelStyle}>Number of Vehicles</label>
                <input className="form-input" type="number" min="0" max="20" value={form.vehicles} onChange={set("vehicles")} />
              </div>
              <div>
                <label style={labelStyle}>Tent Size</label>
                <select className="form-input" value={form.tentType} onChange={set("tentType")}>
                  <option value="standard">Standard (up to 4 person)</option>
                  <option value="large">Large (up to 8 person)</option>
                  <option value="xl">XL / Cabin Tent</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Electric Hookup</label>
                <select className="form-input" value={form.hookup} onChange={set("hookup")}>
                  <option value="no">No hookup needed</option>
                  <option value="yes">Yes — +$20/night</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "48px" }}>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea className="form-input" rows={3} value={form.notes} onChange={set("notes")}
                placeholder="Special needs, accessibility requirements, or anything we should know..."
                style={{ resize: "vertical" }} />
            </div>

            {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "16px" }}>{error}</p>}
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(1)} style={{ background: "none", border: "1px solid #EDE4D3", color: "#4a4a3a", fontWeight: 600, fontSize: "0.88rem", padding: "13px 28px", borderRadius: "3px", cursor: "pointer", fontFamily: "inherit" }}>
                ← Back
              </button>
              <button className="btn-primary" style={{ borderRadius: "3px" }}
                onClick={() => { if (!form.arrivalDate || !form.departureDate) { setError("Please select your dates."); return; } setError(""); setStep(3); }}>
                Review Booking →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a12", marginBottom: "8px" }}>
              Review & pay
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8B8070", marginBottom: "48px" }}>
              Confirm your details and complete your reservation.
            </p>

            {/* Summary */}
            <div style={{ marginBottom: "40px" }}>
              {[
                { label: "Name",      value: `${form.firstName} ${form.lastName}` },
                { label: "Email",     value: form.email },
                { label: "Phone",     value: form.phone },
                { label: "Arrival",   value: form.arrivalDate || "—" },
                { label: "Departure", value: form.departureDate || "—" },
                { label: "Nights",    value: `${nights} night${nights !== 1 ? "s" : ""}` },
                { label: "Guests",    value: form.guests },
                { label: "Vehicles",  value: form.vehicles },
                { label: "Tent",      value: form.tentType },
                { label: "Hookup",    value: form.hookup === "yes" ? "Yes (+$20/night)" : "No" },
              ].map((row, i) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: i < 9 ? "1px solid #EDE4D3" : "none" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B8070" }}>{row.label}</span>
                  <span style={{ fontSize: "0.97rem", color: "#1a1a12", fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "24px", marginTop: "8px" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2D5016" }}>Estimated Total</span>
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 700, color: "#2D5016" }}>${total}</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "#8B8070", marginTop: "6px", textAlign: "right" }}>
                $45 base/night + guests + vehicles + hookup × {nights} night{nights !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Waiver */}
            <div style={{ borderTop: "2px solid #EDE4D3", paddingTop: "28px", marginBottom: "32px" }}>
              <label style={{ display: "flex", gap: "14px", alignItems: "flex-start", cursor: "pointer" }}>
                <input type="checkbox" checked={form.waiverSigned}
                  onChange={(e) => setForm((p) => ({ ...p, waiverSigned: e.target.checked }))}
                  style={{ width: "18px", height: "18px", marginTop: "3px", accentColor: "#2D5016" }} />
                <span style={{ fontSize: "0.9rem", color: "#3a3a2a", lineHeight: 1.7 }}>
                  I have read and agree to the{" "}
                  <Link href="/waiver" target="_blank" style={{ color: "#2D5016", fontWeight: 600 }}>Hold Harmless Waiver</Link>
                  {" "}and the{" "}
                  <Link href="/rules" target="_blank" style={{ color: "#2D5016", fontWeight: 600 }}>Campground Rules</Link>.
                  I assume responsibility for myself and my guests.
                </span>
              </label>
            </div>

            {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "16px" }}>{error}</p>}

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <button onClick={() => setStep(2)} style={{ background: "none", border: "1px solid #EDE4D3", color: "#4a4a3a", fontWeight: 600, fontSize: "0.88rem", padding: "13px 28px", borderRadius: "3px", cursor: "pointer", fontFamily: "inherit" }}>
                ← Back
              </button>
              <button className="btn-primary" style={{ flex: 1, borderRadius: "3px", opacity: loading ? 0.7 : 1 }}
                onClick={handleCheckout} disabled={loading}>
                {loading ? "Redirecting..." : `Pay $${total} Securely`}
              </button>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#8B8070", textAlign: "center" }}>
              Secured by Stripe — we never store your card details.
            </p>
          </div>
        )}

        {/* Side info — only on step 1 & 2 */}
        {step < 3 && (
          <div className="booking-info-strip" style={{ marginTop: "80px", borderTop: "1px solid #EDE4D3", paddingTop: "48px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
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

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "#2D5016",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};
