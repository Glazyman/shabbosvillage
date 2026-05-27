import Link from "next/link";

const generalRules = [
  "Respect quiet hours: 10:00 PM Friday through Havdalah on Saturday night",
  "Keep the campground clean — dispose of garbage in designated bins",
  "No loud music, amplified sound, or disruptive behavior at any time",
  "Children must be supervised at all times, especially near the creek and water areas",
  "No dangerous or unsafe activity on campground property",
  "Respect nature and all campground property — leave it better than you found it",
  "Follow all posted signs and instructions from campground staff",
  "One way in, one way out — do not block the access road",
];

const fireRules = [
  "Campfires permitted in designated fire rings only",
  "No open fires outside designated areas",
  "Never leave a fire unattended",
  "Fully extinguish all fires before sleeping or leaving your site",
  "Do not burn garbage or plastics",
  "Keep fire extinguisher accessible at all times",
];

const shabbosRules = [
  "Shabbos candles may only be lit in designated safe areas",
  "No vehicles may enter or exit from Shabbos start until Havdalah",
  "All guests are expected to observe and respect Shabbos",
  "No electronic noise during Shabbos hours",
  "Communal Shabbos meals are encouraged in the gathering area",
];

const parkingRules = [
  "Park only in designated parking areas",
  "Maximum 2 vehicles per site unless pre-arranged",
  "Do not park on grass or near fire rings",
  "Emergency access must be kept clear at all times",
  "Arrival and departure times must be observed as communicated",
];

export default function RulesPage() {
  return (
    <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "100px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #2D5016 0%, #1a3a0f 100%)",
                    padding: "60px 24px 80px", textAlign: "center" }}>
        <span className="section-tag" style={{ color: "#D4A853", backgroundColor: "rgba(212,168,83,0.1)" }}>
          Community Guidelines
        </span>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
                     fontWeight: 700, color: "#FDFAF5", marginTop: "8px" }}>
          Rules & Safety
        </h1>
        <p style={{ color: "rgba(253,250,245,0.75)", marginTop: "12px", maxWidth: "520px", margin: "12px auto 0" }}>
          To help maintain a peaceful and respectful environment for all guests,
          we ask everyone to follow these simple guidelines.
        </p>
      </div>

      <div style={{ maxWidth: "860px", margin: "-40px auto 80px", padding: "0 24px" }}>

        {/* Disclaimer card */}
        <div
          style={{
            backgroundColor: "#fff8e8",
            border: "1.5px solid #D4A853",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "32px",
            boxShadow: "0 4px 20px rgba(212,168,83,0.15)",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 700,
                       color: "#8B5E3C", marginBottom: "14px" }}>
            Camping Disclaimer
          </h2>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#5a3a10", marginBottom: "12px" }}>
            Camping and outdoor activities involve natural risks, including uneven terrain, wildlife,
            weather conditions, water areas, and other outdoor hazards.
          </p>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#5a3a10", marginBottom: "12px" }}>
            By entering the property, guests acknowledge that they are participating voluntarily and
            assume responsibility for their own safety and the safety of their family and guests.
          </p>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#5a3a10" }}>
            All guests are required to review and agree to the liability waiver before entry.{" "}
            <Link href="/waiver" style={{ color: "#8B5E3C", fontWeight: 700, textDecoration: "underline" }}>
              View & Sign Waiver →
            </Link>
          </p>
        </div>

        <div style={{ display: "grid", gap: "24px" }}>
          <RuleCard title="General Rules" icon="📋" rules={generalRules} color="#2D5016" />
          <RuleCard title="Shabbos Guidelines" icon="🕯️" rules={shabbosRules} color="#8B5E3C" />
          <RuleCard title="Fire Safety" icon="🔥" rules={fireRules} color="#c0392b" />
          <RuleCard title="Parking & Access" icon="🚗" rules={parkingRules} color="#2D5016" />
        </div>

        {/* Community atmosphere */}
        <div
          style={{
            backgroundColor: "#2D5016",
            borderRadius: "20px",
            padding: "40px",
            marginTop: "32px",
            color: "#F8F3E9",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "16px" }}>
            Community Atmosphere
          </h2>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "rgba(248,243,233,0.85)", marginBottom: "16px" }}>
            Shabbos Village is intended to maintain a calm, respectful, family-friendly environment.
            Management reserves the right to refuse or cancel reservations that disrupt the atmosphere
            or violate campground rules — without refund.
          </p>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "rgba(248,243,233,0.85)" }}>
            We keep the tone respectful, not aggressive. Most guests find the rules natural and easy
            to follow — because we all want the same thing: a peaceful, meaningful Shabbos in nature.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/waiver" className="btn-primary"
              style={{ backgroundColor: "#D4A853", color: "#2D5016" }}>
              Sign Waiver
            </Link>
            <Link href="/book" className="btn-secondary"
              style={{ color: "#F8F3E9", borderColor: "rgba(248,243,233,0.4)" }}>
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleCard({
  title, icon, rules, color,
}: {
  title: string;
  icon: string;
  rules: string[];
  color: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#FDFAF5",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #EDE4D3",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>{icon}</span>
        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem",
                     fontWeight: 700, color: "#F8F3E9" }}>{title}</h3>
      </div>
      <ul style={{ padding: "24px 28px", listStyle: "none", margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        {rules.map((rule) => (
          <li key={rule} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ color, flexShrink: 0, fontSize: "0.8rem", marginTop: "4px" }}>✦</span>
            <span style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#3a3a2a" }}>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
