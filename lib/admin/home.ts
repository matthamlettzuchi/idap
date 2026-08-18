import { createClient } from "@/lib/supabase/server";

export type AdminHeroStat = {
  id?: number;
  value: number;
  suffix: string;
  label: string;
};
export type AdminClientLogo = { id?: number; name: string; logo: string };
export type AdminFaq = { id?: number; question: string; answer: string };

export type AdminHeroTheme = {
  id: string;
  label: string;
  start_month: number;
  start_day: number;
  end_month: number;
  end_day: number;
  scale: number;
  image_offset_y: number;
  background_image: string | null;
  background_wash: string;
  character_image: string;
  character_alt: string;
  blob_gradient: string;
  greeting: string;
  is_default: boolean;
};

export type AdminSeasonalTheme = {
  id: string;
  label: string;
  start_month: number;
  start_day: number;
  end_month: number;
  end_day: number;
  decoration: "lampion" | "ramadan" | "snow";
  envelope_icon: "cny" | "ramadan" | "christmas";
  accent: string;
  envelope_title: string;
  envelope_message: string;
  is_default: boolean;
};

export type AdminTestimonial = {
  id: string;
  category: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  video_id: string;
};

export type AdminSiteContact = {
  address: string;
  email: string;
  phones: string[];
  whatsapp: string;
};

export type AdminHomePage = {
  heroStats: AdminHeroStat[];
  heroThemes: AdminHeroTheme[];
  clientLogos: AdminClientLogo[];
  faqs: AdminFaq[];
  seasonalThemes: AdminSeasonalTheme[];
  testimonials: AdminTestimonial[];
  siteContact: AdminSiteContact;
};

const DEFAULT_SITE_CONTACT: AdminSiteContact = {
  address: "",
  email: "",
  phones: [],
  whatsapp: "",
};

export async function getAdminHomePage(): Promise<AdminHomePage> {
  const supabase = await createClient();

  const [
    { data: heroStats },
    { data: heroThemes },
    { data: clientLogos },
    { data: faqs },
    { data: seasonalThemes },
    { data: testimonials },
    { data: siteContact },
  ] = await Promise.all([
    supabase
      .from("hero_stats")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("hero_themes")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("client_logos")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase.from("faqs").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("seasonal_themes")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase.from("site_contact").select("*").eq("id", 1).maybeSingle(),
  ]);

  return {
    heroStats: (heroStats as AdminHeroStat[]) ?? [],
    heroThemes: (heroThemes as AdminHeroTheme[]) ?? [],
    clientLogos: (clientLogos as AdminClientLogo[]) ?? [],
    faqs: (faqs as AdminFaq[]) ?? [],
    seasonalThemes: (seasonalThemes as AdminSeasonalTheme[]) ?? [],
    testimonials: (testimonials as AdminTestimonial[]) ?? [],
    siteContact:
      (siteContact as AdminSiteContact | null) ?? DEFAULT_SITE_CONTACT,
  };
}
