# Shabbos Village — Project Brain

> **Rule:** After every Claude session that makes changes, append an entry to the [Session Log](#session-log) at the bottom of this file. One entry per session, no matter how small the change. Format: `## YYYY-MM-DD — <short title>` followed by bullet points of what changed and why.

---

## Deployment Notes

**Always force push.** Normal `git push origin main` consistently fails with diverged remote errors due to a persistent local/remote state mismatch. Use:

```
git push --force origin main
```

This is a solo repo with no other contributors, so force pushing is safe. Vercel auto-deploys from the `main` branch on GitHub after every push.

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
| Navbar | `app/components/Navbar.tsx` | Logo + "Shabbos Village" text on left; desktop links center; hamburger mobile-only |
| Footer | `app/components/Footer.tsx` | Dark green, 3-col links (Explore / On Site / Contact); On Site hidden on mobile |
| AmenitiesGrid | `app/components/AmenitiesGrid.tsx` | Client component; 9 amenity cards, "Motzei Shabbos Chill" is expandable with `+` toggle |

---

## Amenities (current homepage strip)

Tent Camping · Electric Hookups · Showers & Toilets · Creek Access · Nature Trails · Communal Gathering · Family Friendly · Water Stations · Motzei Shabbos Food Court

---

## Wording to Lock In

- Motzei Shabbos heading: **"When Shabbos ends, the fun continues."** (not "begins")

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

### 2026-06-01 — Brain, minyonim, navbar, amenities grid, dropdowns

- Created `_brain/PROJECT_BRAIN.md` and added session-log rule to `CLAUDE.md`
- Added "6 Minyonim Within Walking Distance" to homepage amenity strip
- Added minyonim as item 08 in About page "What to Expect" list
- Restored `Navbar.tsx` (had been accidentally deleted from working tree)
- Added "Shabbos Village" text next to logo in Navbar (matches footer style; color transitions with scroll state)
- Footer logo: shrunk from 88×88px square to 30×45px lantern with inline brand name text
- Amenity strip: switched from `nowrap`/horizontal-scroll to `flexWrap: wrap` so it fits naturally at any width
- Added full "What's Included" amenities grid section to homepage (3-col desktop, 2-col tablet, 1-col mobile) — 9 cards numbered in gold, placed after editorial intro
- Added Motzei Shabbos food court split section to homepage (later removed, see below)
- Fixed heading: "When Shabbos ends, the fun **continues**" (not "begins") — locked in brain
- Replaced inline amenities grid with `AmenitiesGrid` client component (`app/components/AmenitiesGrid.tsx`) so cards can be interactive
- "Motzei Shabbos Chill" card is expandable — click to reveal full food court details inline; `+` rotates to `×` when open
- Removed the standalone Motzei Shabbos split section (content now lives in the dropdown)
- All pushes use `git push --force origin main` due to persistent local/remote state mismatch

### 2026-06-15 — New lamp logo (transparent)

- Replaced `public/logo.png` with new lamp + "Shabbos Village" design (sourced from a ChatGPT-generated image)
- Made the cream background transparent via edge flood-fill (PIL/scipy) so the warm glow inside the lantern is preserved
- Navbar (`Navbar.tsx:61`) and Footer (`Footer.tsx:13`) both reference `/logo.png`, so both update automatically
- Note: navbar renders logo at 60×60px; baked-in "SHABBOS VILLAGE" text reads small at that size — may want a lamp-only crop for the navbar later
- `public/logo 2.png` remains unused (not referenced anywhere)
- Enlarged logo: Navbar 60→96px (nav height bumped 80→112px / scrolled 64→88px to avoid clipping); Footer 160→220px
- Footer logo fix: transparent logo showed cream blobs in letter counters (B/O/A/G holes) on the dark footer. Made `public/logo-footer.png` with footer green `#1a2a0f` baked in (global cream→green replace, feathered edges) so it blends seamlessly. Footer now uses `/logo-footer.png`; navbar still uses transparent `/logo.png`

### 2026-06-18 — Content edits, packing-list PDF, legal waiver rewrite

- **About page** — item 07 "Food storage station": "shared trailer" → "shared space". Item 08 "6 minyonim": removed the "no need to drive" wording, added "you're always welcome to make your own minyan as well."
- **Homepage AmenitiesGrid** — item 02 "Motzei Shabbos Chill": dropped the on-site food court; desc now just "Late-night hangout once Shabbos is out." Dropdown `extra` stripped of all food (pizza/bakery/sushi) — now only highlights the volleyball/communal hangout chill.
- **FAQ** — #1: "XL cabin-tent sites" → "XL tent sites" (tents only). #3: removed the "$20/night" electricity price (TBD) → "for an additional fee". #8: added a **Download Packing List (PDF)** button; `faqs` array now typed with optional `download: {href,label}` and the answer block renders a green download link when present.
- **Packing list PDF** — created `public/shabbos-village-packing-list.pdf` (branded, 7 sections w/ checkboxes, 114 KB, valid PDF). Generated via reportlab (installed with `pip3 install --user`, NOT added to package.json); reusable generator kept at `_brain/renders/make_packing_list.py`.
- **Hold Harmless waiver** (`app/waiver/page.tsx`) — full rewrite into a comprehensive 12-section legal agreement. Released/indemnified party is now **Joseph Farkas, individually and d/b/a Shabbos Village** (not the entity), via a defined "Released Parties" term. Governing law: **New York** (confirmed w/ user). Intro + acknowledgement note updated. Inline checkout waiver summary (`app/book/page.tsx:287`) updated to match the Joseph Farkas release language.
- Note: `npx tsc --noEmit` reports two pre-existing TS2688 errors for stray `node_modules/@types/react 2` and `react-dom 2` duplicate folders (Finder/iCloud " 2" duplication, same pattern as `logo 2.png`) — unrelated to these edits; all edited files typecheck clean.

### 2026-06-18 — New lamp-post logo (transparent)

- Replaced the logo with a new ornate lamp-post + "SHABBOS VILLAGE" design (ChatGPT-generated source in Downloads).
- Made the cream/tan background (`[228,210,191]`) transparent via edge flood-fill (connectivity from border) so the warm lantern glow — enclosed by the dark frame — is preserved. Added a tight global color-match pass (`dist < 34`) to also clear the enclosed letter counters (B/O/A/G holes) that flood-fill can't reach; the lighter cream text strokes are far enough from the tan bg to survive. Alpha feathered + 0.7px gaussian for clean edges.
- Script: `_brain/renders/make_transparent_logo.py` (PIL+scipy+numpy; optional 3rd arg bakes a solid bg color instead of transparency). Verified by compositing over cream and footer-green.
- Because the transparent version is now clean on the dark footer too (no cream counter blobs), **both** `public/logo.png` (navbar) and `public/logo-footer.png` (footer) now use the same transparent file — no separate green-baked version needed anymore. Downscaled to 660×660 and optimized → ~83 KB each (was 1.5 MB).
- Navbar still renders 96×96, footer 220×220, both `objectFit: contain` (square source, no distortion). Lamp+text reads small at 96px navbar — a lamp-only crop is still an option if desired later.

### 2026-06-18 — Navbar: stationary green background

- Navbar (`Navbar.tsx`) no longer starts transparent and turns cream on scroll. Background is now a stationary footer-green `#1a2a0f` with a subtle `1px solid rgba(255,255,255,0.08)` bottom border. Removed the scroll/open-driven background, backdrop blur, and cream-on-scroll logic.
- Text/links and the hamburger lines are now always light (`rgba(255,255,255,0.92)`). Reserve button switched to solid gold `#D4A853` with dark text so it pops on the green bar.
- `scrolled` state retained only for the subtle 112px→88px height shrink on scroll (background is fully stationary).
- Mobile full-screen overlay menu left as-is (cream `#FDFAF5` with dark links) — green top bar sits above it. Can be made green too if desired.
