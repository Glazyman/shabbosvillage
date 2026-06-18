// Shared booking constants + pure helpers. Imported by both the client form and
// the server API routes. The SERVER is always authoritative (it recomputes
// totals and re-validates); the client uses these only for display/UX.

export const CAPACITY = 50; // total tent sites

export const TENT_SIZES = {
  small: { label: "Small", price: 85, people: 2 },
  medium: { label: "Medium", price: 100, people: 4 },
  large: { label: "Large", price: 120, people: 8 },
} as const;

export type TentSize = keyof typeof TENT_SIZES;
export const TENT_ORDER: TentSize[] = ["small", "medium", "large"];

export type TentCounts = { small: number; medium: number; large: number };

// How many of the 50 sites each rental type consumes (regular = its tent count).
export const RENTAL_SITES = { whole: CAPACITY, half: CAPACITY / 2 } as const;

export type BookingKind = "regular" | "whole" | "half" | "camp";

// Hold durations (minutes): regular checkout is short, group requests get 48h
// for the owner to confirm + arrange payment.
export const HOLD_MINUTES = { regular: 30, group: 60 * 48 } as const;

export const MAX_CARS_PER_TENT = 2;

export function nightsBetween(arrival: string, departure: string): number {
  if (!arrival || !departure) return 0;
  const a = new Date(arrival).getTime();
  const d = new Date(departure).getTime();
  if (Number.isNaN(a) || Number.isNaN(d) || d <= a) return 0;
  return Math.round((d - a) / 86_400_000);
}

export function totalTents(t: TentCounts): number {
  return (t.small || 0) + (t.medium || 0) + (t.large || 0);
}

export function maxGuests(t: TentCounts): number {
  return (
    (t.small || 0) * TENT_SIZES.small.people +
    (t.medium || 0) * TENT_SIZES.medium.people +
    (t.large || 0) * TENT_SIZES.large.people
  );
}

// Per-night price in whole dollars for a set of tents.
export function perNightDollars(t: TentCounts): number {
  return (
    (t.small || 0) * TENT_SIZES.small.price +
    (t.medium || 0) * TENT_SIZES.medium.price +
    (t.large || 0) * TENT_SIZES.large.price
  );
}

export function calcRegularTotalCents(t: TentCounts, nights: number): number {
  return Math.round(perNightDollars(t) * Math.max(0, nights) * 100);
}

// Returns an error string if the regular booking is invalid, else null.
export function validateRegular(t: TentCounts, cars: number, arrival: string, departure: string): string | null {
  const tents = totalTents(t);
  if (tents < 1) return "Please add at least one tent.";
  if (nightsBetween(arrival, departure) < 1) return "Please choose valid arrival and departure dates.";
  const carsN = Math.max(0, Math.floor(cars || 0));
  if (carsN > tents * MAX_CARS_PER_TENT) {
    return `Up to ${MAX_CARS_PER_TENT} cars per tent — max ${tents * MAX_CARS_PER_TENT} for ${tents} tent${tents > 1 ? "s" : ""}.`;
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

export function tentSummary(t: TentCounts): string {
  return TENT_ORDER.filter((k) => (t[k] || 0) > 0)
    .map((k) => `${t[k]} ${TENT_SIZES[k].label}`)
    .join(", ");
}
