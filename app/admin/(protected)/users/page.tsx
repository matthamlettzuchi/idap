"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/ui/data-table";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";
import { USERNAME_MAX_LENGTH, normalizeUsername } from "@/lib/admin/username";

type CmsUserRow = {
  id: string;
  user_id: string;
  username: string;
  role: string;
  created_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<CmsUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usernameLength = normalizeUsername(username).length;
  const usernameOverLimit = usernameLength > USERNAME_MAX_LENGTH;
  const usernameNearLimit = !usernameOverLimit && usernameLength >= USERNAME_MAX_LENGTH * 0.9;

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

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (usernameOverLimit) return;
    setCreating(true);
    setError(null);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to create user.");
    } else {
      setUsername("");
      setPassword("");
      setRole("editor");
      await load();
    }
    setCreating(false);
  }

  async function handleDelete(user_id: string) {
    setUsers((prev) => prev.filter((u) => u.user_id !== user_id));
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    });
  }

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">Users</h1>

      <form
        onSubmit={handleCreate}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-(--panel-border) bg-panel p-5"
      >
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-4">
            <label className="text-[12px] font-medium text-ink-2">Username</label>
            <span
              className={`font-mono text-[11px] ${
                usernameOverLimit
                  ? "font-semibold text-red-500"
                  : usernameNearLimit
                    ? "text-amber-500"
                    : "text-ink-3"
              }`}
            >
              {usernameLength}/{USERNAME_MAX_LENGTH}
            </span>
          </div>
          <input
            type="text"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. jdoe"
            className={`w-48 rounded-lg border bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none transition-colors ${
              usernameOverLimit
                ? "border-red-500 focus:border-red-500"
                : "border-(--panel-border) focus:border-signal-teal"
            }`}
          />
          {usernameOverLimit && (
            <p className="mt-1 text-[11px] text-red-500">
              {usernameLength - USERNAME_MAX_LENGTH} char
              {usernameLength - USERNAME_MAX_LENGTH === 1 ? "" : "s"} over the limit
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Password</label>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="w-48 rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
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
          disabled={creating || usernameOverLimit}
          className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
        >
          {creating ? "Creating..." : "Create User"}
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
              { header: "Username", render: (u) => u.username },
              {
                header: "Role",
                render: (u) => (
                  <span className="rounded-full bg-panel-2 px-2.5 py-1 text-[11px] font-medium uppercase text-ink-1">
                    {u.role}
                  </span>
                ),
              },
              { header: "Added", render: (u) => new Date(u.created_at).toLocaleDateString() },
              {
                header: "Actions",
                render: (u) => (
                  <ConfirmButton
                    label="Delete"
                    confirmLabel="Delete user?"
                    onConfirm={() => handleDelete(u.user_id)}
                    className="text-[12.5px] font-medium text-red-500 hover:underline"
                  />
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}