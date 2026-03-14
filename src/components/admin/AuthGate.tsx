"use client";

import { useState, useEffect, type ReactNode } from "react";

export default function AuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthed(true);
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  }

  // Loading state
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-moss border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login form
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-1">KAMURA Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-moss mb-3"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-moss text-white py-2.5 rounded-lg text-sm font-medium hover:bg-forest transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
