"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-(--panel-border) bg-panel p-8">
        <h1 className="font-display text-[22px] font-semibold text-ink-0">Admin Login</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">Sign in to manage Intidata content.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3.5 py-2.5 text-[14px] text-ink-0 outline-none focus:border-signal-teal"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3.5 py-2.5 text-[14px] text-ink-0 outline-none focus:border-signal-teal"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-[13px] text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-signal-blue py-3 text-[14px] font-medium text-white disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}