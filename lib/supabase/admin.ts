// lib/supabase/admin.ts
import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// SERVICE ROLE — only ever imported from Route Handlers / Server Actions.
// The `server-only` import above makes Next.js throw a build error if this
// file is ever pulled into a Client Component bundle.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}