import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
     const res = NextResponse.json({ success: true, username: user.username });
    res.cookies.set("token", token, {
      httpOnly: false, // ✅ allow frontend to read
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
