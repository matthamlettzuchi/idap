import { createClient } from "@/lib/supabase/server";

export type AdminContactFormSettings = {
  destination_email: string;
  sender_name: string;
};

// Fallback so the page still renders if the table hasn't been created yet.
const DEFAULT_CONTACT_FORM_SETTINGS: AdminContactFormSettings = {
  destination_email: "matthamlettzuchi@gmail.com",
  sender_name: "Intidata Website",
};

export async function getAdminContactFormSettings(): Promise<AdminContactFormSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_form_settings")
    .select("destination_email, sender_name")
    .eq("id", true)
    .maybeSingle();

  if (error || !data) return DEFAULT_CONTACT_FORM_SETTINGS;
  return data as AdminContactFormSettings;
}