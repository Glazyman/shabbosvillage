import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    title: "General Rules",
    items: [
      "Respect quiet hours: 10:00 PM Friday through Havdalah on Saturday night",
      "Keep the campground clean — dispose of garbage in designated bins",
      "No loud music, amplified sound, or disruptive behavior at any time",
      "Children must be supervised at all times, especially near the creek",
      "No dangerous or unsafe activity on campground property",
      "Respect nature and all campground property",
      "Follow all posted signs and staff instructions",
      "One way in, one way out — do not block the access road",
    ],
  },
  {
    title: "Shabbos Guidelines",
    items: [
      "Shabbos candles may only be lit in designated safe areas",
      "No vehicles may enter or exit from Shabbos start until Havdalah",
      "All guests are expected to observe and respect Shabbos",
      "No electronic noise during Shabbos hours",
      "Communal Shabbos meals are encouraged in the gathering area",
    ],
  },
  {
    title: "Fire Safety",
    items: [
      "Campfires permitted in designated fire rings only",
      "No open fires outside designated areas",
      "Never leave a fire unattended",
      "Fully extinguish all fires before sleeping or leaving your site",
      "Do not burn garbage or plastics",
    ],
  },
  {
    title: "Parking & Access",
    items: [
      "Park only in designated parking areas",
      "Maximum 2 vehicles per site unless pre-arranged",
      "Do not park on grass or near fire rings",
      "Emergency access must be kept clear at all times",
    ],
  },
];

export default function RulesPage() {
  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "50vh", minHeight: "380px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=85"
          alt="Campground setting"
          fill
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,8,0.4) 0%, rgba(10,20,8,0.72) 100%)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
            Community Guidelines
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Rules & Safety
          </h1>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(24px,5vw,60px) 0" }}>
        <div style={{ borderLeft: "3px solid #D4A853", paddingLeft: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 700, color: "#1a1a12", marginBottom: "16px" }}>
            Camping Disclaimer
          </h2>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "#4a4a3a", marginBottom: "14px" }}>
            Camping and outdoor activities involve natural risks — uneven terrain, wildlife, weather conditions, water areas, and other outdoor hazards. By entering the property, guests acknowledge they are participating voluntarily and assume responsibility for their own safety and the safety of their party.
          </p>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "#4a4a3a" }}>
            All guests are required to review and agree to the liability waiver before entry.{" "}
            <Link href="/waiver" style={{ color: "#2D5016", fontWeight: 600, textDecoration: "underline" }}>
              View & sign waiver →
            </Link>
          </p>
        </div>
      </section>

      {/* ── RULES SECTIONS ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(24px,5vw,60px)" }}>
        {sections.map((section, si) => (
          <div key={section.title} style={{ marginBottom: si < sections.length - 1 ? "clamp(48px,7vw,80px)" : "0" }}>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", paddingBottom: "20px", borderBottom: "2px solid #EDE4D3" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem,4vw,3.5rem)", fontWeight: 800, color: "transparent", WebkitTextStroke: "1px #D4A853", lineHeight: 1, userSelect: "none", flexShrink: 0 }}>
                {String(si + 1).padStart(2, "0")}
              </span>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.1rem,3vw,1.5rem)", fontWeight: 700, color: "#1a1a12", margin: 0 }}>
                {section.title}
              </h2>
            </div>
            {/* Items */}
            <div>
              {section.items.map((item, i) => (
                <div key={item} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderBottom: i < section.items.length - 1 ? "1px solid #EDE4D3" : "none" }}>
                  <span style={{ color: "#D4A853", fontSize: "0.5rem", marginTop: "7px", flexShrink: 0 }}>◆</span>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#3a3a2a", margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── COMMUNITY NOTE ── */}
      <section className="cta-section" style={{ backgroundColor: "#1a2a0f", padding: "clamp(48px,7vw,100px) clamp(24px,5vw,60px)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "24px" }}>
            Our Commitment
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.25, marginBottom: "24px", letterSpacing: "-0.01em" }}>
            A calm, respectful, family-friendly environment.
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(253,250,245,0.75)", marginBottom: "16px" }}>
            Management reserves the right to cancel reservations that disrupt the atmosphere or violate campground rules. We keep the tone respectful — because we all want the same thing: a peaceful Shabbos in nature.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "40px", flexWrap: "wrap" }}>
            <Link href="/waiver" style={{ display: "inline-block", backgroundColor: "#D4A853", color: "#1a2a0f", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "3px", textDecoration: "none" }}>
              Sign Waiver
            </Link>
            <Link href="/book" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", fontWeight: 500, fontSize: "0.88rem", padding: "13px 32px", borderRadius: "3px", textDecoration: "none" }}>
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
