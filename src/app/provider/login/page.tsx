"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ProviderLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push("/provider/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE7DB] px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-3xl tracking-[0.15em] text-gray-900">
            KAMURA
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mt-3">
            Provider Portal
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-200/60"
        >
          <h1 className="font-serif text-2xl text-gray-900 mb-2">Welcome back</h1>
          <p className="text-sm text-gray-500 font-sans mb-8">
            Sign in to manage your bookings, availability, and earnings.
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                placeholder="you@clinic.com"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                placeholder="Your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 px-6 py-3.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-500 font-sans mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/provider/signup" className="text-terracotta hover:underline">
              Register your business
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
