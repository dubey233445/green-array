import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Plant from "@/models/Plants";

export async function GET() {
  try {
    await connectDB();
    const plants = await Plant.find().sort({ createdAt: -1 });

    return NextResponse.json(plants, { status: 200 });
  } catch (error) {
    console.error("Error fetching plants:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
