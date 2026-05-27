import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "100px" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #0e2209 0%, #1a3a0f 40%, #2D5016 100%)",
          padding: "80px 24px 120px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#FDFAF5"/>
          </svg>
        </div>
        <span className="section-tag" style={{ color: "#D4A853", backgroundColor: "rgba(212,168,83,0.1)" }}>
          Our Story
        </span>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem, 5vw, 4rem)",
                     fontWeight: 700, color: "#FDFAF5", marginTop: "12px", lineHeight: 1.2 }}>
          About Shabbos Village
        </h1>
        <p style={{ color: "rgba(253,250,245,0.8)", marginTop: "20px", fontSize: "1.1rem",
                    maxWidth: "580px", margin: "20px auto 0", lineHeight: 1.75 }}>
          A peaceful Shabbos camping experience created for people who want to reconnect
          with nature, community, and the day of rest.
        </p>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>

        {/* Mission */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          <div>
            <span className="section-tag">Our Mission</span>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                         fontWeight: 700, color: "#2D5016", marginTop: "4px", marginBottom: "20px", lineHeight: 1.25 }}>
              Shabbos the Way It Was Meant to Be
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a", marginBottom: "18px" }}>
              Shabbos Village was created for people looking to experience a peaceful and meaningful
              Shabbos in nature. Our goal is simple: create a calm campground community where families,
              friends, and individuals can disconnect from the pressure of daily life and reconnect with
              simplicity, nature, and each other.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a" }}>
              Whether you come for rest, reflection, community, or simply fresh air and quiet
              surroundings — Shabbos Village is designed to feel peaceful, simple, and welcoming.
              &ldquo;Ahhh... I wanna be there.&rdquo; That&apos;s the feeling we&apos;re creating.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                backgroundColor: "#EDE4D3",
                borderRadius: "24px",
                height: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Nature illustration */}
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", padding: "20px" }}>
                {/* Moon */}
                <circle cx="340" cy="50" r="30" fill="#D4A853" opacity="0.4"/>
                {/* Stars */}
                <circle cx="60" cy="40" r="2" fill="#2D5016" opacity="0.4"/>
                <circle cx="160" cy="25" r="1.5" fill="#2D5016" opacity="0.3"/>
                <circle cx="250" cy="60" r="2" fill="#2D5016" opacity="0.4"/>
                {/* Trees */}
                <polygon points="20,220 60,120 100,220" fill="#2D5016" opacity="0.7"/>
                <polygon points="50,220 100,100 150,220" fill="#2D5016" opacity="0.9"/>
                <polygon points="280,220 330,110 380,220" fill="#2D5016" opacity="0.7"/>
                <polygon points="310,220 360,90 410,220" fill="#2D5016" opacity="0.5"/>
                {/* Ground */}
                <rect x="0" y="215" width="400" height="85" fill="#4A7C59" opacity="0.3" rx="4"/>
                {/* Tent */}
                <polygon points="160,215 200,155 240,215" fill="#8B5E3C"/>
                <polygon points="175,215 200,165 225,215" fill="#6B4226"/>
                <rect x="190" y="195" width="20" height="20" fill="#1a3a0f"/>
                {/* String lights */}
                <polyline points="80,140 130,155 180,140 230,155 280,140" stroke="#D4A853" strokeWidth="1.5" fill="none" opacity="0.7"/>
                <circle cx="130" cy="155" r="3" fill="#D4A853" opacity="0.8"/>
                <circle cx="230" cy="155" r="3" fill="#D4A853" opacity="0.8"/>
                <circle cx="180" cy="140" r="3" fill="#D4A853" opacity="0.8"/>
                {/* Creek */}
                <path d="M0 260 Q100 250 200 260 Q300 270 400 260" stroke="#4A7C59" strokeWidth="8" fill="none" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div style={{ marginBottom: "100px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-tag">The Experience</span>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                         fontWeight: 700, color: "#2D5016", marginTop: "4px" }}>
              What&apos;s Waiting For You
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {[
              { icon: "🌳", title: "Wooded Setting", desc: "Peaceful forested campsites surrounded by nature. Shade, privacy, and beauty." },
              { icon: "🌊", title: "Creek Access", desc: "A gentle creek runs through the property — the perfect backdrop for Shabbos." },
              { icon: "🕯️", title: "Shabbos Atmosphere", desc: "100% Shabbos-observant setting. No traffic, no electronics, just peace." },
              { icon: "👨‍👩‍👧‍👦", title: "Community", desc: "Shared gathering areas, communal meals, and a warm, welcoming community." },
              { icon: "🚿", title: "Real Amenities", desc: "Clean toilets, showers, water stations, and electric hookups available." },
              { icon: "🔥", title: "Campfires", desc: "Designated fire ring areas for evening gatherings and s&apos;mores." },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#F8F3E9",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  border: "1px solid #EDE4D3",
                }}
              >
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "14px" }}>{f.icon}</span>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: 700,
                             color: "#2D5016", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#6b6b55" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Groups & Events */}
        <div
          style={{
            background: "linear-gradient(135deg, #EDE4D3 0%, #F8F3E9 100%)",
            borderRadius: "28px",
            padding: "60px 48px",
            marginBottom: "60px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            <div>
              <span className="section-tag">Beyond Shabbos</span>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 700,
                           color: "#2D5016", marginTop: "4px", marginBottom: "18px" }}>
                Groups, Events & More
              </h2>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#4a4a3a", marginBottom: "20px" }}>
                Beyond Shabbos stays, we rent out the entire park for groups and organizations.
                We&apos;re open to camps for cookouts or sleepovers during the week, yoga events,
                lectures, get-togethers, facilitated programs, and more.
              </p>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#4a4a3a" }}>
                There are communal areas where groups can sit together, plan activities, and make
                meaningful memories outside the city.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Exclusive full-park group rentals",
                "Day camp cookouts & overnight trips",
                "Yoga, wellness & retreat events",
                "Lectures & educational programs",
                "Organizational gatherings",
                "Private celebrations",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#2D5016",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, fontSize: "0.7rem", color: "#F8F3E9" }}>✓</div>
                  <span style={{ fontSize: "0.95rem", color: "#3a3a2a" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 700,
                       color: "#2D5016", marginBottom: "12px" }}>
            Ready to Experience It?
          </h2>
          <p style={{ color: "#6b6b55", marginBottom: "32px", fontSize: "1rem" }}>
            Reserve your Shabbos dates today. Simple, easy, and fully online.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" className="btn-primary">Reserve Your Spot →</Link>
            <Link href="/faq" className="btn-secondary">Read the FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
