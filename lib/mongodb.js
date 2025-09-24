import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || undefined;

if (!MONGODB_URI) {
  console.warn("[mongodb] Missing MONGODB_URI. Set it in .env.local");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Create .env.local in project root and restart dev server.");
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DB,
      })
      .then((m) => m)
      .catch((err) => {
        console.error("[mongodb] connection error", err?.message);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
