import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a2a0f", color: "#FDFAF5", padding: "clamp(40px,6vw,80px) clamp(24px,5vw,60px) clamp(24px,4vw,40px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Brand */}
        <div className="footer-brand" style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <svg width="22" height="36" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="1.5" r="1.5" fill="#D4A853"/>
              <line x1="14" y1="3" x2="14" y2="6.5" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 12 L14 6.5 L22 12" stroke="#D4A853" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
              <rect x="5" y="12" width="18" height="1.5" fill="#D4A853"/>
              <rect x="5" y="13.5" width="18" height="17" stroke="#D4A853" strokeWidth="1.3" fill="none"/>
              <line x1="14" y1="13.5" x2="14" y2="30.5" stroke="#D4A853" strokeWidth="0.7" strokeOpacity="0.5"/>
              <line x1="5" y1="22" x2="23" y2="22" stroke="#D4A853" strokeWidth="0.7" strokeOpacity="0.5"/>
              <ellipse cx="14" cy="26" rx="2.5" ry="3" fill="#D4A853" fillOpacity="0.3"/>
              <rect x="5" y="30.5" width="18" height="1.5" fill="#D4A853"/>
              <line x1="14" y1="30.5" x2="14" y2="44" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M14 33 C10 33 6 35 7 39" stroke="#D4A853" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
              <path d="M14 33 C18 33 22 35 21 39" stroke="#D4A853" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#FDFAF5", letterSpacing: "0.01em" }}>
              Shabbos Village
            </span>
          </div>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(253,250,245,0.55)", maxWidth: "280px" }}>
            A peaceful Shabbos camping experience in nature. Disconnect. Reconnect.
          </p>
        </div>

        {/* Links grid — Explore + On Site + Contact */}
        <div className="footer-links-grid" style={{ marginBottom: "48px" }}>

          {/* Explore */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A853", marginBottom: "20px" }}>
              Explore
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "/about",   label: "About Us" },
                { href: "/gallery", label: "Gallery" },
                { href: "/book",    label: "Book a Stay" },
                { href: "/faq",     label: "FAQ" },
                { href: "/rules",   label: "Rules & Safety" },
                { href: "/waiver",  label: "Hold Harmless" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ color: "rgba(253,250,245,0.55)", textDecoration: "none", fontSize: "0.88rem" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* On Site — hidden on mobile */}
          <div className="footer-on-site">
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A853", marginBottom: "20px" }}>
              On Site
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Tent camping sites", "Electric hookups", "Showers & toilets", "Water stations", "Creek access", "Communal areas"].map((item) => (
                <span key={item} style={{ fontSize: "0.88rem", color: "rgba(253,250,245,0.55)" }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A853", marginBottom: "20px" }}>
              Contact
            </p>
            <p style={{ fontSize: "0.88rem", color: "rgba(253,250,245,0.55)", lineHeight: 1.8, marginBottom: "12px" }}>
              Questions or group bookings:
            </p>
            <a href="mailto:info@shabbosvillage.com" style={{ color: "#D4A853", textDecoration: "none", fontSize: "0.88rem" }}>
              info@shabbosvillage.com
            </a>
            <p style={{ fontSize: "0.85rem", color: "rgba(253,250,245,0.4)", marginTop: "16px", lineHeight: 1.7 }}>
              One way in, one way out.<br />Directions sent after booking.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(253,250,245,0.3)" }}>
            © {new Date().getFullYear()} Shabbos Village. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "28px" }}>
            <Link href="/waiver" style={{ fontSize: "0.8rem", color: "rgba(253,250,245,0.3)", textDecoration: "none" }}>Hold Harmless</Link>
            <Link href="/rules" style={{ fontSize: "0.8rem", color: "rgba(253,250,245,0.3)", textDecoration: "none" }}>Rules & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
