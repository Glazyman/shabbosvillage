import Link from "next/link";

const amenities = [
  { icon: "⛺", label: "Tent Camping" },
  { icon: "⚡", label: "Electric Hookups" },
  { icon: "🚿", label: "Toilets & Showers" },
  { icon: "💧", label: "Water Stations" },
  { icon: "🌊", label: "Creek Access" },
  { icon: "🌳", label: "Nature Trails" },
  { icon: "🔥", label: "Gathering Areas" },
  { icon: "🏕️", label: "Family-Friendly" },
];

const steps = [
  {
    n: "01",
    title: "Reserve Your Spot",
    desc: "Choose your Shabbos dates, number of guests, and site type — all online in minutes.",
  },
  {
    n: "02",
    title: "Arrive & Set Up",
    desc: "Follow the directions we send you. One way in, one way out. Simple and safe.",
  },
  {
    n: "03",
    title: "Enjoy Shabbos in Nature",
    desc: "Relax, disconnect from the noise, and reconnect with community and Shabbos.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, #0e2209 0%, #1a3a0f 35%, #2D5016 60%, #3d6b22 100%)",
        }}
      >
        {/* Decorative tree silhouettes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='900' viewBox='0 0 1440 900'%3E%3Cg opacity='0.12' fill='%23ffffff'%3E%3Cpolygon points='0,800 60,600 120,800'/%3E%3Cpolygon points='40,800 110,550 180,800'/%3E%3Cpolygon points='80,800 160,480 240,800'/%3E%3Cpolygon points='1200,800 1260,610 1320,800'/%3E%3Cpolygon points='1260,800 1330,560 1400,800'/%3E%3Cpolygon points='1310,800 1375,500 1440,800'/%3E%3Cpolygon points='600,800 660,620 720,800'/%3E%3Cpolygon points='700,800 765,540 830,800'/%3E%3C/g%3E%3Crect x='0' y='790' width='1440' height='110' fill='%23000' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        />

        {/* Stars */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Ccircle cx='50' cy='80' r='1.5' fill='white' opacity='0.6'/%3E%3Ccircle cx='150' cy='40' r='1' fill='white' opacity='0.4'/%3E%3Ccircle cx='280' cy='100' r='2' fill='white' opacity='0.5'/%3E%3Ccircle cx='420' cy='60' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='580' cy='30' r='1' fill='white' opacity='0.4'/%3E%3Ccircle cx='700' cy='90' r='1.8' fill='white' opacity='0.6'/%3E%3Ccircle cx='760' cy='50' r='1.2' fill='white' opacity='0.5'/%3E%3Ccircle cx='100' cy='200' r='1' fill='white' opacity='0.3'/%3E%3Ccircle cx='350' cy='150' r='1.5' fill='white' opacity='0.5'/%3E%3Ccircle cx='620' cy='170' r='1' fill='white' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Warm lantern glow */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(212,168,83,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "800px",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "inline-block",
              border: "1px solid rgba(212,168,83,0.5)",
              color: "#D4A853",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "7px 20px",
              borderRadius: "9999px",
              marginBottom: "28px",
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(212,168,83,0.1)",
            }}
          >
            ✦ Shabbos in Nature ✦
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 700,
              color: "#FDFAF5",
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Where Shabbos Meets
            <br />
            <em style={{ color: "#D4A853", fontStyle: "italic" }}>the Wild</em>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(253,250,245,0.82)",
              lineHeight: 1.8,
              marginBottom: "44px",
              maxWidth: "560px",
              margin: "0 auto 44px",
            }}
          >
            Tent camping in a peaceful wooded setting. Creek access, communal
            gathering areas, and a calm, family-friendly atmosphere — all for
            an unforgettable Shabbos.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }}>
              Reserve Your Spot →
            </Link>
            <Link href="/about" className="btn-secondary"
              style={{
                color: "rgba(253,250,245,0.9)",
                borderColor: "rgba(253,250,245,0.4)",
                fontSize: "1rem",
                padding: "14px 38px",
              }}>
              Learn More
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
          }}
        >
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
                  fill="#FDFAF5"/>
          </svg>
        </div>
      </section>

      {/* ── AMENITIES RIBBON ── */}
      <section style={{ backgroundColor: "#FDFAF5", padding: "60px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "16px",
            }}
          >
            {amenities.map((a) => (
              <div
                key={a.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "24px 16px",
                  backgroundColor: "#F8F3E9",
                  borderRadius: "16px",
                  border: "1px solid #EDE4D3",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{a.icon}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2D5016", textAlign: "center" }}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VISION ── */}
      <section style={{ padding: "100px 24px", backgroundColor: "#F8F3E9" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div>
            <span className="section-tag">Our Story</span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2D5016",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              A Shabbos Like
              <br />You&apos;ve Never Had
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#4a4a3a", marginBottom: "20px" }}>
              Shabbos Village was created for people looking to experience a peaceful
              and meaningful Shabbos in nature. Our goal is simple: create a calm
              campground community where families, friends, and individuals can
              disconnect from the pressure of daily life and reconnect with
              simplicity, nature, and each other.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#4a4a3a", marginBottom: "36px" }}>
              Whether you come for rest, reflection, community, or simply fresh air
              and quiet surroundings — Shabbos Village is designed to feel peaceful,
              simple, and welcoming.
            </p>
            <Link href="/about" className="btn-secondary">
              Read Our Story
            </Link>
          </div>

          {/* Visual card */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                backgroundColor: "#2D5016",
                borderRadius: "24px",
                padding: "48px 40px",
                color: "#F8F3E9",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background decoration */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(212,168,83,0.1)",
                }}
              />
              <blockquote
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  marginBottom: "32px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                &ldquo;Disconnect from the noise. Reconnect with nature, community, and Shabbos.&rdquo;
              </blockquote>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "24px" }}>
                {[
                  "Calm, family-friendly environment",
                  "Quiet & respectful setting",
                  "Open for groups & private events",
                  "Available for camps & organizations",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ color: "#D4A853", fontSize: "0.7rem" }}>✦</span>
                    <span style={{ fontSize: "0.95rem", color: "rgba(248,243,233,0.85)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating offset card */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                backgroundColor: "#D4A853",
                borderRadius: "16px",
                padding: "20px 24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#2D5016" }}>
                100%
              </p>
              <p style={{ fontSize: "0.8rem", color: "#2D5016", fontWeight: 600 }}>
                Shabbos Friendly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "100px 24px", backgroundColor: "#FDFAF5" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-tag">Simple Process</span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#2D5016",
                marginTop: "4px",
              }}
            >
              Three Steps to Shabbos
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  backgroundColor: i === 1 ? "#2D5016" : "#F8F3E9",
                  color: i === 1 ? "#F8F3E9" : "#1e1e1e",
                  borderRadius: "24px",
                  padding: "44px 36px",
                  border: i !== 1 ? "1px solid #EDE4D3" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "5rem",
                    fontWeight: 800,
                    color: i === 1 ? "rgba(212,168,83,0.2)" : "rgba(45,80,22,0.08)",
                    position: "absolute",
                    top: "-10px",
                    right: "24px",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: i === 1 ? "#D4A853" : "#2D5016",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: i === 1 ? "#2D5016" : "#F8F3E9",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    color: i === 1 ? "#F8F3E9" : "#2D5016",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUP / EVENTS SECTION ── */}
      <section
        style={{
          padding: "100px 24px",
          background: "linear-gradient(135deg, #EDE4D3 0%, #F8F3E9 100%)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-tag">More Than Shabbos</span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#2D5016",
                marginTop: "4px",
              }}
            >
              Events & Group Stays
            </h2>
            <p style={{ fontSize: "1rem", color: "#6b6b55", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
              We rent the entire park for groups, camps, organizations, and private events.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              { icon: "🏕️", title: "Private Group Bookings", desc: "Reserve the entire village for your group or organization." },
              { icon: "🍖", title: "Camps & Cookouts", desc: "Perfect for day camps, sleepover nights, and outdoor group meals." },
              { icon: "🧘", title: "Retreats & Events", desc: "Yoga, lectures, get-togethers, and facilitated gatherings in nature." },
              { icon: "🎉", title: "Special Occasions", desc: "Celebrate milestones surrounded by trees, creek, and community." },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  backgroundColor: "#FDFAF5",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  border: "1px solid #EDE4D3",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#2D5016",
                    marginBottom: "8px",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#6b6b55" }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/book" className="btn-primary">
              Inquire About Group Booking
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #2D5016 0%, #1a3a0f 100%)",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <circle cx="400" cy="100" r="300" stroke="white" strokeWidth="1"/>
            <circle cx="400" cy="100" r="200" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "#D4A853", fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.8rem",
                      textTransform: "uppercase", marginBottom: "16px" }}>
            ✦ Limited Spots Available ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#FDFAF5",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Ready for Your Shabbos Escape?
          </h2>
          <p style={{ color: "rgba(253,250,245,0.8)", fontSize: "1.05rem", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
            Book your dates, bring your family, and experience Shabbos the way it was meant to be.
          </p>
          <Link href="/book" className="btn-primary"
            style={{ backgroundColor: "#D4A853", color: "#2D5016", fontSize: "1.05rem", padding: "18px 48px" }}>
            Book Your Shabbos →
          </Link>
        </div>
      </section>
    </>
  );
}
