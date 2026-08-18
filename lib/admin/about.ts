import { createClient } from "@/lib/supabase/server";
import type { AboutIconName } from "@/lib/about";

export type AboutStat = { value: number; suffix?: string; label: string };
export type AboutHeroStat = AboutStat & { color?: string };

export type AdminAboutContentRow = {
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

// `id` is present once loaded from the DB, absent for a freshly-added
// list item — the same "id present = update, id absent = insert" pattern
// used by syncListTable in actions.ts.
export type AdminAboutCoreValue = { id?: number; title: string; desc: string };
export type AdminAboutIndustry = {
  id?: number;
  icon: AboutIconName;
  title: string;
  body: string;
};
export type AdminAboutJourneyStep = { id?: number; era: string; title: string; body: string };
export type AdminAboutPrinciple = { id?: number; label: string; body: string };
export type AdminAboutProcessStep = {
  id?: number;
  icon: AboutIconName;
  label: string;
  body: string;
};

export type AdminAboutPage = {
  content: AdminAboutContentRow;
  coreValues: AdminAboutCoreValue[];
  industries: AdminAboutIndustry[];
  journey: AdminAboutJourneyStep[];
  principles: AdminAboutPrinciple[];
  processSteps: AdminAboutProcessStep[];
};

const DEFAULT_CONTENT: AdminAboutContentRow = {
  hero_image: "",
  hero_heading_line_1: "",
  hero_heading_line_2: "",
  hero_description: "",
  hero_stats: [],
  vision_description: "",
  vision_stats: [],
  mission_points: [],
  solutions: [],
  stats_lottie: null,
};

export async function getAdminAboutPage(): Promise<AdminAboutPage> {
  const supabase = await createClient();

  const [
    { data: content },
    { data: coreValues },
    { data: industries },
    { data: journey },
    { data: principles },
    { data: processSteps },
  ] = await Promise.all([
    supabase.from("about_content").select("*").eq("id", true).maybeSingle(),
    supabase.from("about_core_values").select("*").order("sort_order", { ascending: true }),
    supabase.from("about_industries").select("*").order("sort_order", { ascending: true }),
    supabase.from("about_journey").select("*").order("sort_order", { ascending: true }),
    supabase.from("about_principles").select("*").order("sort_order", { ascending: true }),
    supabase.from("about_process_steps").select("*").order("sort_order", { ascending: true }),
  ]);

  return {
    content: (content as AdminAboutContentRow) ?? DEFAULT_CONTENT,
    coreValues: (coreValues as AdminAboutCoreValue[]) ?? [],
    industries: (industries as AdminAboutIndustry[]) ?? [],
    journey: (journey as AdminAboutJourneyStep[]) ?? [],
    principles: (principles as AdminAboutPrinciple[]) ?? [],
    processSteps: (processSteps as AdminAboutProcessStep[]) ?? [],
  };
}