"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import type { AdminSiteContent } from "@/lib/admin/site-content";
import type { SiteNavLink } from "@/lib/site-content-defaults";
import { logActivity } from "@/lib/admin/activity-log";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

// Same numeric-id diff/sync pattern as home/actions.ts and about/actions.ts.
async function syncNavLinks(supabase: SupabaseServerClient, items: SiteNavLink[]) {
  const { data: existing, error: existingError } = await supabase
    .from("site_nav_links")
    .select("id");
  if (existingError) throw new Error(existingError.message);

  const existingIds = new Set((existing ?? []).map((r) => r.id as number));
  const keepIds = new Set(items.filter((i) => i.id != null).map((i) => i.id as number));

  const idsToDelete = [...existingIds].filter((id) => !keepIds.has(id));
  if (idsToDelete.length > 0) {
    const { error } = await supabase.from("site_nav_links").delete().in("id", idsToDelete);
    if (error) throw new Error(error.message);
  }

  for (let index = 0; index < items.length; index++) {
    const { id, ...rest } = items[index];
    const row = { ...rest, sort_order: index };

    if (id != null) {
      const { error } = await supabase.from("site_nav_links").update(row).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("site_nav_links").insert(row);
      if (error) throw new Error(error.message);
    }
  }
}

export async function saveSiteContent(payload: AdminSiteContent) {
  const user = await requireCmsUser("admin");
  const supabase = await createClient();

  await syncNavLinks(supabase, payload.navLinks);

  const { error: buttonsError } = await supabase
    .from("site_buttons")
    .upsert({ ...payload.buttons, id: true }, { onConflict: "id" });
  if (buttonsError) throw new Error(buttonsError.message);

  const { error: footerError } = await supabase
    .from("site_footer_content")
    .upsert({ ...payload.footerContent, id: true }, { onConflict: "id" });
  if (footerError) throw new Error(footerError.message);

  await logActivity(supabase, {
    actorName: user.username ?? null,
    entityType: "site_content",
    entityLabel: "Site Content",
    action: "updated",
  });

  revalidatePath("/", "layout");
}