"use client";
import { useState } from "react";
import Link from "next/link";

export default function WaiverPage() {
  const [form, setForm] = useState({
    fullName: "",
    date: "",
    signature: "",
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.signature || !form.agreed) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "120px",
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}>
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>✅</div>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 700,
                       color: "#2D5016", marginBottom: "16px" }}>
            Waiver Acknowledged
          </h1>
          <p style={{ color: "#6b6b55", lineHeight: 1.7, marginBottom: "32px" }}>
            Thank you, <strong>{form.fullName}</strong>. You have acknowledged and agreed to the
            Shabbos Village Hold Harmless Agreement. You&apos;re all set!
          </p>
          <Link href="/book" className="btn-primary">Book Your Stay →</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "100px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #2D5016 0%, #1a3a0f 100%)",
                    padding: "60px 24px 80px", textAlign: "center" }}>
        <span className="section-tag" style={{ color: "#D4A853", backgroundColor: "rgba(212,168,83,0.1)" }}>
          Legal
        </span>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3rem)",
                     fontWeight: 700, color: "#FDFAF5", marginTop: "8px" }}>
          Hold Harmless Agreement
        </h1>
        <p style={{ color: "rgba(253,250,245,0.75)", marginTop: "12px" }}>
          Please read carefully before your stay.
        </p>
      </div>

      <div style={{ maxWidth: "820px", margin: "-40px auto 80px", padding: "0 24px" }}>
        <div style={{ backgroundColor: "#FDFAF5", borderRadius: "24px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid #EDE4D3" }}>

          {/* Waiver text */}
          <div style={{ padding: "48px 48px 32px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700,
                         color: "#2D5016", marginBottom: "24px" }}>
              Shabbos Village — Liability Waiver & Hold Harmless Agreement
            </h2>

            <div style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#3a3a2a" }}>
              <p style={{ marginBottom: "20px" }}>
                By accessing and using the Shabbos Village campground property, I ("<strong>Guest</strong>")
                acknowledge that I have read, understand, and agree to the following terms and conditions.
              </p>

              <Section title="1. Assumption of Risk">
                Camping and outdoor activities involve inherent natural risks, including but not limited to:
                uneven terrain, wildlife, weather conditions, water areas (creek), fire hazards, and other
                outdoor hazards. I voluntarily assume all such risks associated with my participation in
                activities at Shabbos Village.
              </Section>

              <Section title="2. Hold Harmless & Release of Liability">
                In consideration of being permitted access to the Shabbos Village property, I hereby agree
                to RELEASE, HOLD HARMLESS, and INDEMNIFY Shabbos Village, its owners, operators, employees,
                and agents from any and all claims, demands, actions, suits, or liability for any personal
                injury, property damage, or loss arising out of or in connection with my presence on the
                property, whether caused by negligence or otherwise.
              </Section>

              <Section title="3. Responsibility for Guests & Minors">
                I accept full responsibility for the safety and conduct of all guests, including minors,
                traveling with me. I agree that all guests in my party have been informed of and agree to
                abide by the Shabbos Village rules and regulations. Children must be supervised at all
                times, especially near water areas.
              </Section>

              <Section title="4. Property & Conduct">
                I agree to respect and care for all campground property. I will not engage in any behavior
                that disrupts the peace and respectful atmosphere of Shabbos Village. Management reserves
                the right to require any guest to leave without refund if conduct violates campground rules
                or disturbs other guests.
              </Section>

              <Section title="5. One Way In, One Way Out">
                I acknowledge that the campground has a single access road and agree to follow all
                directional instructions provided by management. No unauthorized vehicles may block access.
              </Section>

              <Section title="6. Camping Disclaimer">
                I acknowledge that camping and outdoor activities involve natural risks including uneven
                terrain, wildlife, weather, water hazards, and fire. I represent that I am physically
                capable of participating in outdoor camping activities and that I and my guests participate
                voluntarily at our own risk.
              </Section>

              <Section title="7. Community Atmosphere">
                Shabbos Village is intended to maintain a calm, respectful, family-friendly, and Shabbos-
                observant environment. I agree to observe all Shabbos guidelines and campground rules
                during my stay.
              </Section>

              <Section title="8. Governing Law">
                This agreement shall be governed by the laws of the state in which the property is located.
                If any provision of this agreement is found to be unenforceable, the remaining provisions
                shall remain in full force and effect.
              </Section>

              <div style={{ backgroundColor: "#F8F3E9", borderRadius: "12px", padding: "20px",
                            marginTop: "24px", border: "1px solid #EDE4D3" }}>
                <p style={{ fontWeight: 600, color: "#2D5016" }}>
                  I have carefully read this Hold Harmless Agreement, fully understand its contents,
                  and acknowledge that I am giving up substantial rights by signing it. I agree freely
                  and voluntarily without duress.
                </p>
              </div>
            </div>
          </div>

          {/* Signature form */}
          <form onSubmit={handleSubmit} style={{ padding: "0 48px 48px", borderTop: "1px solid #EDE4D3", paddingTop: "32px" }}>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700,
                         color: "#2D5016", marginBottom: "24px" }}>
              Electronic Acknowledgement
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Full Legal Name *</label>
                <input
                  className="form-input"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Moshe Cohen"
                />
              </div>
              <div>
                <label style={labelStyle}>Today&apos;s Date *</label>
                <input
                  className="form-input"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                />
              </div>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Type Your Full Name as Signature *</label>
              <input
                className="form-input"
                type="text"
                required
                value={form.signature}
                onChange={(e) => setForm((p) => ({ ...p, signature: e.target.value }))}
                placeholder="Type your full name here"
                style={{ fontFamily: "cursive", fontSize: "1.2rem" }}
              />
            </div>
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", marginBottom: "28px" }}>
              <input
                type="checkbox"
                required
                checked={form.agreed}
                onChange={(e) => setForm((p) => ({ ...p, agreed: e.target.checked }))}
                style={{ width: "18px", height: "18px", marginTop: "3px", accentColor: "#2D5016" }}
              />
              <span style={{ fontSize: "0.9rem", color: "#3a3a2a", lineHeight: 1.6 }}>
                I have read and fully understand this Hold Harmless Agreement. I agree to its terms
                on behalf of myself and all members of my party.
              </span>
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                Sign & Acknowledge Agreement
              </button>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#8B8070", marginTop: "12px", textAlign: "center" }}>
              After signing, proceed to{" "}
              <Link href="/book" style={{ color: "#2D5016", fontWeight: 600 }}>book your stay</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700,
                   color: "#2D5016", marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#4a4a3a" }}>{children}</p>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#2D5016",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
