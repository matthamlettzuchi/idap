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
  testimonialVideoId: 20,
  testimonialCategory: 40,

  // Contact / footer / nav
  address: 200,
  email: 100,
  phone: 30,
  navLabel: 30,
  navHref: 200,
  footerDescription: 300,
  copyrightName: 80,
  socialUrl: 200,
  whatsappLink: 200,

  // About page
  aboutHeadingLine: 60,
  aboutDescription: 400,
  missionPoint: 200,
  solutionItem: 60,
  journeyEra: 20,
  journeyTitle: 60,
  journeyBody: 240,
  coreValueTitle: 60,
  coreValueDesc: 160,
  industryTitle: 60,
  industryBody: 160,
  principleLabel: 60,
  principleBody: 160,

  // Hero / seasonal themes (Home page)
  entityId: 40,
  themeLabel: 40,
  characterAlt: 100,
  cssGradient: 200,
  greeting: 60,
  envelopeTitle: 60,
  envelopeMessage: 300,
  lottieUrl: 300,
  statSuffix: 8,
  statLabel: 60,

  clientLogoName: 60,

  // Generic fallbacks for anything not mapped yet
  shortLabel: 40,
  mediumLabel: 100,
  longText: 500,
} as const;

export type FieldLimitKey = keyof typeof FIELD_LIMITS;

// Caps how many rows a given repeatable list can hold. Enforced in
// ListFieldEditor (hides/disables "Add") — this is a UX/data-sanity bound,
// not a security boundary, so it lives purely on the frontend.
export const MAX_ITEMS = {
  quickFacts: 6,
  overviewParagraphs: 4,
  advantages: 8,
  features: 8,
  heroFloatIcons: 6,
  homeMetrics: 4,
  homeModules: 6,
  highlights: 4,
  gridItems: 8,
  techGroups: 6,
  processSteps: 6,
  heroStats: 4,
  visionStats: 4,
  missionPoints: 6,
  solutions: 8,
  journeySteps: 12,
  coreValues: 8,
  industries: 8,
  principles: 8,
  heroThemes: 8,
  seasonalThemes: 8,
  testimonials: 20,
  clientLogos: 20,
  faqs: 12,
  navLinks: 8,
  phones: 4,
} as const;

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