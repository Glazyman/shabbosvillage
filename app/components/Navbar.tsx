"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/about",   label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book",    label: "Book" },
  { href: "/faq",     label: "FAQ" },
  { href: "/rules",   label: "Rules" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const textColor = (open || scrolled) ? "#1a1a12" : "rgba(255,255,255,0.92)";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.5s ease",
          backgroundColor: open ? "#FDFAF5" : scrolled ? "rgba(253,250,245,0.97)" : "transparent",
          backdropFilter: (!open && scrolled) ? "blur(16px)" : "none",
          borderBottom: (!open && scrolled) ? "1px solid #EDE4D3" : "1px solid transparent",
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 40px)",
            height: scrolled ? "64px" : "80px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            transition: "height 0.5s ease",
          }}
        >
          {/* Logo — left */}
          <Link href="/" onClick={() => setOpen(false)} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", zIndex: 110 }}>
            <svg width="26" height="20" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1L27 21H1L14 1Z" stroke={open || scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <path d="M14 1L19.5 21" stroke={open || scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" opacity="0.5"/>
              <path d="M14 1L8.5 21" stroke={open || scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" opacity="0.5"/>
              <path d="M9.5 14.5H18.5" stroke={open || scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" opacity="0.6"/>
              <rect x="11" y="17" width="6" height="4" stroke={open || scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" fill="none"/>
            </svg>
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 700, color: textColor, letterSpacing: "0.02em", transition: "color 0.4s ease" }}>
              Shabbos Village
            </span>
          </Link>

          {/* Desktop links — center */}
          <div className="nav-desktop">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ color: textColor, fontWeight: 500, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", opacity: 0.85, transition: "opacity 0.2s" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Reserve button — right — desktop only */}
          <div className="nav-desktop" style={{ justifyContent: "flex-end" }}>
            <Link href="/book" style={{ display: "inline-block", backgroundColor: scrolled ? "#2D5016" : "rgba(255,255,255,0.14)", border: scrolled ? "none" : "1px solid rgba(255,255,255,0.45)", backdropFilter: "blur(4px)", color: "#FDFAF5", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 22px", borderRadius: "3px", textDecoration: "none", transition: "all 0.3s" }}>
              Reserve
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="nav-hamburger"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", zIndex: 110, width: "36px", height: "36px", gridColumn: "3", justifySelf: "end" }}
            aria-label="Toggle menu"
          >
            <span style={{ display: "block", width: open ? "22px" : "22px", height: "1.5px", backgroundColor: open ? "#1a1a12" : textColor, transition: "all 0.35s", transform: open ? "translateY(7.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "16px", height: "1.5px", backgroundColor: open ? "#1a1a12" : textColor, transition: "all 0.2s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: open ? "#1a1a12" : textColor, transition: "all 0.35s", transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
          </button>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className="nav-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          backgroundColor: "#FDFAF5",
          flexDirection: "column",
          overflowY: "auto",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.35s ease",
        }}
      >
        {/* Spacer for the header bar */}
        <div style={{ height: "80px", flexShrink: 0 }} />

        {/* Links */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 32px 0" }}>
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 6vw, 2.4rem)",
                fontWeight: 700,
                color: "#1a1a12",
                textDecoration: "none",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                padding: "18px 0",
                borderBottom: "1px solid #EDE4D3",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: `opacity 0.35s ease ${i * 0.05}s, transform 0.35s ease ${i * 0.05}s`,
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-16px)",
              }}
            >
              {l.label}
              <span style={{ color: "#D4A853", fontSize: "1rem", fontStyle: "italic", fontWeight: 400, letterSpacing: 0 }}>→</span>
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div
          style={{
            padding: "32px",
            transition: `opacity 0.35s ease ${links.length * 0.05 + 0.05}s`,
            opacity: open ? 1 : 0,
          }}
        >
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            style={{ display: "block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px", borderRadius: "3px", textDecoration: "none", textAlign: "center" }}
          >
            Reserve Now
          </Link>
          <p style={{ marginTop: "16px", fontSize: "0.8rem", color: "#8B8070", textAlign: "center" }}>
            info@shabbosvillage.com
          </p>
        </div>
      </div>
    </>
  );
}
