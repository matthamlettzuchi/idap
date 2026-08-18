import type { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export type ActivityAction = "created" | "updated" | "deleted";

export async function logActivity(
  supabase: SupabaseServerClient,
  entry: {
    actorName: string | null;
    entityType: string;
    entityLabel: string;
    action: ActivityAction;
  }
) {
  const { error } = await supabase.from("admin_activity_log").insert({
    actor_name: entry.actorName,
    entity_type: entry.entityType,
    entity_label: entry.entityLabel,
    action: entry.action,
  });
  // Never let logging break the actual save — just report it.
  if (error) console.error("Failed to log admin activity:", error.message);
}