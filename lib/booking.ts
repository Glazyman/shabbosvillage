// Shared booking constants + pure helpers. Imported by both the client form and
// the server API routes. The SERVER is always authoritative (it recomputes
// totals and re-validates); the client uses these only for display/UX.
//
// PRICING MODEL: we rent PLOTS OF LAND, not tents. You pay $85 per plot, per
// night — flat, no matter how many tents you pitch on it. A plot's size just
// tells you what tent fits: a small plot fits a small tent, etc. RV spots are
// also available at $100 per night. Want more room? Rent more units (each is
// priced per night). Capacity is measured in sites (1 plot or 1 RV = 1 of the
// 50 sites).

export const CAPACITY = 50; // total sites

// Tent plots are a flat $85/night regardless of size; an RV spot is $100/night.
export const PLOT_PRICE_PER_NIGHT = 85;
export const RV_PRICE_PER_NIGHT = 100;

export const PLOT_SIZES = {
  small: { label: "Small plot", price: PLOT_PRICE_PER_NIGHT, people: 2, fits: "fits a small tent" },
  medium: { label: "Medium plot", price: PLOT_PRICE_PER_NIGHT, people: 4, fits: "fits a medium tent" },
  large: { label: "Large plot", price: PLOT_PRICE_PER_NIGHT, people: 8, fits: "fits a large tent" },
  rv: { label: "RV spot", price: RV_PRICE_PER_NIGHT, people: 6, fits: "for an RV or camper" },
} as const;

export type PlotSize = keyof typeof PLOT_SIZES;
export const PLOT_ORDER: PlotSize[] = ["small", "medium", "large", "rv"];

export type PlotCounts = Record<PlotSize, number>;

// How many of the 50 sites each rental type consumes (regular = its unit count).
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
  return PLOT_ORDER.reduce((sum, k) => sum + (t[k] || 0), 0);
}

export function maxGuests(t: PlotCounts): number {
  return PLOT_ORDER.reduce((sum, k) => sum + (t[k] || 0) * PLOT_SIZES[k].people, 0);
}

// Per-night price in whole dollars for a set of units.
export function perNightDollars(t: PlotCounts): number {
  return PLOT_ORDER.reduce((sum, k) => sum + (t[k] || 0) * PLOT_SIZES[k].price, 0);
}

export function calcRegularTotalCents(t: PlotCounts, nights: number): number {
  return Math.round(perNightDollars(t) * Math.max(0, nights) * 100);
}

// Returns an error string if the regular booking is invalid, else null.
export function validateRegular(t: PlotCounts, cars: number, arrival: string, departure: string): string | null {
  const plots = totalPlots(t);
  if (plots < 1) return "Please add at least one plot or RV spot.";
  if (nightsBetween(arrival, departure) < 1) return "Please choose valid arrival and departure dates.";
  const carsN = Math.max(0, Math.floor(cars || 0));
  if (carsN > plots * MAX_CARS_PER_PLOT) {
    return `Up to ${MAX_CARS_PER_PLOT} cars per site — max ${plots * MAX_CARS_PER_PLOT} for ${plots} site${plots > 1 ? "s" : ""}.`;
  }
  return null;
}

// Sites consumed by a group request.
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
