import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { CAPACITY } from "@/lib/booking";

export const dynamic = "force-dynamic";

// GET /api/availability?arrival=YYYY-MM-DD&departure=YYYY-MM-DD
// Returns how many of the 50 tent sites are free across the requested nights.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");

  if (!arrival || !departure) {
    return NextResponse.json({ error: "Missing arrival or departure date." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc("get_availability", {
      p_arrival: arrival,
      p_departure: departure,
    });
    if (error) throw error;
    const available = typeof data === "number" ? data : 0;
    return NextResponse.json({ available, capacity: CAPACITY });
  } catch (err) {
    console.error("availability error:", err);
    return NextResponse.json({ error: "Could not check availability." }, { status: 500 });
  }
}
