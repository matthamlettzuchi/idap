// app/admin/(protected)/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/ui/data-table";

type CmsUserRow = { id: string; user_id: string; role: string; email: string; created_at: string };

export default function UsersPage() {
  const [users, setUsers] = useState<CmsUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setError(null);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to invite user.");
    } else {
      setEmail("");
      await load();
    }
    setInviting(false);
  }

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">Users</h1>

      <form onSubmit={handleInvite} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-(--panel-border) bg-panel p-5">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64 rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "editor")}
            className="rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={inviting}
          className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
        >
          {inviting ? "Inviting..." : "Invite User"}
        </button>
        {error && <p className="w-full text-[12.5px] text-red-500">{error}</p>}
      </form>

      <div className="mt-6">
        {loading ? (
          <p className="text-[13px] text-ink-2">Loading...</p>
        ) : (
          <DataTable
            rows={users}
            rowKey={(u) => u.id}
            columns={[
              { header: "Email", render: (u) => u.email },
              {
                header: "Role",
                render: (u) => (
                  <span className="rounded-full bg-panel-2 px-2.5 py-1 text-[11px] font-medium uppercase text-ink-1">
                    {u.role}
                  </span>
                ),
              },
              { header: "Added", render: (u) => new Date(u.created_at).toLocaleDateString() },
            ]}
          />
        )}
      </div>
    </div>
  );
}