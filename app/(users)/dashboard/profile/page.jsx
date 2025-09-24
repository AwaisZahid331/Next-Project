"use client";

import { useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector((s) => s.auth.user);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 text-slate-300">Name</div>
            <div className="text-lg">{user?.name || "Not available"}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 text-slate-300">Email</div>
            <div className="text-lg">{user?.email || "Not available"}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
