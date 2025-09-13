import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Plant from "@/models/Plants";

export async function POST(req: Request) {
  try {
    const { name, description, price } = await req.json();

    if (!name || !description || !price) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const newPlant = new Plant({ name, description, price });
    await newPlant.save();

    return NextResponse.json(
      { message: "Plant added successfully", plant: newPlant },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding plant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
