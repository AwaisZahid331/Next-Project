import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { comparePassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { serialize } from "cookie";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = LoginSchema.parse(body);

    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const payload = { sub: user._id.toString(), email: user.email, name: user.name };
    const access = signAccessToken(payload);
    const refresh = signRefreshToken(payload);
    const res = NextResponse.json({ user: { id: user._id.toString(), name: user.name, email: user.email } }, { status: 200 });
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


