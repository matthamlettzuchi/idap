"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import type { AdminAboutPage } from "@/lib/admin/about";
import { logActivity } from "@/lib/admin/activity-log";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

// Shared CRUD sync for the five plain child tables (core_values, industries,
// journey, principles, process_steps). They don't have a slug to key off
// like products/services do, so instead we diff against whatever ids
// currently exist in the table: anything missing from the incoming list
// gets deleted, items with an id get updated, items without one get
// inserted — sort_order is rewritten from the array's current order every
// time, same as ProductsList/ServicesList reorder does.
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

export async function saveAboutPage(payload: AdminAboutPage) {
  const user = await requireCmsUser("admin");
  const supabase = await createClient();

  const { error: contentError } = await supabase
    .from("about_content")
    .upsert({ ...payload.content, id: true }, { onConflict: "id" });
  if (contentError) throw new Error(contentError.message);

  await syncListTable(supabase, "about_core_values", payload.coreValues);
  await syncListTable(supabase, "about_industries", payload.industries);
  await syncListTable(supabase, "about_journey", payload.journey);
  await syncListTable(supabase, "about_principles", payload.principles);
  await syncListTable(supabase, "about_process_steps", payload.processSteps);

  await logActivity(supabase, {
    actorName: user.email ?? null,
    entityType: "about",
    entityLabel: "About Us Page",
    action: "updated",
  });

  revalidatePath("/admin/about");
  revalidatePath("/about");
  revalidatePath("/");
}