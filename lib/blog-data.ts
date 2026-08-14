import {
  Cpu,
  Cloud,
  Workflow,
  TrendingUp,
  Code2,
  ShieldCheck,
  Database,
  BarChart3,
  Landmark,
  Building2,
  Factory,
  Network,
  type LucideIcon,
} from "lucide-react";

export type BlogCategory =
  | "Technology"
  | "Business"
  | "Digital Transformation"
  | "Finance"
  | "Software"
  | "Industry Insights";

export const blogCategories: BlogCategory[] = [
  "Technology",
  "Business",
  "Digital Transformation",
  "Finance",
  "Software",
  "Industry Insights",
];

export type BlogThumbPattern = "grid" | "dots" | "diagonal" | "chevron";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  author: { name: string; role: string; initials: string };
  icon: LucideIcon;
  pattern: BlogThumbPattern;
  featured?: boolean;
};

// NOTE: thumbnails are rendered as icon + pattern placeholders (see
// ArticleThumb in blog-view.tsx) rather than photography, so the page has
// no missing-image gaps before real article photography is shot/sourced.
// Swap in a real `image` field + <Image> once assets exist — the card
// layout already reserves a consistent 16:9 slot for it.
export const blogPosts: BlogPost[] = [
  {
    slug: "single-source-of-truth-enterprise-software",
    title: "Why Enterprise Software Needs a Single Source of Truth",
    excerpt:
      "Disconnected systems quietly cost financial institutions more than any single license fee. Here's what changes when every module reads from one core.",
    category: "Technology",
    date: "12 Agustus 2026",
    readTime: "7 mins read",
    author: { name: "Ayu Ramadhani", role: "Solutions Architect", initials: "AR" },
    icon: Database,
    pattern: "grid",
    featured: true,
  },
  {
    slug: "digital-transformation-roadmap-financial-institutions",
    title: "A Digital Transformation Roadmap for Financial Institutions",
    excerpt:
      "Transformation projects fail more often from sequencing than from technology. A practical, phase-by-phase approach for multifinance and factoring companies.",
    category: "Digital Transformation",
    date: "8 Agustus 2026",
    readTime: "9 mins read",
    author: { name: "Bimo Santoso", role: "Head of Consulting", initials: "BS" },
    icon: Workflow,
    pattern: "diagonal",
    featured: true,
  },
  {
    slug: "signs-loan-origination-system-holding-you-back",
    title: "5 Signs Your Loan Origination System Is Holding You Back",
    excerpt:
      "From manual SLIK checks to disconnected scoring, these are the operational symptoms that usually point to an aging LOS.",
    category: "Software",
    date: "3 Agustus 2026",
    readTime: "6 mins read",
    author: { name: "Clara Wibisono", role: "Product Lead, FISCUS", initials: "CW" },
    icon: Code2,
    pattern: "dots",
    featured: true,
  },
  {
    slug: "cloud-vs-on-premise-regulated-industries",
    title: "Cloud vs. On-Premise: Choosing Infrastructure for Regulated Industries",
    excerpt:
      "OJK compliance, data residency, and uptime guarantees all shape this decision differently than a typical SaaS deployment.",
    category: "Technology",
    date: "29 Juli 2026",
    readTime: "8 mins read",
    author: { name: "Dimas Prakoso", role: "Infrastructure Lead", initials: "DP" },
    icon: Cloud,
    pattern: "grid",
  },
  {
    slug: "automation-manual-reconciliation-multifinance",
    title: "How Automation Reduces Manual Reconciliation in Multifinance",
    excerpt:
      "Reconciliation errors compound quietly across branches. A look at where automated matching pays for itself fastest.",
    category: "Business",
    date: "24 Juli 2026",
    readTime: "5 mins read",
    author: { name: "Elena Kusuma", role: "Business Analyst", initials: "EK" },
    icon: TrendingUp,
    pattern: "chevron",
  },
  {
    slug: "understanding-ojk-reporting-slik-silaras",
    title: "Understanding OJK Reporting Requirements: SLIK & SILARAS Explained",
    excerpt:
      "A practical breakdown of what each report actually verifies, and why period-comparison accuracy matters more than most teams assume.",
    category: "Finance",
    date: "19 Juli 2026",
    readTime: "10 mins read",
    author: { name: "Farid Nugraha", role: "Compliance Advisor", initials: "FN" },
    icon: Landmark,
    pattern: "dots",
  },
  {
    slug: "resilient-systems-palm-oil-plantation-operations",
    title: "Building Resilient Systems for Palm Oil Plantation Operations",
    excerpt:
      "Field connectivity is unreliable by nature. Here's how estate-and-mill systems are designed to keep working anyway.",
    category: "Industry Insights",
    date: "14 Juli 2026",
    readTime: "7 mins read",
    author: { name: "Galih Saputra", role: "Product Lead, Planta", initials: "GS" },
    icon: Factory,
    pattern: "diagonal",
  },
  {
    slug: "real-cost-of-legacy-systems-financial-services",
    title: "The Real Cost of Legacy Systems in Financial Services",
    excerpt:
      "License fees are the visible cost. Workarounds, shadow spreadsheets, and onboarding time are the ones that don't show up on an invoice.",
    category: "Business",
    date: "9 Juli 2026",
    readTime: "6 mins read",
    author: { name: "Hana Puspita", role: "Client Success Lead", initials: "HP" },
    icon: Building2,
    pattern: "grid",
  },
  {
    slug: "api-first-architecture-system-integration",
    title: "API-First Architecture: Why It Matters for System Integration",
    excerpt:
      "When accounting, funding, and reporting all need to talk to each other, the integration layer decides how much of that stays maintainable.",
    category: "Software",
    date: "2 Juli 2026",
    readTime: "8 mins read",
    author: { name: "Indra Wicaksana", role: "Engineering Lead", initials: "IW" },
    icon: Network,
    pattern: "chevron",
  },
  {
    slug: "what-fintech-can-learn-from-core-banking",
    title: "What Fintech Can Learn from 30 Years of Core Banking Systems",
    excerpt:
      "Core banking got audit trails and reconciliation right decades before it was fashionable. Some of that discipline is worth borrowing.",
    category: "Industry Insights",
    date: "26 Juni 2026",
    readTime: "9 mins read",
    author: { name: "Jasmine Andini", role: "Industry Analyst", initials: "JA" },
    icon: Cpu,
    pattern: "dots",
  },
  {
    slug: "shield-check-audit-trail-multifinance",
    title: "Audit Trails That Actually Hold Up During an OJK Review",
    excerpt:
      "Logging every transaction is the easy part. Structuring that log so an auditor can actually use it is where most systems fall short.",
    category: "Finance",
    date: "20 Juni 2026",
    readTime: "6 mins read",
    author: { name: "Kevin Halim", role: "Risk & Compliance", initials: "KH" },
    icon: ShieldCheck,
    pattern: "diagonal",
  },
  {
    slug: "reporting-dashboards-financial-decision-making",
    title: "Designing Reporting Dashboards People Actually Check Daily",
    excerpt:
      "Most operational dashboards get opened once a month, right before a meeting. Here's what makes the difference.",
    category: "Technology",
    date: "15 Juni 2026",
    readTime: "5 mins read",
    author: { name: "Lestari Handayani", role: "UX Lead", initials: "LH" },
    icon: BarChart3,
    pattern: "grid",
  },
];

export const featuredPosts = blogPosts.filter((p) => p.featured);