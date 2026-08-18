// lib/admin/username.ts

// Supabase Auth is email/password based under the hood. To let CMS users
// sign in with a plain username instead of an email address, every admin
// account is created with a deterministic, non-routable email derived from
// its username — the username is the only thing anyone ever types or sees.
const AUTH_EMAIL_DOMAIN = "admin.intidatasolution.internal";

// Single source of truth for the display limit shown in the UI. Actual
// enforcement of the max length now happens in Postgres via the
// trg_truncate_admin_users trigger (admin_truncate_text_fields), so this
// constant is only used for the client-side counter/alert, not for
// rejecting or trimming values in the app layer.
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

// Character-set + minimum-length check only. The upper bound is no longer
// enforced here — a too-long username is still accepted by this check and
// gets silently trimmed by the database trigger on insert.
export function isValidUsername(raw: string): boolean {
  return /^[a-z0-9](?:[a-z0-9_.-]{1,}[a-z0-9])?$/.test(raw) && raw.length >= USERNAME_MIN_LENGTH;
}

export function usernameToAuthEmail(rawUsername: string): string {
  return `${normalizeUsername(rawUsername)}@${AUTH_EMAIL_DOMAIN}`;
}