"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const faqs: { q: string; a: string; download?: { href: string; label: string } }[] = [
  { q: "Is this tent camping only?", a: "Yes — Shabbos Village is a tent camping experience. We have standard, large, and XL tent sites. Bring your own tent and gear." },
  { q: "Are there bathrooms and showers?", a: "Yes. Central toilet and shower facilities are clean, maintained, and available to all guests throughout their stay." },
  { q: "Is electricity available?", a: "Yes. Electric hookup sites are available for an additional fee. We also have central charging stations. We encourage unplugging for the full Shabbos experience." },
  { q: "Are pets allowed?", a: "To maintain a peaceful and safe environment for all families, pets are not permitted at this time." },
  { q: "Can groups reserve together?", a: "Absolutely. We accommodate families, friend groups, and organizations. We also offer full-park exclusive rentals for camps, retreats, and private events — contact us for group pricing." },
  { q: "Are fires permitted?", a: "Yes, in designated fire rings only. No open fires outside fire areas. All fires must be fully extinguished before sleeping or leaving your site." },
  { q: "Is there parking?", a: "Yes. Designated parking area on site. One way in, one way out — directions and parking details are provided after booking confirmation." },
  { q: "What should I bring?", a: "Your tent, sleeping bags, personal items, and Shabbos essentials (candles, challah, wine). Download our full packing list below, and a copy is also sent with your booking confirmation.", download: { href: "/shabbos-village-packing-list.pdf", label: "Download Packing List (PDF)" } },
  { q: "Are there quiet hours?", a: "Yes. Quiet hours run from 10 PM Friday night through Havdalah on Saturday. We ask all guests to honor the sanctity of Shabbos throughout their stay." },
  { q: "Is this family-friendly?", a: "100%. Shabbos Village is designed to be safe, calm, and joyful for families. Children are welcome and must be supervised near water areas." },
  { q: "Can we rent the entire park?", a: "Yes — this is one of our most popular options. Full-park exclusive rental for groups, camps, organizations, and private events. Contact us for details." },
  { q: "What is the cancellation policy?", a: "Cancellations 14+ days before arrival receive a full refund. Within 14 days — non-refundable but may be rescheduled within the same season." },
  { q: "How do I get directions?", a: "Directions are provided only after booking confirmation. The campground has a single entrance and exit road for the safety and privacy of all guests." },
  { q: "Is there dining on site?", a: "No restaurant — guests bring their own Shabbos food. There are communal gathering areas for shared meals, and we strongly encourage the communal Shabbos table." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "50vh", minHeight: "380px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1455496231601-e6195da1f841?w=1920&q=85"
          alt="Camping in nature"
          fill
          style={{ objectFit: "cover", objectPosition: "center 50%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,8,0.5) 0%, rgba(10,20,8,0.7) 100%)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
            Questions
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* ── FAQ LIST ── */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(48px,7vw,100px) clamp(20px,4vw,40px)" }}>
        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #EDE4D3" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "28px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "24px",
                }}
              >
                <div style={{ display: "flex", gap: "24px", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.82rem", fontStyle: "italic", color: "#D4A853", minWidth: "28px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 600, color: "#1a1a12", lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                </div>
                <span style={{ color: open === i ? "#2D5016" : "#8B8070", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="faq-answer" style={{ paddingBottom: "32px" }}>
                  <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "#4a4a3a" }}>{faq.a}</p>
                  {faq.download && (
                    <a
                      href={faq.download.href}
                      download
                      style={{ display: "inline-block", marginTop: "18px", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em", padding: "12px 26px", borderRadius: "3px", textDecoration: "none" }}
                    >
                      {faq.download.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div style={{ marginTop: "80px", padding: "clamp(32px,5vw,60px)", backgroundColor: "#1a2a0f", borderRadius: "4px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, color: "#FDFAF5", marginBottom: "12px" }}>
            Still have questions?
          </h2>
          <p style={{ color: "rgba(253,250,245,0.65)", marginBottom: "32px", fontSize: "0.97rem", lineHeight: 1.7 }}>
            We&apos;re happy to help. Send us an email and we&apos;ll get back to you quickly.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@shabbosvillage.com" style={{ display: "inline-block", backgroundColor: "#D4A853", color: "#1a2a0f", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "3px", textDecoration: "none" }}>
              Email Us
            </a>
            <Link href="/book" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", fontWeight: 500, fontSize: "0.88rem", padding: "13px 32px", borderRadius: "3px", textDecoration: "none" }}>
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
