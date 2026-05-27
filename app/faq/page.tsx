"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "Is this tent camping only?",
    a: "Yes! Shabbos Village is a tent camping experience. We provide sites for your own tents. We have standard, large, and XL cabin-tent sites. Bring your gear and we&apos;ll take care of the rest of the setup experience.",
  },
  {
    q: "Are there bathrooms and showers?",
    a: "Yes. We have central toilet and shower facilities available for all guests. The facilities are clean, maintained, and centrally located within the campground.",
  },
  {
    q: "Is electricity available?",
    a: "Yes, we offer electric hookup sites at an additional $20/night. We also have central charging stations for essential device needs. Note: we encourage disconnecting from technology to enhance the Shabbos experience!",
  },
  {
    q: "Are pets allowed?",
    a: "We love animals, but to maintain a peaceful and safe environment for all families, pets are not permitted at this time. Please plan accordingly.",
  },
  {
    q: "Can groups reserve together?",
    a: "Absolutely — in fact, we encourage it! We can accommodate family groups, friend groups, and organizations. We also offer exclusive full-park rentals for camps, retreats, and private events. Contact us for group pricing.",
  },
  {
    q: "Are fires permitted?",
    a: "Campfires are permitted in designated fire rings only. No open fires outside the fire ring areas. All fires must be fully extinguished before sleeping or leaving your site. Follow all posted fire safety instructions.",
  },
  {
    q: "Is there parking?",
    a: "Yes, each booking includes vehicle access. There is a designated parking area. The campground has one way in and one way out — directions and parking instructions are provided after booking confirmation.",
  },
  {
    q: "What should I bring?",
    a: "Bring your tent, sleeping bags, personal items, Shabbos essentials (candles, challah, wine), and clothes for the outdoors. We provide water access, facilities, and gathering areas. A full packing list is sent with your booking confirmation.",
  },
  {
    q: "Are there quiet hours?",
    a: "Yes. Quiet hours are from 10 PM Friday night until after Havdalah on Saturday night. We ask all guests to respect the sanctity of Shabbos and the peaceful atmosphere of the campground at all times.",
  },
  {
    q: "Is this family-friendly?",
    a: "100%. Shabbos Village is designed to be a safe, calm, and joyful experience for families. Children are welcome and must be supervised, especially near the creek and water areas. We are committed to a family-friendly and respectful atmosphere.",
  },
  {
    q: "Can we rent the entire park for a group or camp?",
    a: "Yes! We rent the entire Shabbos Village exclusively for groups, camps, and organizations. This is perfect for day camps, sleepover trips, organizational retreats, yoga events, lectures, and other group gatherings. Contact us for availability and pricing.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellations made 14 or more days before the arrival date receive a full refund. Cancellations made within 14 days are non-refundable but may be rescheduled within the same season, subject to availability.",
  },
  {
    q: "Are there dining facilities?",
    a: "We have communal gathering areas where guests can share meals together. There is no restaurant on site — guests are expected to bring their own Shabbos food and cooking equipment. We encourage the communal atmosphere of shared Shabbos meals.",
  },
  {
    q: "How do I get directions?",
    a: "Directions are provided only after booking is confirmed. The campground has one entrance and one exit for safety and security. Exact location details will be emailed to you with your booking confirmation.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#FDFAF5", minHeight: "100vh", paddingTop: "100px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #2D5016 0%, #1a3a0f 100%)",
                    padding: "60px 24px 80px", textAlign: "center" }}>
        <span className="section-tag" style={{ color: "#D4A853", backgroundColor: "rgba(212,168,83,0.1)" }}>
          Questions
        </span>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
                     fontWeight: 700, color: "#FDFAF5", marginTop: "8px" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: "rgba(253,250,245,0.75)", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
          Everything you need to know about your Shabbos Village experience.
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "-40px auto 80px", padding: "0 24px" }}>
        <div style={{ backgroundColor: "#FDFAF5", borderRadius: "24px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.08)", overflow: "hidden",
                      border: "1px solid #EDE4D3" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: i < faqs.length - 1 ? "1px solid #EDE4D3" : "none",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "24px 32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                  backgroundColor: open === i ? "#F8F3E9" : "transparent",
                  transition: "background-color 0.2s",
                }}
              >
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem",
                               fontWeight: 600, color: "#2D5016", lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: open === i ? "#2D5016" : "#EDE4D3",
                    color: open === i ? "#F8F3E9" : "#2D5016",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    flexShrink: 0,
                    transition: "all 0.2s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "0 32px 24px",
                    backgroundColor: "#F8F3E9",
                  }}
                >
                  <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: "#4a4a3a" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#2D5016",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            color: "#F8F3E9",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 700, marginBottom: "12px" }}>
            Still Have Questions?
          </h2>
          <p style={{ color: "rgba(248,243,233,0.8)", marginBottom: "24px" }}>
            We&apos;re happy to help. Send us an email and we&apos;ll get back to you quickly.
          </p>
          <a
            href="mailto:info@shabbosvillage.com"
            className="btn-primary"
            style={{ backgroundColor: "#D4A853", color: "#2D5016" }}
          >
            Email Us
          </a>
          <div style={{ marginTop: "28px" }}>
            <Link href="/book" style={{ color: "#D4A853", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
              Ready to book? Reserve your spot →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
