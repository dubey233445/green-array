import { NextResponse } from "next/server";
import { ensureSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const sb = ensureSupabase();
    const { data, error } = await sb
      .from("plants")
      .select("id,name,description,price,image,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json({ error: "Failed to fetch plants" }, { status: 500 });
    }
    return NextResponse.json(data ?? [], { status: 200 });
  } catch (error) {
    console.error("Plants API error:", error);
    return NextResponse.json({ error: "Failed to fetch plants" }, { status: 500 });
  }
}
