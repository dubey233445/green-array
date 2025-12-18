import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ensureSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

                const sb = ensureSupabase();
                const { data: existingUser, error: existingErr } = await sb
                    .from("users")
                    .select("id")
                    .eq("username", username)
                    .maybeSingle();
                if (existingErr) {
                        return NextResponse.json({ error: "Database error" }, { status: 500 });
                }
                if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

                const { error: insertErr } = await sb
                    .from("users")
                    .insert({ username, password: hashedPassword });
                if (insertErr) {
                        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
                }

                return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (_error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
