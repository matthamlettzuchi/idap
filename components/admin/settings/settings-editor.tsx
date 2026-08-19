"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, User, Link2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  updateDisplayName,
  updateAvatar,
  updatePassword,
} from "@/app/admin/(protected)/settings/actions";
import { useAdminTheme } from "@/lib/admin/theme-provider";
import type { CmsUser } from "@/lib/admin/auth";
import { FIELD_LIMITS } from "@/lib/admin/field-limits";
import { useToastStack, ToastStack } from "@/components/admin/ui/toast-stack";

function fieldClass(extra = "") {
  return `w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal ${extra}`;
}

export function SettingsEditor({ user }: { user: CmsUser }) {
  const { theme, setTheme } = useAdminTheme();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState(
    user.displayName ?? user.username,
  );
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pending, startTransition] = useTransition();
  const [avatarSaved, setAvatarSaved] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "error";
    text: string;
  } | null>(null);
  const { toasts, push, dismiss, dismissAll } = useToastStack();

  // Dirty tracking for the display name field — Save stays disabled until
  // it actually diverges from what's saved, same pattern as the other
  // page editors (product/service/about).
  const nameBaselineRef = useRef(user.displayName ?? user.username);
  const nameDirty = displayName !== nameBaselineRef.current;
  const nameOverLimit = displayName.length > FIELD_LIMITS.name;

  function saveAvatar(url: string | null) {
    startTransition(async () => {
      try {
        await updateAvatar(url);
        push("Profile picture updated.");
        router.refresh();
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Failed to save.");
      }
    });
  }

  function handleSaveName() {
    if (!nameDirty || nameOverLimit) return;
    setNameError(null);
    dismissAll();
    startTransition(async () => {
      try {
        await updateDisplayName(displayName);
        nameBaselineRef.current = displayName;
        push("Display name updated.");
        router.refresh();
      } catch (err) {
        setNameError(err instanceof Error ? err.message : "Failed to save.");
      }
    });
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    const path = `avatars/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("images").upload(path, file);

    if (error) {
      setUploading(false);
      setUploadError(`Upload failed: ${error.message}`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Get the public URL directly from Supabase instead of reconstructing
    // it manually — guarantees the URL actually matches the uploaded path.
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(path);
    setUploading(false);
    setAvatarUrl(urlData.publicUrl);
    saveAvatar(urlData.publicUrl);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleUseUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!/^https?:\/\//i.test(trimmed)) {
      setUrlError("URL must start with http:// or https://");
      return;
    }

    setUrlError(null);
    setAvatarUrl(trimmed);
    setUrlInput("");
    saveAvatar(trimmed);
  }

  function handleRemoveAvatar() {
    setAvatarUrl(null);
    saveAvatar(null);
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    startTransition(async () => {
      try {
        await updatePassword(newPassword);
        setNewPassword("");
        setConfirmPassword("");
        push("Password updated successfully.");
      } catch (err) {
        setPasswordMessage({
          type: "error",
          text:
            err instanceof Error ? err.message : "Failed to update password.",
        });
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-8 pb-16">
      {/* Profile Picture */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Profile Picture</div>
        <div className="flex items-center gap-5">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary/external hosted path (upload or imgbb)
            <img
              src={avatarUrl}
              alt=""
              className="h-16 w-16 shrink-0 rounded-full border border-(--panel-border) object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-(--panel-border-strong) text-ink-3">
              <User size={22} />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-signal-blue px-4 py-2 text-[12.5px] font-medium text-white">
              <Upload size={13} />
              {uploading ? "Uploading..." : "Upload new picture"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {avatarUrl && (
              <button
                onClick={handleRemoveAvatar}
                className="ml-3 text-[12px] font-medium text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
            {uploadError && (
              <p className="text-[11.5px] text-red-500">{uploadError}</p>
            )}
          </div>
        </div>

        <div className="border-t border-(--panel-border) pt-4">
          <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-ink-2">
            <Link2 size={13} /> Or paste an image URL (e.g. from imgbb.com)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (urlError) setUrlError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUseUrl();
                }
              }}
              placeholder="https://i.ibb.co/..."
              className={fieldClass("flex-1")}
            />
            <button
              type="button"
              onClick={handleUseUrl}
              className="shrink-0 rounded-lg bg-signal-blue px-4 py-2 text-[13px] font-medium text-white"
            >
              Use URL
            </button>
          </div>
          {urlError && (
            <p className="mt-1.5 text-[11.5px] text-red-500">{urlError}</p>
          )}
        </div>
      </section>

      {/* Display Name */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Display Name</div>
        <div className="flex items-center gap-3">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={fieldClass("flex-1")}
            placeholder="Your name"
          />
          <button
            onClick={handleSaveName}
            disabled={pending || !nameDirty || nameOverLimit}
            className="shrink-0 rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
          >
            Save
          </button>
        </div>
        {nameOverLimit && (
          <p className="text-[12px] font-medium text-red-500">
            Display name must be {FIELD_LIMITS.name} characters or fewer.
          </p>
        )}
        {nameError && <p className="text-[12px] text-red-500">{nameError}</p>}
        <p className="text-[11.5px] text-ink-2">
          Signed in as{" "}
          <span className="font-medium text-ink-0">@{user.username}</span> —
          your login username can&apos;t be changed here.
        </p>
      </section>

      {/* Password */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Password</div>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={fieldClass()}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={fieldClass()}
            />
          </div>
          {passwordMessage && (
            <p className="text-[12px] text-red-500">{passwordMessage.text}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
          >
            {pending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>

      {/* Appearance */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Appearance</div>
        <div className="flex items-center justify-between rounded-lg border border-(--panel-border) bg-panel-2 p-4">
          <div>
            <div className="text-[13.5px] font-medium text-ink-0">
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </div>
            <p className="mt-0.5 text-[12px] text-ink-2">
              Applies to the admin dashboard only.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-(--panel-border) bg-panel p-1">
            <button
              onClick={() => setTheme("light")}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                theme === "light" ? "bg-signal-blue text-white" : "text-ink-2"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                theme === "dark" ? "bg-signal-blue text-white" : "text-ink-2"
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </section>
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
