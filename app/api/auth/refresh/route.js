import { NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req) {
  const refresh = req.cookies.get("refresh_token")?.value;
  if (!refresh) return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  const payload = verifyRefreshToken(refresh);
  if (!payload) return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  const { sub, email, name } = payload;
  const access = signAccessToken({ sub, email, name });
  const res = NextResponse.json({ user: { id: sub, email, name } });
  const common = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" };
  res.headers.append("Set-Cookie", serialize("access_token", access, { ...common, maxAge: 60 * 15 }));
  return res;
}


