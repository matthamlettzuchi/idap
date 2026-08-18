import { createClient } from "@/lib/supabase/server";
import {
  defaultSiteButtons,
  defaultFooterContent,
  type SiteNavLink,
  type SiteButtons,
  type SiteFooterContent,
} from "@/lib/site-content-defaults";

export type AdminSiteContent = {
  navLinks: SiteNavLink[];
  buttons: SiteButtons;
  footerContent: SiteFooterContent;
};

export async function getAdminSiteContent(): Promise<AdminSiteContent> {
  const supabase = await createClient();

  const [{ data: navLinks }, { data: buttons }, { data: footerContent }] = await Promise.all([
    supabase.from("site_nav_links").select("*").order("sort_order", { ascending: true }),
    supabase.from("site_buttons").select("*").eq("id", true).maybeSingle(),
    supabase.from("site_footer_content").select("*").eq("id", true).maybeSingle(),
  ]);

  return {
    navLinks: (navLinks as SiteNavLink[]) ?? [],
    buttons: (buttons as SiteButtons) ?? defaultSiteButtons,
    footerContent: (footerContent as SiteFooterContent) ?? defaultFooterContent,
  };
}