import { NextResponse } from "next/server";
import { connectDB } from "./../../../../lib/db";
import Plant from "./../../../../models/Plants";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const user = (await params).id;
  const plant = await Plant.findById(user);
  if (!plant) {
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }
  return NextResponse.json(plant);
}
