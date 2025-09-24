import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const common = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" };
  res.headers.append("Set-Cookie", serialize("access_token", "", { ...common, maxAge: 0 }));
  res.headers.append("Set-Cookie", serialize("refresh_token", "", { ...common, maxAge: 0 }));
  return res;
}


