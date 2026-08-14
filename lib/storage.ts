const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/+$/, "");
const SUPABASE_STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public`;

export function storageUrl(bucket: string, path: string) {
  return `${SUPABASE_STORAGE_BASE}/${bucket}/${path.replace(/^\/+/, "")}`;
}