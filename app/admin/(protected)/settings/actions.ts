"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";

export async function updateDisplayName(displayName: string) {
  const user = await requireCmsUser();
  const supabase = await createClient();
  const trimmed = displayName.trim();
  if (!trimmed) throw new Error("Display name can't be empty.");

  const { error } = await supabase
    .from("admin_users")
    .update({ display_name: trimmed })
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/admin", "layout");
}

export async function updateAvatar(avatarUrl: string | null) {
  const user = await requireCmsUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("admin_users")
    .update({ avatar_url: avatarUrl })
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/admin", "layout");
}

export async function updatePassword(newPassword: string) {
  await requireCmsUser();
  const supabase = await createClient();

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw new Error(error.message);
}