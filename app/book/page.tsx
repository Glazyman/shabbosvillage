"use client";
import { useState } from "react";
import Link from "next/link";

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

const PRICING = {
  base: 45,
  hookup: 20,
  perGuest: 15,
  perVehicle: 10,
};

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

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const { total, nights } = calcTotal(form);

  const handleCheckout = async () => {
    if (!form.waiverSigned) {
      setError("Please agree to the hold harmless waiver before proceeding.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, total, nights }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "100px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2D5016 0%, #1a3a0f 100%)",
          padding: "60px 24px 80px",
          textAlign: "center",
        }}
      >
        <span className="section-tag" style={{ color: "#D4A853", borderColor: "rgba(212,168,83,0.3)",
                backgroundColor: "rgba(212,168,83,0.1)" }}>
          Book Your Stay
        </span>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "#FDFAF5",
            marginTop: "8px",
          }}
        >
          Reserve Your Shabbos
        </h1>
        <p style={{ color: "rgba(253,250,245,0.75)", marginTop: "12px", fontSize: "1rem" }}>
          Simple. Fast. Secure.
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "-40px auto 80px", padding: "0 24px" }}>
        <div
          style={{
            backgroundColor: "#FDFAF5",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            overflow: "hidden",
            border: "1px solid #EDE4D3",
          }}
        >
          {/* Step indicators */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#F8F3E9",
              borderBottom: "1px solid #EDE4D3",
            }}
          >
            {[
              { n: 1, label: "Your Details" },
              { n: 2, label: "Stay Info" },
              { n: 3, label: "Review & Pay" },
            ].map((s) => (
              <button
                key={s.n}
                onClick={() => step > s.n && setStep(s.n)}
                style={{
                  flex: 1,
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  border: "none",
                  borderBottom: step === s.n ? "3px solid #2D5016" : "3px solid transparent",
                  backgroundColor: "transparent",
                  cursor: step > s.n ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: step >= s.n ? "#2D5016" : "#EDE4D3",
                    color: step >= s.n ? "#F8F3E9" : "#8B5E3C",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step > s.n ? "✓" : s.n}
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: step === s.n ? "#2D5016" : "#8B8070" }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          <div style={{ padding: "40px" }}>
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 700,
                              color: "#2D5016", marginBottom: "24px" }}>
                  Your Details
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input className="form-input" type="text" value={form.firstName}
                           onChange={set("firstName")} placeholder="Moshe" required />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input className="form-input" type="text" value={form.lastName}
                           onChange={set("lastName")} placeholder="Cohen" required />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input className="form-input" type="email" value={form.email}
                           onChange={set("email")} placeholder="moshe@example.com" required />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input className="form-input" type="tel" value={form.phone}
                           onChange={set("phone")} placeholder="(555) 000-0000" required />
                  </div>
                </div>
                <div style={{ marginTop: "16px" }}>
                  <label style={labelStyle}>Booking Type</label>
                  <select className="form-input" value={form.groupType} onChange={set("groupType")}>
                    <option value="family">Family Stay</option>
                    <option value="group">Group / Friends</option>
                    <option value="camp">Camp / Organization</option>
                    <option value="event">Private Event</option>
                  </select>
                </div>
                <button
                  className="btn-primary"
                  style={{ marginTop: "32px", width: "100%" }}
                  onClick={() => {
                    if (!form.firstName || !form.email || !form.phone) {
                      setError("Please fill in all required fields.");
                      return;
                    }
                    setError("");
                    setStep(2);
                  }}
                >
                  Continue →
                </button>
                {error && <p style={{ color: "#c0392b", marginTop: "12px", fontSize: "0.9rem" }}>{error}</p>}
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 700,
                              color: "#2D5016", marginBottom: "24px" }}>
                  Your Stay
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Arrival Date (Friday)</label>
                    <input className="form-input" type="date" value={form.arrivalDate}
                           onChange={set("arrivalDate")} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Departure Date (Saturday Night)</label>
                    <input className="form-input" type="date" value={form.departureDate}
                           onChange={set("departureDate")} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Number of Guests</label>
                    <input className="form-input" type="number" min="1" max="50"
                           value={form.guests} onChange={set("guests")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Number of Vehicles</label>
                    <input className="form-input" type="number" min="0" max="20"
                           value={form.vehicles} onChange={set("vehicles")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Tent Size / Type</label>
                    <select className="form-input" value={form.tentType} onChange={set("tentType")}>
                      <option value="standard">Standard (up to 4 person)</option>
                      <option value="large">Large (up to 8 person)</option>
                      <option value="xl">XL / Cabin Tent</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Electric Hookup?</label>
                    <select className="form-input" value={form.hookup} onChange={set("hookup")}>
                      <option value="no">No hookup needed</option>
                      <option value="yes">Yes, I need electric hookup (+$20/night)</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: "16px" }}>
                  <label style={labelStyle}>Special Requests / Notes</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={form.notes}
                    onChange={set("notes")}
                    placeholder="Any special needs, accessibility requirements, or notes..."
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button
                    className="btn-primary"
                    style={{ flex: 2 }}
                    onClick={() => {
                      if (!form.arrivalDate || !form.departureDate) {
                        setError("Please select your arrival and departure dates.");
                        return;
                      }
                      setError("");
                      setStep(3);
                    }}
                  >
                    Review Booking →
                  </button>
                </div>
                {error && <p style={{ color: "#c0392b", marginTop: "12px", fontSize: "0.9rem" }}>{error}</p>}
              </div>
            )}

            {/* STEP 3 — Review & Pay */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 700,
                              color: "#2D5016", marginBottom: "24px" }}>
                  Review & Pay
                </h2>

                {/* Summary card */}
                <div
                  style={{
                    backgroundColor: "#F8F3E9",
                    borderRadius: "16px",
                    padding: "28px",
                    marginBottom: "28px",
                    border: "1px solid #EDE4D3",
                  }}
                >
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem",
                               color: "#2D5016", marginBottom: "16px", fontWeight: 700 }}>
                    Booking Summary
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[
                      { label: "Name",      value: `${form.firstName} ${form.lastName}` },
                      { label: "Email",     value: form.email },
                      { label: "Phone",     value: form.phone },
                      { label: "Arrival",   value: form.arrivalDate || "—" },
                      { label: "Departure", value: form.departureDate || "—" },
                      { label: "Nights",    value: `${nights} night${nights > 1 ? "s" : ""}` },
                      { label: "Guests",    value: form.guests },
                      { label: "Vehicles",  value: form.vehicles },
                      { label: "Tent",      value: form.tentType },
                      { label: "Hookup",    value: form.hookup === "yes" ? "Yes (+$20/night)" : "No" },
                    ].map((r) => (
                      <div key={r.label}>
                        <span style={{ fontSize: "0.78rem", color: "#8B5E3C", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {r.label}
                        </span>
                        <p style={{ fontSize: "0.95rem", color: "#2D5016", fontWeight: 500, marginTop: "2px" }}>{r.value}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid #EDE4D3", marginTop: "20px", paddingTop: "20px",
                                display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "#2D5016", fontSize: "1rem" }}>Estimated Total</span>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem",
                                   fontWeight: 700, color: "#2D5016" }}>
                      ${total}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#8B5E3C", marginTop: "8px" }}>
                    Breakdown: $45 base/night + guests + vehicles + hookup × {nights} night{nights > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Waiver agreement */}
                <div
                  style={{
                    backgroundColor: "#fff8e8",
                    border: "1.5px solid #D4A853",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "24px",
                  }}
                >
                  <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={form.waiverSigned}
                      onChange={(e) => setForm((p) => ({ ...p, waiverSigned: e.target.checked }))}
                      style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "#2D5016" }}
                    />
                    <span style={{ fontSize: "0.9rem", color: "#4a3a15", lineHeight: 1.6 }}>
                      I have read and agree to the{" "}
                      <Link href="/waiver" target="_blank"
                            style={{ color: "#8B5E3C", fontWeight: 600, textDecoration: "underline" }}>
                        Hold Harmless & Liability Waiver
                      </Link>{" "}
                      and the{" "}
                      <Link href="/rules" target="_blank"
                            style={{ color: "#8B5E3C", fontWeight: 600, textDecoration: "underline" }}>
                        Campground Rules & Safety
                      </Link>
                      . I understand that camping and outdoor activities involve natural risks and
                      I assume responsibility for myself and my guests.
                    </span>
                  </label>
                </div>

                {error && (
                  <div style={{ backgroundColor: "#fef2f2", border: "1px solid #f87171", borderRadius: "10px",
                                padding: "12px 16px", marginBottom: "16px", color: "#c0392b", fontSize: "0.9rem" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>
                    ← Back
                  </button>
                  <button
                    className="btn-primary"
                    style={{ flex: 2, opacity: loading ? 0.7 : 1 }}
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? "Redirecting to payment..." : `Pay $${total} Securely →`}
                  </button>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#8B8070", textAlign: "center", marginTop: "12px" }}>
                  🔒 Secured by Stripe. We never store your card details.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info boxes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          {[
            { icon: "📍", title: "Directions", desc: "Provided after booking confirmation." },
            { icon: "📞", title: "Questions?", desc: "Email info@shabbosvillage.com" },
            { icon: "🔒", title: "Safe & Secure", desc: "Stripe-encrypted payments." },
          ].map((b) => (
            <div
              key={b.title}
              style={{
                backgroundColor: "#F8F3E9",
                borderRadius: "14px",
                padding: "20px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                border: "1px solid #EDE4D3",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{b.icon}</span>
              <div>
                <p style={{ fontWeight: 700, color: "#2D5016", fontSize: "0.9rem" }}>{b.title}</p>
                <p style={{ fontSize: "0.85rem", color: "#6b6b55", marginTop: "4px" }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#2D5016",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
