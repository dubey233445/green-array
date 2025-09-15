import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  // TODO: delete product from DB
  console.log("Deleting product:", productId);

  return NextResponse.json({ success: true });
}
