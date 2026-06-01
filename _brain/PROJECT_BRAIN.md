# Shabbos Village — Project Brain

> **Rule:** After every Claude session that makes changes, append an entry to the [Session Log](#session-log) at the bottom of this file. One entry per session, no matter how small the change. Format: `## YYYY-MM-DD — <short title>` followed by bullet points of what changed and why.

---

## What Is This Project

**Shabbos Village** is a campground booking website for a Jewish outdoor Shabbos experience — tent camping in a wooded setting with creek access, communal atmosphere, and Shabbos-specific amenities. The site handles discovery, booking, waiver signing, and event confirmation.

- **Live site:** shabbosvillage.com
- **Deploy:** Vercel (auto-deploy from `main` branch)
- **Repo:** /Users/glazy/Desktop/Shabbosvillage

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6 (React 19) — App Router |
| Language | TypeScript |
| Styling | Inline styles + custom CSS classes (Tailwind v4 installed but mostly inline) |
| Fonts | Lora (serif headings, aliased as `--font-playfair`) + Josefin Sans (body, aliased as `--font-dm-sans`) |
| Payments | Stripe (checkout sessions via API route) |
| Email | Resend (confirmation emails on booking) |
| Animations | Framer Motion (installed, used selectively) |
| Icons | Lucide React |
| Deployment | Vercel |

**Note:** Next.js is version 16 — APIs and file conventions may differ from training data. Read `node_modules/next/dist/docs/` before writing Next.js code.

---

## Design System

- **Primary green:** `#2D5016` (dark forest green — buttons, accents)
- **Background cream:** `#FDFAF5` (warm off-white)
- **Gold accent:** `#D4A853` (section numbers, highlights, CTA backgrounds)
- **Dark section:** `#1a2a0f` (footer, final CTA)
- **Warm mid:** `#F8F3E9` / `#EDE4D3` (section alternation)
- **Body text:** `#4a4a3a` / `#6b6b55`
- **Rust label:** `#8B5E3C`

**Vibe:** Editorial camping magazine. Rustic earth tones, serif headlines, full-bleed photos.

---

## Pages & Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — hero, amenity strip, editorial intro, how-it-works, quote, groups grid, CTA |
| `/about` | `app/about/page.tsx` | About the campground |
| `/book` | `app/book/page.tsx` | Booking form → Stripe checkout |
| `/gallery` | `app/gallery/page.tsx` | Photo gallery |
| `/faq` | `app/faq/page.tsx` | FAQ accordion |
| `/rules` | `app/rules/page.tsx` | Rules & safety page |
| `/waiver` | `app/waiver/page.tsx` | Hold-harmless waiver (inline, signed at checkout) |
| `/success` | `app/success/page.tsx` | Post-booking confirmation page |

### API Routes

| Route | File | Purpose |
|---|---|---|
| `/api/booking` | `app/api/booking/route.ts` | — |
| `/api/create-checkout-session` | `app/book/route.ts` | Stripe checkout session creation |
| `/api/send-confirmation` | `app/api/send-confirmation/` | Resend email after booking |

---

## Components

| Component | File | Notes |
|---|---|---|
| Navbar | `app/components/Navbar.tsx` | Logo + hamburger on mobile, full links on desktop |
| Footer | `app/components/Footer.tsx` | Dark green, 3-col links (Explore / On Site / Contact); On Site hidden on mobile |

---

## Amenities (current homepage strip)

Tent Camping · Electric Hookups · Showers & Toilets · Creek Access · Nature Trails · Communal Gathering · Family Friendly · Water Stations · Motzei Shabbos Food Court

---

## Key Design Decisions

- **Waiver signed at checkout**, not on a standalone page (removed standalone signature form)
- **Navbar:** hamburger-only on mobile, full link bar on desktop
- **Mobile footer:** 2-column layout, "On Site" column hidden to save space
- **Amenity strip:** horizontal scroll on mobile (no wrap) with `scrollbarWidth: none`
- **Logo:** candle/lantern icon (`/logo.png`, updated 2026-05-29); also `logo 2.png` in public
- **Fonts aliased** — `--font-playfair` is actually Lora; `--font-dm-sans` is actually Josefin Sans (kept alias names from original design)
- **Images:** Unsplash URLs (no local photos yet)
- **Directions:** not shown publicly — sent after booking only

---

## Session Log

### 2026-05-27 — Initial build

- Created full Next.js 14 site from scratch (initial commit from Create Next App)
- Added vercel.json to set framework explicitly for Vercel detection
- Fixed Stripe lazy-load to avoid build-time crash without env vars

### 2026-05-28 — Full redesign + features

- Redesigned homepage — real Unsplash photos, editorial layout (removed emoji boxes)
- Redesigned all pages — camping editorial style, Lora/Josefin fonts, tent logo
- Redesigned booking page and hamburger menu to match editorial style
- Added gallery page
- Added inline waiver signing in checkout flow; gallery added to nav
- Wired mobile responsive layout — CSS classes added to all page components
- Fixed mobile layout; added Resend email notifications on booking confirmation
- Cleaned up mobile menu — compact links, overflow scroll, full-width CTA
- Multiple navbar iterations: logo+hamburger only → restored desktop links → final mobile/desktop split using CSS media query classes
- Multiple mobile layout fixes (clamp() padding, centered nav, booking layout)
- Fixed booking step indicators
- Compact mobile footer: 2-col links, "On Site" column hidden on mobile
- Fixed rules page section headers — clamped number size, cleaner dividers
- Waiver page: removed standalone signature form (signing happens at checkout instead)
- Amenity strip: horizontal scroll on mobile instead of wrapping

### 2026-05-29 — Logo update

- Updated logo to new candle lantern design (`logo.png` replaced)

### 2026-05-31 — Amenities expansion

- Added "Food Storage Station" and "Motzei Shabbos Food Court" to amenity strip on homepage

### 2026-06-01 — Brain file + minyonim feature

- Created `_brain/PROJECT_BRAIN.md` (this file) to document project history
- Added session-log rule to CLAUDE.md
- Added "6 Minyonim Within Walking Distance" to homepage amenity strip (`app/page.tsx`)
- Added "6 minyonim within walking distance" as item 08 in the "What to Expect" list on the About page (`app/about/page.tsx`), with description noting no need to drive or compromise on where you daven; updated `borderBottom` condition from `i < 6` to `i < 7` to keep the last item borderless
