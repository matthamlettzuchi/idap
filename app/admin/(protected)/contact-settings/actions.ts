"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/activity-log";
import type { AdminContactFormSettings } from "@/lib/admin/contact-settings";

export async function saveContactFormSettings(payload: AdminContactFormSettings) {
  const user = await requireCmsUser("admin");
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_form_settings")
    .upsert({ ...payload, id: true }, { onConflict: "id" });
  if (error) throw new Error(error.message);

  await logActivity(supabase, {
    actorName: user.username ?? null,
    entityType: "contact_form_settings",
    entityLabel: "Contact Form Settings",
    action: "updated",
  });

  revalidatePath("/admin/contact-settings");
}