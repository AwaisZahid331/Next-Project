import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import { verifyAccessToken } from "@/lib/auth";

function getUserId(req) {
  const token = req.cookies.get("access_token")?.value;
  const payload = token ? verifyAccessToken(token) : null;
  return payload?.sub || null;
}

export async function PUT(req, { params }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  const body = await req.json();
  const { title, description, imageUrl } = body || {};
  await connectToDatabase();
  const project = await Project.findOneAndUpdate({ _id: id, userId }, { title, description, imageUrl }, { new: true });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(req, { params }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  await connectToDatabase();
  const result = await Project.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}


