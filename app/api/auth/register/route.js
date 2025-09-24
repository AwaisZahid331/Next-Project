import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { serialize } from "cookie";

const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = RegisterSchema.parse(body);

    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    const payload = { sub: user._id.toString(), email: user.email, name: user.name };
    const access = signAccessToken(payload);
    const refresh = signRefreshToken(payload);
    const res = NextResponse.json({ user: { id: user._id.toString(), name: user.name, email: user.email } }, { status: 201 });
    const common = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" };
    res.headers.append("Set-Cookie", serialize("access_token", access, { ...common, maxAge: 60 * 15 }));
    res.headers.append("Set-Cookie", serialize("refresh_token", refresh, { ...common, maxAge: 60 * 60 * 24 * 30 }));
    return res;
  } catch (err) {
    if (err?.issues) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


