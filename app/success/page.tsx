"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const didSend = useRef(false);

  useEffect(() => {
    if (!sessionId || didSend.current) return;
    // Guard against duplicate sends on StrictMode double-invoke or page refresh
    const key = `email_sent_${sessionId}`;
    if (sessionStorage.getItem(key)) return;
    didSend.current = true;
    sessionStorage.setItem(key, "1");

    fetch("/api/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(console.error);
  }, [sessionId]);

  return (
    <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(48px,7vw,100px)" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 clamp(20px,4vw,40px)" }}>

        {/* Check */}
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#2D5016", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px", color: "#FDFAF5", fontSize: "1.4rem" }}>
          ✓
        </div>

        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "16px" }}>
          Booking Confirmed
        </p>

        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#1a1a12", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "28px" }}>
          Your Shabbos is booked.
        </h1>

        <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a", marginBottom: "60px", borderLeft: "2px solid #D4A853", paddingLeft: "20px" }}>
          A confirmation email has been sent to you and the campground. Directions will be provided separately before your arrival.
        </p>

        {/* Steps */}
        <div style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "32px" }}>
            What Happens Next
          </p>
          {[
            "Check your email for booking confirmation and receipt.",
            "Directions to Shabbos Village are sent separately — one way in, one way out.",
            "Review the Rules & Safety guidelines before arriving.",
            "Pack your tent, sleeping bags, and Shabbos essentials (candles, challah, wine).",
            "See you there. Shabbat Shalom.",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "20px 0", borderBottom: i < 4 ? "1px solid #EDE4D3" : "none" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontStyle: "italic", color: "#D4A853", minWidth: "24px", paddingTop: "2px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: "0.97rem", color: "#3a3a2a", lineHeight: 1.7 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "3px", textDecoration: "none" }}>
            Back to Home
          </Link>
          <Link href="/rules" style={{ display: "inline-block", border: "1px solid #EDE4D3", color: "#2D5016", fontWeight: 500, fontSize: "0.88rem", padding: "13px 32px", borderRadius: "3px", textDecoration: "none" }}>
            Rules & Safety
          </Link>
        </div>

        <p style={{ marginTop: "48px", fontSize: "0.88rem", color: "#8B8070" }}>
          Questions?{" "}
          <a href="mailto:info@shabbosvillage.com" style={{ color: "#2D5016", fontWeight: 600 }}>
            info@shabbosvillage.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "140px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <p style={{ color: "#8B8070", fontSize: "0.9rem", padding: "0 40px" }}>Loading confirmation...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
