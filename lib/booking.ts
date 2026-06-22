// Shared booking constants + pure helpers. Imported by both the client form and
// the server API routes. The SERVER is always authoritative (it recomputes
// totals and re-validates); the client uses these only for display/UX.
//
// PRICING MODEL: we rent PLOTS OF LAND, not tents. You pay $85 per plot, per
// night — flat, no matter how many tents you pitch on it. A plot's size just
// tells you what tent fits: a small plot fits a small tent, etc. Want more
// room? Rent more plots ($85 each). Capacity is measured in plots (1 plot = 1
// of the 50 sites).

export const CAPACITY = 50; // total plots

// Flat pricing: every plot is $85/night regardless of size. Sizes differ only
// in how big a tent fits, not in price.
export const PLOT_PRICE_PER_NIGHT = 85;

export const PLOT_SIZES = {
  small: { label: "Small plot", price: PLOT_PRICE_PER_NIGHT, people: 2, fits: "fits a small tent" },
  medium: { label: "Medium plot", price: PLOT_PRICE_PER_NIGHT, people: 4, fits: "fits a medium tent" },
  large: { label: "Large plot", price: PLOT_PRICE_PER_NIGHT, people: 8, fits: "fits a large tent" },
} as const;

export type PlotSize = keyof typeof PLOT_SIZES;
export const PLOT_ORDER: PlotSize[] = ["small", "medium", "large"];

export type PlotCounts = { small: number; medium: number; large: number };

// How many of the 50 plots each rental type consumes (regular = its plot count).
export const RENTAL_SITES = { whole: CAPACITY, half: CAPACITY / 2 } as const;

export type BookingKind = "regular" | "whole" | "half" | "camp";

// Hold durations (minutes): regular checkout is short, group requests get 48h
// for the owner to confirm + arrange payment.
export const HOLD_MINUTES = { regular: 30, group: 60 * 48 } as const;

export const MAX_CARS_PER_PLOT = 2;

export function nightsBetween(arrival: string, departure: string): number {
  if (!arrival || !departure) return 0;
  const a = new Date(arrival).getTime();
  const d = new Date(departure).getTime();
  if (Number.isNaN(a) || Number.isNaN(d) || d <= a) return 0;
  return Math.round((d - a) / 86_400_000);
}

export function totalPlots(t: PlotCounts): number {
  return (t.small || 0) + (t.medium || 0) + (t.large || 0);
}

export function maxGuests(t: PlotCounts): number {
  return (
    (t.small || 0) * PLOT_SIZES.small.people +
    (t.medium || 0) * PLOT_SIZES.medium.people +
    (t.large || 0) * PLOT_SIZES.large.people
  );
}

// Per-night price in whole dollars for a set of plots.
export function perNightDollars(t: PlotCounts): number {
  return (
    (t.small || 0) * PLOT_SIZES.small.price +
    (t.medium || 0) * PLOT_SIZES.medium.price +
    (t.large || 0) * PLOT_SIZES.large.price
  );
}

export function calcRegularTotalCents(t: PlotCounts, nights: number): number {
  return Math.round(perNightDollars(t) * Math.max(0, nights) * 100);
}

// Returns an error string if the regular booking is invalid, else null.
export function validateRegular(t: PlotCounts, cars: number, arrival: string, departure: string): string | null {
  const plots = totalPlots(t);
  if (plots < 1) return "Please add at least one plot.";
  if (nightsBetween(arrival, departure) < 1) return "Please choose valid arrival and departure dates.";
  const carsN = Math.max(0, Math.floor(cars || 0));
  if (carsN > plots * MAX_CARS_PER_PLOT) {
    return `Up to ${MAX_CARS_PER_PLOT} cars per plot — max ${plots * MAX_CARS_PER_PLOT} for ${plots} plot${plots > 1 ? "s" : ""}.`;
  }
  return null;
}

// Plots consumed by a group request.
export function groupSites(kind: BookingKind, campSites: number): number {
  if (kind === "whole") return RENTAL_SITES.whole;
  if (kind === "half") return RENTAL_SITES.half;
  if (kind === "camp") return Math.max(1, Math.floor(campSites || 0));
  return 0;
}

export function plotSummary(t: PlotCounts): string {
  return PLOT_ORDER.filter((k) => (t[k] || 0) > 0)
    .map((k) => `${t[k]} ${PLOT_SIZES[k].label}`)
    .join(", ");
}
