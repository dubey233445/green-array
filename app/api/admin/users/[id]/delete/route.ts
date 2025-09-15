import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // TODO: delete user from DB
  console.log("Deleting user:", userId);

  return NextResponse.json({ success: true });
}
