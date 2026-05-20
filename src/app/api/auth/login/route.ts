import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyPassword, createToken, COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Anti-timing-attack delay (600ms)
  await new Promise((r) => setTimeout(r, 600));

  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Credentials required" }, { status: 400 });
  }

  const { data: user } = await supabaseAdmin
    .from("pr_users")
    .select("id, email, password_hash, role, active")
    .eq("email", email.toLowerCase())
    .single();

  if (!user || !user.active) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createToken({ userId: user.id, email: user.email, role: user.role });

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8h
    path: "/",
  });
  return res;
}
