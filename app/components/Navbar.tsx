"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/about",  label: "About" },
  { href: "/book",   label: "Book" },
  { href: "/faq",    label: "FAQ" },
  { href: "/rules",  label: "Rules" },
  { href: "/waiver", label: "Waiver" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? "rgba(253,250,245,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: scrolled ? "64px" : "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L19.5 9H27L21 13.5L23.5 21L16 16.5L8.5 21L11 13.5L5 9H12.5L16 2Z"
                fill="#2D5016" opacity="0.15"/>
              <path d="M16 4L18.8 10.6H26.2L20.1 14.9L22.2 21.6L16 17.7L9.8 21.6L11.9 14.9L5.8 10.6H13.2L16 4Z"
                stroke="#2D5016" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <circle cx="16" cy="16" r="3" fill="#D4A853" opacity="0.8"/>
            </svg>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: scrolled ? "#2D5016" : "white",
                letterSpacing: "-0.01em",
                transition: "color 0.4s ease",
                textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              Shabbos Village
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}
             className="hidden md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: scrolled ? "#2D5016" : "rgba(255,255,255,0.92)",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "color 0.3s",
                letterSpacing: "0.01em",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
            Reserve Now
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
            color: scrolled ? "#2D5016" : "white",
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" fill="none"/>
            ) : (
              <>
                <rect x="3" y="6" width="18" height="2" rx="1"/>
                <rect x="3" y="11" width="18" height="2" rx="1"/>
                <rect x="3" y="16" width="18" height="2" rx="1"/>
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            backgroundColor: "#FDFAF5",
            borderTop: "1px solid #EDE4D3",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          className="md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: "#2D5016",
                fontWeight: 500,
                fontSize: "1.1rem",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="btn-primary" style={{ textAlign: "center" }}
                onClick={() => setOpen(false)}>
            Reserve Now
          </Link>
        </div>
      )}
    </header>
  );
}
