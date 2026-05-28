"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const waiverSections = [
  {
    title: "1. Assumption of Risk",
    body: "Camping and outdoor activities involve inherent natural risks, including uneven terrain, wildlife, weather conditions, water areas (creek), fire hazards, and other outdoor hazards. I voluntarily assume all such risks associated with my participation in activities at Shabbos Village.",
  },
  {
    title: "2. Hold Harmless & Release of Liability",
    body: "In consideration of being permitted access to the Shabbos Village property, I hereby agree to RELEASE, HOLD HARMLESS, and INDEMNIFY Shabbos Village, its owners, operators, employees, and agents from any and all claims, demands, actions, suits, or liability for any personal injury, property damage, or loss arising out of or in connection with my presence on the property, whether caused by negligence or otherwise.",
  },
  {
    title: "3. Responsibility for Guests & Minors",
    body: "I accept full responsibility for the safety and conduct of all guests, including minors, traveling with me. I agree that all guests in my party have been informed of and agree to abide by the Shabbos Village rules and regulations. Children must be supervised at all times, especially near water areas.",
  },
  {
    title: "4. Property & Conduct",
    body: "I agree to respect and care for all campground property. I will not engage in any behavior that disrupts the peace and respectful atmosphere of Shabbos Village. Management reserves the right to require any guest to leave without refund if conduct violates campground rules.",
  },
  {
    title: "5. One Way In, One Way Out",
    body: "I acknowledge that the campground has a single access road and agree to follow all directional instructions provided by management. No unauthorized vehicles may block access.",
  },
  {
    title: "6. Camping Disclaimer",
    body: "I acknowledge that camping and outdoor activities involve natural risks including uneven terrain, wildlife, weather, water hazards, and fire. I represent that I am physically capable of participating in outdoor camping activities and that I and my guests participate voluntarily at our own risk.",
  },
  {
    title: "7. Community Atmosphere",
    body: "Shabbos Village is intended to maintain a calm, respectful, family-friendly, and Shabbos-observant environment. I agree to observe all Shabbos guidelines and campground rules during my stay.",
  },
  {
    title: "8. Governing Law",
    body: "This agreement shall be governed by the laws of the state in which the property is located. If any provision of this agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
  },
];

export default function WaiverPage() {
  const [form, setForm] = useState({ fullName: "", date: "", signature: "", agreed: false });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px" }}>
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#2D5016", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", color: "#FDFAF5", fontSize: "1.5rem" }}>
            ✓
          </div>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "16px" }}>Acknowledged</p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 700, color: "#1a1a12", marginBottom: "16px" }}>
            Waiver Signed
          </h1>
          <p style={{ color: "#6b6b55", lineHeight: 1.8, marginBottom: "40px" }}>
            Thank you, <strong>{form.fullName}</strong>. You&apos;ve acknowledged the Hold Harmless Agreement. You&apos;re all set — proceed to booking.
          </p>
          <Link href="/book" style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.04em", padding: "14px 36px", borderRadius: "3px", textDecoration: "none" }}>
            Book Your Stay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "40vh", minHeight: "300px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1920&q=85"
          alt="Forest campground"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,20,8,0.65)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 60px 60px" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>Legal</p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Hold Harmless Agreement
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "80px 40px" }}>

        {/* Intro */}
        <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a", borderLeft: "2px solid #D4A853", paddingLeft: "20px", marginBottom: "60px" }}>
          By accessing and using the Shabbos Village campground property, I (&ldquo;Guest&rdquo;) acknowledge that I have read, understand, and agree to the following terms and conditions.
        </p>

        {/* Waiver sections */}
        <div style={{ marginBottom: "60px" }}>
          {waiverSections.map((s, i) => (
            <div key={s.title} style={{ display: "flex", gap: "32px", alignItems: "flex-start", padding: "32px 0", borderBottom: i < waiverSections.length - 1 ? "1px solid #EDE4D3" : "none" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontStyle: "italic", color: "#D4A853", minWidth: "28px", paddingTop: "3px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 700, color: "#2D5016", marginBottom: "10px" }}>
                  {s.title.replace(/^\d+\.\s/, "")}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#4a4a3a" }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary box */}
        <div style={{ borderTop: "2px solid #2D5016", paddingTop: "32px", marginBottom: "60px" }}>
          <p style={{ fontSize: "0.97rem", fontWeight: 600, color: "#1a1a12", lineHeight: 1.7 }}>
            I have carefully read this Hold Harmless Agreement, fully understand its contents, and acknowledge that I am giving up substantial rights by signing it. I agree freely and voluntarily without duress.
          </p>
        </div>

        {/* Signature form */}
        <div>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "32px" }}>
            Electronic Acknowledgement
          </p>

          <div className="form-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Full Legal Name</label>
              <input className="form-input" type="text" required value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Moshe Cohen" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input className="form-input" type="date" required value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>Type Your Name as Signature</label>
            <input className="form-input" type="text" required value={form.signature}
              onChange={(e) => setForm((p) => ({ ...p, signature: e.target.value }))}
              placeholder="Your full name"
              style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontStyle: "italic" }} />
          </div>

          <label style={{ display: "flex", gap: "14px", alignItems: "flex-start", cursor: "pointer", marginBottom: "36px" }}>
            <input type="checkbox" required checked={form.agreed}
              onChange={(e) => setForm((p) => ({ ...p, agreed: e.target.checked }))}
              style={{ width: "18px", height: "18px", marginTop: "3px", accentColor: "#2D5016" }} />
            <span style={{ fontSize: "0.92rem", color: "#3a3a2a", lineHeight: 1.7 }}>
              I have read and fully understand this Hold Harmless Agreement. I agree to its terms on behalf of myself and all members of my party.
            </span>
          </label>

          <button
            onClick={() => { if (form.fullName && form.signature && form.agreed) setSubmitted(true); }}
            style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.04em", padding: "15px 40px", borderRadius: "3px", border: "none", cursor: "pointer", width: "100%" }}
          >
            Sign & Acknowledge Agreement
          </button>

          <p style={{ fontSize: "0.82rem", color: "#8B8070", textAlign: "center", marginTop: "14px" }}>
            After signing, proceed to{" "}
            <Link href="/book" style={{ color: "#2D5016", fontWeight: 600 }}>book your stay</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#2D5016",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};
