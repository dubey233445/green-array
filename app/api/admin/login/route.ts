import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Simple cookie-based session
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin", "true", { httpOnly: true });
    return res;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
