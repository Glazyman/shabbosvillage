import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2D5016",
        color: "#EDE4D3",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#F8F3E9",
                marginBottom: "12px",
              }}
            >
              Shabbos Village
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#b5c9a4", maxWidth: "260px" }}>
              A peaceful Shabbos camping experience in nature. Disconnect. Reconnect.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em",
                         textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
              Explore
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/about",  label: "About Us" },
                { href: "/book",   label: "Book a Stay" },
                { href: "/faq",    label: "FAQ" },
                { href: "/rules",  label: "Rules & Safety" },
                { href: "/waiver", label: "Hold Harmless" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    color: "#b5c9a4",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em",
                         textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
              Contact
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#b5c9a4", lineHeight: 1.7 }}>
              Questions? Reach out:<br />
              <a href="mailto:info@shabbosvillage.com"
                 style={{ color: "#D4A853", textDecoration: "none" }}>
                info@shabbosvillage.com
              </a>
            </p>
            <p style={{ fontSize: "0.9rem", color: "#b5c9a4", marginTop: "12px", lineHeight: 1.7 }}>
              One way in, one way out.<br />
              Directions provided upon booking.
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em",
                         textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
              On Site
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Tent camping sites",
                "Electric hookups",
                "Toilet & showers",
                "Water stations",
                "Creek access",
                "Communal areas",
              ].map((item) => (
                <li key={item} style={{ fontSize: "0.9rem", color: "#b5c9a4", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#D4A853" }}>✦</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "#7a9e6b" }}>
            © {new Date().getFullYear()} Shabbos Village. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/waiver" style={{ fontSize: "0.85rem", color: "#7a9e6b", textDecoration: "none" }}>
              Hold Harmless
            </Link>
            <Link href="/rules" style={{ fontSize: "0.85rem", color: "#7a9e6b", textDecoration: "none" }}>
              Rules & Safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
