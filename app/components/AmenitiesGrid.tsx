"use client";
import { useState } from "react";

const amenities = [
  {
    title: "6 Minyonim Nearby",
    desc: "A variety of minyanim within easy walking distance. No driving, no compromising on where you daven.",
  },
  {
    title: "Motzei Shabbos Chill",
    desc: "On-site food court and late-night hangout once Shabbos is out.",
    extra: "Pizza fresh out of the oven, bakery sandwiches, sushi, and more — right on the property. There's also a volleyball area and communal hangout space, so the energy keeps going long after Havdalah.",
  },
  {
    title: "Creek Access",
    desc: "A gentle creek runs through the property — the perfect Shabbos afternoon backdrop.",
  },
  {
    title: "Tent Camping",
    desc: "Wooded sites with shade, privacy, and the sounds of nature surrounding you.",
  },
  {
    title: "Electric Hookups",
    desc: "Available at select sites for an additional fee.",
  },
  {
    title: "Showers & Toilets",
    desc: "Clean, central facilities maintained for all guests throughout the weekend.",
  },
  {
    title: "Food Storage",
    desc: "Shared trailer with warmers and freezers. All food locked in securely overnight.",
  },
  {
    title: "Water Stations",
    desc: "Central water access spread throughout the property.",
  },
  {
    title: "Family Friendly",
    desc: "A calm, welcoming atmosphere built for families, couples, and individuals of all ages.",
  },
];

export default function AmenitiesGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="amenities-grid">
      {amenities.map((item, i) => {
        const isOpen = openIndex === i;
        const expandable = !!item.extra;

        return (
          <div
            key={item.title}
            onClick={() => expandable && setOpenIndex(isOpen ? null : i)}
            style={{
              borderTop: "1px solid #DDD5C4",
              paddingTop: "28px",
              cursor: expandable ? "pointer" : "default",
            }}
          >
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.8rem", fontStyle: "italic", color: "#D4A853", marginBottom: "10px" }}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#2D5016", marginBottom: "10px", lineHeight: 1.3 }}>
                {item.title}
              </h3>
              {expandable && (
                <span style={{ color: "#D4A853", fontSize: "1.1rem", lineHeight: 1, marginTop: "2px", flexShrink: 0, transition: "transform 0.25s", display: "inline-block", transform: isOpen ? "rotate(45deg)" : "none" }}>
                  +
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#6b6b55" }}>
              {item.desc}
            </p>
            {expandable && isOpen && (
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#4a4a3a", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #EDE4D3" }}>
                {item.extra}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
