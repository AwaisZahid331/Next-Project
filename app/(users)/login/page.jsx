"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Loader from "@/components/ui/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import Link from "next/link";
import { gsap } from "gsap";

export default function LoginPage() {
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);

  // GSAP animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([cardRef.current, titleRef.current, inputsRef.current, buttonRef.current], { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(cardRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(inputsRef.current, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const dispatch = useDispatch();

  async function onSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        const next = search.get("next") || "/dashboard";
        window.location.href = next;
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Invalid credentials");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4"
    >
      {loading && <Loader label="Loging..." />}
      {/* Card */}
      <div ref={cardRef} className="w-full max-w-md relative rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md shadow-2xl p-8">
        <h1 ref={titleRef} className="text-2xl font-semibold text-white text-center mb-6">
          Log in to your account
        </h1>

        <form className="space-y-4" onSubmit={onSubmit} style={{fontSize:"1rem"}}>
          {[
            { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
            { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
          ].map((field, index) => (
            <Tippy key={field.id} content={error && index === 1 ? error : null} placement="top" visible={!!error && index === 1}>
              <div ref={(node) => { inputsRef.current[index] = node; }} className="group">
              <label htmlFor={field.id} className="block text-sm mb-1 text-slate-300">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/10 transition"
              />
              </div>
            </Tippy>
          ))}

          <div className="flex justify-between items-center text-sm text-slate-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-slate-700 text-blue-500 focus:ring-0" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </div>

          <button
            ref={buttonRef}
            type="submit"
            className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-900/20 hover:from-blue-500 hover:to-indigo-500 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Log in"}
          </button>

          <p className="text-center text-sm text-slate-300 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
