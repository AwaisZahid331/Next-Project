import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { verifyAccessToken } from "@/lib/auth";

function getUserIdFromCookies(req) {
  const token = req.cookies.get("access_token")?.value;
  const payload = token ? verifyAccessToken(token) : null;
  return payload?.sub || null;
}

export async function PUT(req, { params }) {
  const userId = getUserIdFromCookies(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  const body = await req.json();
  const { title, notes } = body || {};
  await connectToDatabase();
  const item = await Item.findOneAndUpdate({ _id: id, userId }, { title, notes }, { new: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(req, { params }) {
  const userId = getUserIdFromCookies(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  await connectToDatabase();
  const result = await Item.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}


