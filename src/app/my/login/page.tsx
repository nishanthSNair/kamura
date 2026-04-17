"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function MemberLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleEmailLogin(e: React.FormEvent) {
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

    router.push("/my");
  }

  async function handleGoogleLogin() {
    setError("");
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/my/auth/callback`,
      },
    });
    if (err) setError(err.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE7DB] px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-3xl tracking-[0.15em] text-gray-900">
            KAMURA
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mt-3">
            Member Sign In
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-200/60">
          <h1 className="font-serif text-2xl text-gray-900 mb-2">Welcome back</h1>
          <p className="text-sm text-gray-500 font-sans mb-8">
            Sign in to your wellness dashboard.
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full mb-5 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-sans font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-5">
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
                placeholder="you@email.com"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 font-sans mt-6">
            New to Kamura?{" "}
            <Link href="/my/signup" className="text-terracotta hover:underline">
              Create your account
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-400 font-sans mt-6">
          Are you a clinic or practitioner?{" "}
          <Link href="/provider/login" className="hover:text-terracotta underline">
            Provider sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
