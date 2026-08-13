import { cache } from "react";
import { supabase } from "@/lib/supabase";

export type AboutIconName =
  | "Search"
  | "PenTool"
  | "Workflow"
  | "Rocket"
  | "Building2"
  | "TrendingUp"
  | "Calculator"
  | "Sprout"
  | "Landmark";

export type AboutStat = { value: number; suffix?: string; label: string };
export type AboutHeroStat = AboutStat & { color?: string };

export type AboutContentRow = {
  hero_image: string;
  hero_heading_line_1: string;
  hero_heading_line_2: string;
  hero_description: string;
  hero_stats: AboutHeroStat[];
  vision_description: string;
  vision_stats: AboutStat[];
  mission_points: string[];
  solutions: string[];
  stats_lottie: string | null;
};

export type AboutJourneyRow = {
  id: number;
  era: string;
  title: string;
  body: string;
  sort_order: number;
};

export type AboutProcessStepRow = {
  id: number;
  icon: AboutIconName;
  label: string;
  body: string;
  sort_order: number;
};

export type AboutCoreValueRow = {
  id: number;
  title: string;
  desc: string;
  sort_order: number;
};

export type AboutIndustryRow = {
  id: number;
  icon: AboutIconName;
  title: string;
  body: string;
  sort_order: number;
};

export type AboutPrincipleRow = {
  id: number;
  label: string;
  body: string;
  sort_order: number;
};

// Fallback so the page still renders (with the original copy) if the
// Supabase table hasn't been created/seeded yet.
export const DEFAULT_ABOUT_CONTENT: AboutContentRow = {
  hero_image: "/table.png",
  hero_heading_line_1: "Building Digital Enterprise",
  hero_heading_line_2: "Foundations for 30+ Years.",
  hero_description:
    "A software solutions company focused on desktop, web, and mobile applications, serving small, medium, and large businesses, organizations, and institutions across Indonesia with personalized service and technology-driven innovation.",
  hero_stats: [
    { value: 30, suffix: "+", label: "Years Track Record", color: "text-signal-teal" },
    { value: 100, suffix: "%", label: "Custom Solutions", color: "text-ink-0" },
  ],
  vision_description:
    "To be a trusted provider of integrated IT solutions covering most of our clients' technology needs, freeing them to focus on what matters most: their core business.",
  vision_stats: [
    { value: 25, suffix: "+", label: "Years Experience" },
    { value: 17, suffix: "+", label: "Active Clients" },
    { value: 5, suffix: "", label: "Core Systems" },
  ],
  mission_points: [
    "Understanding our partners' needs, requirements, and challenges, then providing reliable and skilled resources for every project.",
    "Treating every project as part of an integrated plan built around each client's specific business needs.",
    "Creating synergy between our technical expertise and client needs to deliver complete IT solutions.",
    "Focusing on custom, tailored software: solutions that off-the-shelf products often can't provide.",
  ],
  solutions: [
    "MultiFinance System (LOS & LMS)",
    "Factoring Solutions",
    "Enterprise Accounting (GL/AR/AP)",
    "Payroll & Helpdesk Systems",
    "Plantation & Agribusiness System",
    "ERP, Licensing & Software Security",
  ],
  stats_lottie: "/animat.lottie",
};

export const getAboutContent = cache(async (): Promise<AboutContentRow> => {
  const { data, error } = await supabase.from("about_content").select("*").single();
  if (error || !data) {
    if (error) console.error("Supabase about_content fetch failed:", error.message);
    return DEFAULT_ABOUT_CONTENT;
  }
  return data as AboutContentRow;
});

export const getAboutJourney = cache(async (): Promise<AboutJourneyRow[]> => {
  const { data, error } = await supabase
    .from("about_journey")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Supabase about_journey fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});

export const getAboutProcessSteps = cache(async (): Promise<AboutProcessStepRow[]> => {
  const { data, error } = await supabase
    .from("about_process_steps")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Supabase about_process_steps fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});

export const getAboutCoreValues = cache(async (): Promise<AboutCoreValueRow[]> => {
  const { data, error } = await supabase
    .from("about_core_values")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Supabase about_core_values fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});

export const getAboutIndustries = cache(async (): Promise<AboutIndustryRow[]> => {
  const { data, error } = await supabase
    .from("about_industries")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Supabase about_industries fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});

export const getAboutPrinciples = cache(async (): Promise<AboutPrincipleRow[]> => {
  const { data, error } = await supabase
    .from("about_principles")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Supabase about_principles fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});