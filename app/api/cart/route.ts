import { NextResponse } from "next/server";

// Define type for cart item
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

// Use the type instead of `any[]`
let cart: CartItem[] = [];

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const item: CartItem = await req.json();
  cart.push(item);
  return NextResponse.json({ success: true, cart });
}

export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();
  cart = cart.filter((item) => item.id !== id);
  return NextResponse.json({ success: true, cart });
}
