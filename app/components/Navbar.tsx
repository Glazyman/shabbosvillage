"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/about",  label: "About" },
  { href: "/book",   label: "Book" },
  { href: "/faq",    label: "FAQ" },
  { href: "/rules",  label: "Rules" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "#1a1a12" : "rgba(255,255,255,0.92)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.5s ease",
        backgroundColor: scrolled ? "rgba(253,250,245,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #EDE4D3" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          height: scrolled ? "64px" : "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.5s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="26" height="20" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: "opacity 0.4s", opacity: scrolled ? 1 : 0.9 }}>
            <path d="M14 1L27 21H1L14 1Z" stroke={scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            <path d="M14 1L19.5 21" stroke={scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" opacity="0.5"/>
            <path d="M14 1L8.5 21" stroke={scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" opacity="0.5"/>
            <path d="M9.5 14.5H18.5" stroke={scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" opacity="0.6"/>
            <rect x="11" y="17" width="6" height="4" stroke={scrolled ? "#2D5016" : "#D4A853"} strokeWidth="1" fill="none"/>
          </svg>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: textColor,
              letterSpacing: "0.02em",
              transition: "color 0.4s ease",
            }}
          >
            Shabbos Village
          </span>
        </Link>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "40px" }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: textColor,
                fontWeight: 500,
                fontSize: "0.88rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.2s",
                opacity: 0.85,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            style={{
              display: "inline-block",
              backgroundColor: scrolled ? "#2D5016" : "rgba(255,255,255,0.15)",
              border: scrolled ? "none" : "1px solid rgba(255,255,255,0.5)",
              backdropFilter: "blur(4px)",
              color: "#FDFAF5",
              fontWeight: 600,
              fontSize: "0.82rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "10px 24px",
              borderRadius: "3px",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            Reserve
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: textColor,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          ) : (
            <>
              <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "currentColor" }}/>
              <span style={{ display: "block", width: "16px", height: "1.5px", backgroundColor: "currentColor" }}/>
              <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "currentColor" }}/>
            </>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            backgroundColor: "#FDFAF5",
            borderTop: "1px solid #EDE4D3",
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
          className="md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: "#1a1a12",
                fontWeight: 500,
                fontSize: "1rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-block",
              backgroundColor: "#2D5016",
              color: "#FDFAF5",
              fontWeight: 600,
              fontSize: "0.88rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "14px 28px",
              borderRadius: "3px",
              textDecoration: "none",
              alignSelf: "flex-start",
            }}
          >
            Reserve Now
          </Link>
        </div>
      )}
    </header>
  );
}
