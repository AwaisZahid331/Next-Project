import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const url = new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  const res = NextResponse.redirect(url);
  const common = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" };
  res.headers.append("Set-Cookie", serialize("access_token", "", { ...common, maxAge: 0 }));
  res.headers.append("Set-Cookie", serialize("refresh_token", "", { ...common, maxAge: 0 }));
  return res;
}
