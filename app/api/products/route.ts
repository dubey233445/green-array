import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // your MongoDB connection

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("greenarray");
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("greenarray");

    await db.collection("products").deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
