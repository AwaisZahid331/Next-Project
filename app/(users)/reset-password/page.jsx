"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const search = useSearchParams();
  const token = search.get("token") || "";
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) setStatus({ ok: true, msg: "Password has been reset." });
      else setStatus({ ok: false, msg: "Invalid or expired token." });
    } catch (e) {
      setStatus({ ok: false, msg: "Network error" });
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md shadow-2xl p-8">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">Reset password</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-slate-300">New password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/10 transition" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-900/20 hover:from-blue-500 hover:to-indigo-500 transition">Reset password</button>
          {status && (
            <p className={`text-sm ${status.ok ? "text-green-400" : "text-red-400"}`}>{status.msg}</p>
          )}
        </form>
      </div>
    </main>
  );
}


