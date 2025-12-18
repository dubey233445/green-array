import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ensureSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const sb = ensureSupabase();
    const { data: user, error: userErr } = await sb
      .from("users")
      .select("id, username, password")
      .eq("username", username)
      .maybeSingle();
    if (userErr) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "JWT secret is not configured" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: "1h" }
    );

    const res = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
