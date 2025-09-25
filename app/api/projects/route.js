import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import { verifyAccessToken } from "@/lib/auth";

function getUserId(req) {
  const token = req.cookies.get("access_token")?.value;
  const payload = token ? verifyAccessToken(token) : null;
  return payload?.sub || null;
}

export async function GET(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const projects = await Project.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json({ projects });
}

export async function POST(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await req.json();
    const { title, description, imageUrl } = body || {};
    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    await connectToDatabase();
    const project = await Project.create({ userId, title, description, imageUrl });
    return NextResponse.json({ project }, { status: 201 });
  }
  return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
}


