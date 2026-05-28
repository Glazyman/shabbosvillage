import type { Metadata } from "next";
import { Josefin_Sans, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lora — elegant serif with an outdoor/literary feel for headings
const lora = Lora({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Josefin Sans — geometric, clean, outdoorsy for body/labels
const josefin = Josefin_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shabbos Village — Peaceful Shabbos Camping in Nature",
  description:
    "Disconnect from the noise. Reconnect with nature, community, and Shabbos. Tent camping in a peaceful wooded setting with creek access, central amenities, and a calm family atmosphere.",
  keywords: ["Shabbos camping", "Jewish camping", "outdoor Shabbat", "family camping"],
  openGraph: {
    title: "Shabbos Village",
    description: "A peaceful Shabbos camping experience in nature.",
    url: "https://shabbosvillage.com",
    siteName: "Shabbos Village",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lora.variable} ${josefin.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          backgroundColor: "#FDFAF5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
