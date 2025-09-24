import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const ForgotSchema = z.object({ email: z.string().email() });

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = ForgotSchema.parse(body);
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ ok: true });

    const token = crypto.randomBytes(32).toString("hex");
    const exp = new Date(Date.now() + 1000 * 60 * 15);
    user.resetToken = token;
    user.resetTokenExp = exp;
    await user.save();

    // Here you'd send email with link like `${origin}/reset-password?token=...`
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err?.issues) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


