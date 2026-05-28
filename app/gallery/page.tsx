import Image from "next/image";
import Link from "next/link";

const photos = [
  { src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=85", alt: "Tent camping in wooded area", caption: "Camp Sites", span: "tall" },
  { src: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=900&q=85", alt: "Forest tent", caption: "Forest Sites", span: "normal" },
  { src: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=900&q=85", alt: "Campfire gathering", caption: "Evening Fires", span: "normal" },
  { src: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=900&q=85", alt: "Tent under stars at night", caption: "Starry Nights", span: "wide" },
  { src: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=900&q=85", alt: "Campground tents", caption: "Family Sites", span: "normal" },
  { src: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?w=900&q=85", alt: "Nature camping scene", caption: "Nature & Trails", span: "normal" },
  { src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=900&q=85", alt: "Camping at night", caption: "Night at Camp", span: "tall" },
  { src: "https://images.unsplash.com/photo-1552083375-1447ce886485?w=900&q=85", alt: "Relaxing in nature", caption: "Rest & Relax", span: "normal" },
  { src: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=900&q=85", alt: "Campfire circle", caption: "Gathering Area", span: "normal" },
];

export default function GalleryPage() {
  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "50vh", minHeight: "360px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=85"
          alt="Shabbos Village campground"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,8,0.4) 0%, rgba(10,20,8,0.7) 100%)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>
            The Village
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Gallery
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,40px) clamp(30px,5vw,60px)" }}>
        <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#4a4a3a", borderLeft: "2px solid #D4A853", paddingLeft: "20px" }}>
          These photos are a preview of the Shabbos Village experience. Real campground photos coming soon — check back after our opening season.
        </p>
      </section>

      {/* ── PHOTO GRID ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px clamp(56px,8vw,120px)" }}>
        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                gridRow: photo.span === "tall" ? "span 2" : "span 1",
                gridColumn: photo.span === "wide" ? "span 2" : "span 1",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.5s ease" }}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {/* Caption overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,20,8,0.7) 0%, transparent 50%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "20px",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="gallery-caption-overlay"
              >
                <span style={{ color: "#FDFAF5", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "48px", fontSize: "0.85rem", color: "#8B8070", fontStyle: "italic" }}>
          All photos are placeholder images. Our real campground photos will be uploaded soon.
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" style={{ backgroundColor: "#1a2a0f", padding: "clamp(48px,7vw,100px) clamp(24px,5vw,60px)", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4A853", marginBottom: "20px" }}>
          Ready to experience it?
        </p>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          Reserve your spot today.
        </h2>
        <Link href="/book" style={{ display: "inline-block", backgroundColor: "#D4A853", color: "#1a2a0f", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", padding: "15px 40px", borderRadius: "3px", textDecoration: "none" }}>
          Book a Stay
        </Link>
      </section>
    </div>
  );
}
