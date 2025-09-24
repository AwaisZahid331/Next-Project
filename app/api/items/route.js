import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { verifyAccessToken } from "@/lib/auth";

function getUserIdFromCookies(req) {
  const token = req.cookies.get("access_token")?.value;
  const payload = token ? verifyAccessToken(token) : null;
  return payload?.sub || null;
}

export async function GET(req) {
  const userId = getUserIdFromCookies(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const items = await Item.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json({ items });
}

export async function POST(req) {
  const userId = getUserIdFromCookies(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, notes } = body || {};
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  await connectToDatabase();
  const item = await Item.create({ userId, title, notes });
  return NextResponse.json({ item }, { status: 201 });
}


