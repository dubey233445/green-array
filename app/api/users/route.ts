import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/db"; // your MongoDB connection

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("greenarray"); // your DB name
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("greenarray");

    // Delete user
    await db.collection("users").deleteOne({ _id: new ObjectId(params.id) });

    // Also delete their products
    await db.collection("products").deleteMany({ ownerId: params.id });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
