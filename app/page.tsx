import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* ── HERO — real photo background ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "700px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Photo */}
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=85"
          alt="Tent camping in nature"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        {/* Gradient overlay — darker at bottom so text reads clearly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,20,8,0.45) 0%, rgba(10,20,8,0.35) 50%, rgba(10,20,8,0.72) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "860px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "28px",
            }}
          >
            Shabbos Village
          </p>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
            }}
          >
            Shabbos,
            <br />
            <em style={{ fontStyle: "italic", color: "#D4A853" }}>as it should be.</em>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.75,
              marginBottom: "48px",
              maxWidth: "480px",
              margin: "0 auto 48px",
            }}
          >
            Tent camping in a peaceful wooded setting. Creek access,
            communal atmosphere, and a Shabbos you&apos;ll never forget.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                backgroundColor: "#2D5016",
                color: "#FDFAF5",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.04em",
                padding: "15px 36px",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Reserve Your Spot
            </Link>
            <Link
              href="/about"
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.5)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                fontSize: "0.95rem",
                padding: "15px 36px",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.3)" }} />
        </div>
      </section>

      {/* ── AMENITIES STRIP ── */}
      <section style={{ backgroundColor: "#2D5016", padding: "18px 0" }}>
        <div
          className="amenity-strip"
          style={{
            display: "flex",
            gap: "clamp(16px, 2vw, 28px)",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 clamp(16px, 3vw, 40px)",
            overflowX: "auto",
            flexWrap: "nowrap",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {[
            "Tent Camping",
            "Electric Hookups",
            "Showers & Toilets",
            "Creek Access",
            "Nature Trails",
            "Communal Gathering",
            "Family Friendly",
            "Water Stations",
            "Motzei Shabbos Food Court",
            "6 Minyonim Within Walking Distance",
          ].map((item, i, arr) => (
            <span
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "rgba(253,250,245,0.85)",
                fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {item}
              {i < arr.length - 1 && (
                <span style={{ color: "#D4A853", fontSize: "0.5rem" }}>◆</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL INTRO ── */}
      <section style={{ backgroundColor: "#FDFAF5", padding: "clamp(56px,8vw,120px) clamp(24px,5vw,60px)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8B5E3C",
              marginBottom: "28px",
            }}
          >
            About Shabbos Village
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              color: "#1a1a12",
              lineHeight: 1.2,
              marginBottom: "32px",
              letterSpacing: "-0.01em",
            }}
          >
            Disconnect from the noise.
            Reconnect with nature,
            community, and Shabbos.
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "#4a4a3a",
              marginBottom: "24px",
              borderLeft: "2px solid #D4A853",
              paddingLeft: "20px",
            }}
          >
            Shabbos Village is a peaceful campground created for families,
            friends, and individuals who want a truly meaningful Shabbos
            in nature — tent camping, creek access, communal areas, and
            a calm, respectful atmosphere.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#6b6b55" }}>
            Whether you come for rest, reflection, or simply fresh air —
            you belong here. One way in, one way out. Simple as that.
          </p>
        </div>
      </section>

      {/* ── PHOTO + STEPS ── */}
      <section style={{ backgroundColor: "#F8F3E9" }}>
        <div
          className="split-grid"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Photo */}
          <div
            className="split-photo"
            style={{
              position: "relative",
              height: "600px",
              overflow: "hidden",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=900&q=85"
              alt="Tent in forest"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Steps */}
          <div
            className="split-content"
            style={{
              padding: "clamp(40px,6vw,80px) clamp(24px,5vw,60px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8B5E3C",
                marginBottom: "40px",
              }}
            >
              How It Works
            </p>

            {[
              { n: "I", title: "Reserve Your Spot", desc: "Choose your Shabbos dates online. Name, guests, vehicles — done in minutes." },
              { n: "II", title: "Arrive & Set Up", desc: "We send you directions. One way in, one way out. Arrive before Shabbos." },
              { n: "III", title: "Enjoy Shabbos", desc: "Unplug. Breathe. Relax with your family and community in nature." },
            ].map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  gap: "28px",
                  paddingBottom: i < 2 ? "40px" : "0",
                  marginBottom: i < 2 ? "40px" : "0",
                  borderBottom: i < 2 ? "1px solid #EDE4D3" : "none",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "#D4A853",
                    minWidth: "28px",
                    paddingTop: "3px",
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#2D5016",
                      marginBottom: "8px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#6b6b55" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/book"
              style={{
                display: "inline-block",
                marginTop: "48px",
                backgroundColor: "#2D5016",
                color: "#FDFAF5",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                padding: "14px 32px",
                borderRadius: "4px",
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Book a Stay
            </Link>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH PHOTO QUOTE ── */}
      <section style={{ position: "relative", height: "500px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1920&q=85"
          alt="Camping at night with stars"
          fill
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,20,8,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 24px" }}>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                fontStyle: "italic",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.45,
                marginBottom: "20px",
              }}
            >
              &ldquo;Ahhh... I wanna be there.&rdquo;
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              That&apos;s the feeling we&apos;re creating
            </p>
          </div>
        </div>
      </section>

      {/* ── GROUPS & EVENTS — editorial grid ── */}
      <section style={{ backgroundColor: "#FDFAF5", padding: "clamp(56px,8vw,120px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "64px",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#8B5E3C",
                  marginBottom: "12px",
                }}
              >
                Beyond Shabbos
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "#1a1a12",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Groups, Events
                <br />& Private Rentals
              </h2>
            </div>
            <Link
              href="/book"
              style={{
                color: "#2D5016",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                borderBottom: "1px solid #2D5016",
                paddingBottom: "2px",
                whiteSpace: "nowrap",
              }}
            >
              Inquire now →
            </Link>
          </div>

          <div
            className="events-grid"
            style={{ backgroundColor: "#EDE4D3", border: "1px solid #EDE4D3" }}
          >
            {[
              { title: "Private Group Bookings", desc: "Reserve the entire village exclusively for your group or organization — full privacy, full peace." },
              { title: "Camps & Cookouts", desc: "Perfect for day camps looking to do a cookout or sleepover in nature during the week." },
              { title: "Retreats & Wellness", desc: "Yoga sessions, lectures, get-togethers, and facilitated programs in a natural setting." },
              { title: "Special Events", desc: "Celebrate milestones, host gatherings, and create lasting memories outdoors." },
            ].map((card, i) => (
              <div
                key={card.title}
                style={{
                  backgroundColor: "#FDFAF5",
                  padding: "clamp(28px,4vw,48px) clamp(20px,3.5vw,44px)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#D4A853",
                    marginBottom: "16px",
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#1a1a12",
                    marginBottom: "14px",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#6b6b55" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOTZEI SHABBOS FOOD COURT ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div
          className="split-grid"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Content */}
          <div
            className="split-content"
            style={{
              padding: "clamp(48px,7vw,96px) clamp(24px,5vw,60px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#FDFAF5",
            }}
          >
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "20px" }}>
              Motzei Shabbos
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#1a1a12", lineHeight: 1.2, marginBottom: "24px", letterSpacing: "-0.01em" }}>
              When Shabbos ends,
              <br />the fun begins.
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a", marginBottom: "16px", borderLeft: "2px solid #D4A853", paddingLeft: "20px" }}>
              On Motzei Shabbos, our food court comes alive — right on site. Pizza fresh out of the oven, bakery sandwiches, sushi, and more.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#6b6b55" }}>
              Grab a bite, hang out with friends, and enjoy the night under the stars. There&apos;s also a volleyball area and communal hangout space — the energy keeps going long after Havdalah.
            </p>
          </div>

          {/* Photo */}
          <div
            className="split-photo"
            style={{
              position: "relative",
              height: "560px",
              overflow: "hidden",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85"
              alt="Food court at night"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="cta-section"
        style={{
          backgroundColor: "#1a2a0f",
          padding: "clamp(56px,8vw,120px) 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#D4A853",
            marginBottom: "24px",
          }}
        >
          Limited Spots · Book Early
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "#FDFAF5",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "48px",
          }}
        >
          Ready for your
          <br />
          <em style={{ fontStyle: "italic", color: "#D4A853" }}>Shabbos escape?</em>
        </h2>
        <Link
          href="/book"
          style={{
            display: "inline-block",
            backgroundColor: "#D4A853",
            color: "#1a2a0f",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.04em",
            padding: "18px 52px",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Book Your Shabbos
        </Link>
      </section>
    </>
  );
}
