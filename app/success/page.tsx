import Link from "next/link";

export default function SuccessPage() {
  return (
    <div
      style={{
        backgroundColor: "#FDFAF5",
        minHeight: "100vh",
        paddingTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      {/* Animated check */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#2D5016",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          boxShadow: "0 12px 40px rgba(45,80,22,0.25)",
          fontSize: "2.5rem",
        }}
      >
        ✓
      </div>

      <span className="section-tag">Booking Confirmed</span>

      <h1
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#2D5016",
          marginTop: "12px",
          marginBottom: "20px",
          lineHeight: 1.2,
        }}
      >
        Your Shabbos is Booked!
      </h1>

      <p
        style={{
          fontSize: "1.05rem",
          color: "#4a4a3a",
          lineHeight: 1.8,
          maxWidth: "520px",
          marginBottom: "40px",
        }}
      >
        Thank you for booking with Shabbos Village. A confirmation email has been sent
        to you with your booking details, directions, and everything you need to know
        for an amazing Shabbos in nature.
      </p>

      {/* Next steps */}
      <div
        style={{
          backgroundColor: "#F8F3E9",
          borderRadius: "20px",
          padding: "36px 40px",
          border: "1px solid #EDE4D3",
          maxWidth: "540px",
          width: "100%",
          marginBottom: "40px",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700,
                     color: "#2D5016", marginBottom: "20px" }}>
          What Happens Next
        </h2>
        {[
          { n: "1", text: "Check your email for your booking confirmation and receipt." },
          { n: "2", text: "Directions to Shabbos Village will be included — one way in, one way out." },
          { n: "3", text: "Review the Rules & Safety guidelines and the waiver if you haven't yet." },
          { n: "4", text: "Pack your tent, sleeping bags, and Shabbos essentials." },
          { n: "5", text: "See you there! Shabbat Shalom 🌿" },
        ].map((step) => (
          <div key={step.n} style={{ display: "flex", gap: "14px", marginBottom: "14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#2D5016",
                color: "#F8F3E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {step.n}
            </div>
            <p style={{ fontSize: "0.95rem", color: "#3a3a2a", lineHeight: 1.6, marginTop: "4px" }}>{step.text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/rules" className="btn-secondary">Review Rules & Safety</Link>
      </div>

      <p style={{ marginTop: "40px", fontSize: "0.9rem", color: "#8B8070" }}>
        Questions? Email us at{" "}
        <a href="mailto:info@shabbosvillage.com" style={{ color: "#2D5016", fontWeight: 600 }}>
          info@shabbosvillage.com
        </a>
      </p>
    </div>
  );
}
