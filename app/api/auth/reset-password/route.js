import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

const ResetSchema = z.object({ token: z.string().min(10), password: z.string().min(6).max(128) });

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, password } = ResetSchema.parse(body);
    await connectToDatabase();
    const user = await User.findOne({ resetToken: token, resetTokenExp: { $gt: new Date() } });
    if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

    user.passwordHash = await hashPassword(password);
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err?.issues) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


