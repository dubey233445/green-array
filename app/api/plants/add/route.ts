import { NextRequest, NextResponse } from "next/server";
import { ensureSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, description, price } = await req.json();

    if (!name || !description || !price) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const sb = ensureSupabase();
    const { data, error } = await sb
      .from("plants")
      .insert({ name, description, price })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to add plant" }, { status: 500 });
    }

    return NextResponse.json({ message: "Plant added successfully", plant: data }, { status: 201 });
  } catch (error) {
    console.error("Error adding plant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
