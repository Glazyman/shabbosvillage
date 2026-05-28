import Link from "next/link";
import Image from "next/image";

const waiverSections = [
  {
    title: "Assumption of Risk",
    body: "Camping and outdoor activities involve inherent natural risks, including uneven terrain, wildlife, weather conditions, water areas (creek), fire hazards, and other outdoor hazards. I voluntarily assume all such risks associated with my participation in activities at Shabbos Village.",
  },
  {
    title: "Hold Harmless & Release of Liability",
    body: "In consideration of being permitted access to the Shabbos Village property, I hereby agree to RELEASE, HOLD HARMLESS, and INDEMNIFY Shabbos Village, its owners, operators, employees, and agents from any and all claims, demands, actions, suits, or liability for any personal injury, property damage, or loss arising out of or in connection with my presence on the property, whether caused by negligence or otherwise.",
  },
  {
    title: "Responsibility for Guests & Minors",
    body: "I accept full responsibility for the safety and conduct of all guests, including minors, traveling with me. I agree that all guests in my party have been informed of and agree to abide by the Shabbos Village rules and regulations. Children must be supervised at all times, especially near water areas.",
  },
  {
    title: "Property & Conduct",
    body: "I agree to respect and care for all campground property. I will not engage in any behavior that disrupts the peace and respectful atmosphere of Shabbos Village. Management reserves the right to require any guest to leave without refund if conduct violates campground rules.",
  },
  {
    title: "One Way In, One Way Out",
    body: "I acknowledge that the campground has a single access road and agree to follow all directional instructions provided by management. No unauthorized vehicles may block access.",
  },
  {
    title: "Camping Disclaimer",
    body: "I acknowledge that camping and outdoor activities involve natural risks including uneven terrain, wildlife, weather, water hazards, and fire. I represent that I am physically capable of participating in outdoor camping activities and that I and my guests participate voluntarily at our own risk.",
  },
  {
    title: "Community Atmosphere",
    body: "Shabbos Village is intended to maintain a calm, respectful, family-friendly, and Shabbos-observant environment. I agree to observe all Shabbos guidelines and campground rules during my stay.",
  },
  {
    title: "Governing Law",
    body: "This agreement shall be governed by the laws of the state in which the property is located. If any provision of this agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
  },
];

export default function WaiverPage() {
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
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>Legal</p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Hold Harmless Agreement
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,40px)" }}>

        {/* Intro */}
        <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a", borderLeft: "2px solid #D4A853", paddingLeft: "20px", marginBottom: "56px" }}>
          By completing a reservation at Shabbos Village, you acknowledge that you have read and agree to the following terms on behalf of yourself and all members of your party.
        </p>

        {/* Waiver sections */}
        <div style={{ marginBottom: "56px" }}>
          {waiverSections.map((s, i) => (
            <div key={s.title} style={{ display: "flex", gap: "28px", alignItems: "flex-start", padding: "28px 0", borderBottom: i < waiverSections.length - 1 ? "1px solid #EDE4D3" : "none" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontStyle: "italic", color: "#D4A853", minWidth: "24px", paddingTop: "3px", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 700, color: "#2D5016", marginBottom: "10px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#4a4a3a", margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Acknowledgement note */}
        <div style={{ borderTop: "2px solid #2D5016", paddingTop: "28px", marginBottom: "48px" }}>
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1a12", lineHeight: 1.7, margin: 0 }}>
            This agreement is acknowledged electronically at the time of booking. Your typed name and checkbox confirmation during checkout constitute a legally binding electronic signature under the ESIGN Act.
          </p>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: "#F8F3E9", border: "1px solid #EDE4D3", borderRadius: "4px", padding: "clamp(24px,4vw,40px)", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "12px" }}>
            Ready to book?
          </p>
          <p style={{ fontSize: "0.95rem", color: "#4a4a3a", lineHeight: 1.7, marginBottom: "28px" }}>
            You&apos;ll sign this agreement as part of the checkout process — no separate form needed.
          </p>
          <Link
            href="/book"
            style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "14px 40px", borderRadius: "3px", textDecoration: "none" }}
          >
            Reserve & Sign at Checkout →
          </Link>
        </div>

      </div>
    </div>
  );
}
