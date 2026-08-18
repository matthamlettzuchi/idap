// Single source of truth for every text field's max length across the CMS.
// SEO fields (title/description) are sized to standard SERP pixel widths
// (~580px title, ~920px description) approximated in characters; slug
// follows common permalink guidance (~75 chars). Everything else has a
// sane bound so no field is ever unbounded.
export const FIELD_LIMITS = {
  // SEO
  seoTitle: 60,
  seoDescription: 160,
  slug: 75,

  // Articles
  articleTitle: 100,
  articleExcerpt: 200,
  articleCategory: 40,
  articleTag: 30,

  // Products / Services
  code: 12,
  name: 80,
  tagline: 140,
  navDesc: 140,
  heroTitle: 120,
  heroDesc: 320,
  quickFact: 40,
  advantageTitle: 60,
  advantageSubtitle: 120,
  featureTitle: 60,
  featureBody: 160,
  processStepTitle: 60,
  processStepBody: 160,
  techGroupLabel: 40,
  techItem: 30,
  overviewParagraph: 800,

  // FAQ / Testimonials
  faqQuestion: 150,
  faqAnswer: 500,
  testimonialQuote: 500,
  testimonialName: 60,
  testimonialRole: 60,
  testimonialCompany: 80,
  testimonialInitials: 4,

  // Contact / footer / nav
  address: 200,
  email: 100,
  phone: 30,
  navLabel: 30,
  footerDescription: 300,
  copyrightName: 80,

  // Generic fallbacks for anything not mapped yet
  shortLabel: 40,
  mediumLabel: 100,
  longText: 500,
} as const;

export type FieldLimitKey = keyof typeof FIELD_LIMITS;

export function truncate(value: string | null | undefined, key: FieldLimitKey): string {
  if (!value) return value ?? "";
  const limit = FIELD_LIMITS[key];
  return value.length > limit ? value.slice(0, limit) : value;
}

// Truncates a whole object's string fields in one pass — used server-side
// right before every Supabase insert/update as the app-layer half of
// defense-in-depth (the DB trigger is the other half).
export function truncateFields<T extends Record<string, unknown>>(
  obj: T,
  mapping: Partial<Record<keyof T, FieldLimitKey>>
): T {
  const result = { ...obj };
  for (const field in mapping) {
    const key = mapping[field];
    const value = result[field];
    if (key && typeof value === "string") {
      (result[field] as unknown) = truncate(value, key);
    }
  }
  return result;
}