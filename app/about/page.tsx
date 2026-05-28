import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "70vh", minHeight: "500px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1920&q=85"
          alt="Camping tents in nature"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,8,0.5) 0%, rgba(10,20,8,0.65) 100%)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
            About
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: "700px" }}>
            A Shabbos Like<br />You&apos;ve Never Had
          </h1>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="pg-section" style={{ padding: "clamp(56px,8vw,120px) clamp(24px,5vw,60px)", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="editorial-grid">
          <div className="editorial-num">
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "24px" }}>
              Our Mission
            </p>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(5rem, 12vw, 9rem)", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px #EDE4D3", userSelect: "none" }}>
              01
            </div>
          </div>
          <div style={{ paddingTop: "12px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#1a1a12", lineHeight: 1.25, marginBottom: "32px", letterSpacing: "-0.01em" }}>
              Shabbos Village was created for people looking to experience a peaceful and meaningful Shabbos in nature.
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#4a4a3a", marginBottom: "20px", borderLeft: "2px solid #D4A853", paddingLeft: "20px" }}>
              Our goal is simple: create a calm campground community where families, friends, and individuals can disconnect from the pressure of daily life and reconnect with simplicity, nature, and each other.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#6b6b55" }}>
              Whether you come for rest, reflection, community, or simply fresh air and quiet surroundings — Shabbos Village is designed to feel peaceful, simple, and welcoming.
            </p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: "1px solid #EDE4D3", margin: "0 clamp(24px,5vw,60px)" }} />

      {/* ── WHAT TO EXPECT ── */}
      <section className="pg-section" style={{ padding: "clamp(56px,8vw,120px) clamp(24px,5vw,60px)", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="editorial-grid">
          <div className="editorial-num">
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "24px" }}>
              The Experience
            </p>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(5rem, 12vw, 9rem)", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px #EDE4D3", userSelect: "none" }}>
              02
            </div>
          </div>
          <div style={{ paddingTop: "12px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1a1a12", lineHeight: 1.25, marginBottom: "48px", letterSpacing: "-0.01em" }}>
              What&apos;s waiting for you
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { title: "Wooded tent camping", desc: "Peaceful forested sites with shade, privacy, and the sound of nature." },
                { title: "Creek access", desc: "A gentle creek runs through the property — the perfect Shabbos backdrop." },
                { title: "Showers & toilets", desc: "Clean, central facilities maintained for all guests." },
                { title: "Electric hookups", desc: "Available at select sites for an additional fee." },
                { title: "Water stations", desc: "Central water access throughout the property." },
                { title: "Gathering areas", desc: "Communal spaces for shared meals, conversation, and connection." },
              ].map((item, i) => (
                <div key={item.title} style={{ display: "flex", gap: "32px", alignItems: "flex-start", padding: "28px 0", borderBottom: i < 5 ? "1px solid #EDE4D3" : "none" }}>
                  <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontStyle: "italic", color: "#D4A853", minWidth: "24px", paddingTop: "2px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#2D5016", marginBottom: "6px" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.92rem", color: "#6b6b55", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO BREAK ── */}
      <section style={{ position: "relative", height: "460px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1920&q=85"
          alt="Tent under stars at night"
          fill
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,20,8,0.55)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 40px" }}>
          <blockquote style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 4vw, 2.8rem)", fontStyle: "italic", color: "#ffffff", lineHeight: 1.45, marginBottom: "16px" }}>
              &ldquo;Disconnect from the noise.<br />Reconnect with Shabbos.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── GROUPS ── */}
      <section className="pg-section" style={{ padding: "clamp(56px,8vw,120px) clamp(24px,5vw,60px)", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="editorial-grid">
          <div className="editorial-num">
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "24px" }}>
              Beyond Shabbos
            </p>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(5rem, 12vw, 9rem)", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px #EDE4D3", userSelect: "none" }}>
              03
            </div>
          </div>
          <div style={{ paddingTop: "12px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1a1a12", lineHeight: 1.25, marginBottom: "28px", letterSpacing: "-0.01em" }}>
              Groups, events & private rentals
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#4a4a3a", marginBottom: "28px" }}>
              We rent the entire park exclusively for groups, camps, and organizations. Day camps, overnight trips, yoga retreats, lectures, organizational get-togethers — the space is yours.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#6b6b55", marginBottom: "48px" }}>
              There are communal gathering areas where groups can sit together and make meaningful memories away from the city.
            </p>
            <Link href="/book" style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.05em", padding: "14px 32px", borderRadius: "3px", textDecoration: "none" }}>
              Inquire About Group Booking
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" style={{ backgroundColor: "#1a2a0f", padding: "clamp(48px,7vw,100px) clamp(24px,5vw,60px)", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4A853", marginBottom: "20px" }}>
          Ready to come?
        </p>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          Book your Shabbos today.
        </h2>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/book" style={{ display: "inline-block", backgroundColor: "#D4A853", color: "#1a2a0f", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", padding: "15px 40px", borderRadius: "3px", textDecoration: "none" }}>
            Reserve Now
          </Link>
          <Link href="/faq" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", fontWeight: 500, fontSize: "0.9rem", padding: "15px 40px", borderRadius: "3px", textDecoration: "none" }}>
            Read the FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
