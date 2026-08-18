"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import type { AdminHomePage } from "@/lib/admin/home";
import { logActivity } from "@/lib/admin/activity-log";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

// Same numeric-id diff/sync pattern as app/admin/(protected)/about/actions.ts
// — used for hero_stats, client_logos, faqs (plain serial id tables).
async function syncListTable<T extends { id?: number }>(
  supabase: SupabaseServerClient,
  table: string,
  items: T[]
) {
  const { data: existing, error: existingError } = await supabase.from(table).select("id");
  if (existingError) throw new Error(existingError.message);

  const existingIds = new Set((existing ?? []).map((r) => r.id as number));
  const keepIds = new Set(items.filter((i) => i.id != null).map((i) => i.id as number));

  const idsToDelete = [...existingIds].filter((id) => !keepIds.has(id));
  if (idsToDelete.length > 0) {
    const { error } = await supabase.from(table).delete().in("id", idsToDelete);
    if (error) throw new Error(error.message);
  }

  for (let index = 0; index < items.length; index++) {
    const { id, ...rest } = items[index];
    const row = { ...rest, sort_order: index };

    if (id != null) {
      const { error } = await supabase.from(table).update(row).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from(table).insert(row);
      if (error) throw new Error(error.message);
    }
  }
}

// hero_themes / seasonal_themes / testimonials use a slug-like TEXT primary
// key (not a serial), so instead of numeric id-diffing we upsert on "id"
// directly and delete rows whose id no longer appears in the incoming list.
async function syncTextIdTable<T extends { id: string }>(
  supabase: SupabaseServerClient,
  table: string,
  items: T[]
) {
  const { data: existing, error: existingError } = await supabase.from(table).select("id");
  if (existingError) throw new Error(existingError.message);

  const existingIds = new Set((existing ?? []).map((r) => r.id as string));
  const keepIds = new Set(items.map((i) => i.id));

  const idsToDelete = [...existingIds].filter((id) => !keepIds.has(id));
  if (idsToDelete.length > 0) {
    const { error } = await supabase.from(table).delete().in("id", idsToDelete);
    if (error) throw new Error(error.message);
  }

  for (let index = 0; index < items.length; index++) {
    const row = { ...items[index], sort_order: index };
    const { error } = await supabase.from(table).upsert(row, { onConflict: "id" });
    if (error) throw new Error(error.message);
  }
}

export async function saveHomePage(payload: AdminHomePage) {
  const user = await requireCmsUser("admin");
  const supabase = await createClient();

  await syncListTable(supabase, "hero_stats", payload.heroStats);
  await syncListTable(supabase, "client_logos", payload.clientLogos);
  await syncListTable(supabase, "faqs", payload.faqs);
  await syncTextIdTable(supabase, "hero_themes", payload.heroThemes);
  await syncTextIdTable(supabase, "seasonal_themes", payload.seasonalThemes);
  await syncTextIdTable(supabase, "testimonials", payload.testimonials);

  const { error: contactError } = await supabase
    .from("site_contact")
    .upsert({ ...payload.siteContact, id: 1 }, { onConflict: "id" });
  if (contactError) throw new Error(contactError.message);

  await logActivity(supabase, {
    actorName: user.email ?? null,
    entityType: "home",
    entityLabel: "Home Page",
    action: "updated",
  });

  revalidatePath("/admin/home");
  revalidatePath("/");
}