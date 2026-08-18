// lib/admin/username.ts

// Supabase Auth is email/password based under the hood. To let CMS users
// sign in with a plain username instead of an email address, every admin
// account is created with a deterministic, non-routable email derived from
// its username — the username is the only thing anyone ever types or sees.
const AUTH_EMAIL_DOMAIN = "admin.intidatasolution.internal";

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

// 3-32 chars, lowercase letters/numbers, dots/dashes/underscores allowed
// in the middle only.
export function isValidUsername(raw: string): boolean {
  return /^[a-z0-9](?:[a-z0-9_.-]{1,30}[a-z0-9])?$/.test(raw);
}

export function usernameToAuthEmail(rawUsername: string): string {
  return `${normalizeUsername(rawUsername)}@${AUTH_EMAIL_DOMAIN}`;
}