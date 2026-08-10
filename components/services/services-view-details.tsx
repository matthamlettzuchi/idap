"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Wallet,
  Puzzle,
  Users2,
  Clock,
  Workflow,
  TrendingUp,
  Download,
  FileText,
  Code2,
  Globe,
  Smartphone,
  Wrench,
  Palette,
  Rocket,
  Settings2,
  Building2,
  BarChart3,
  LayoutDashboard,
  Link2,
  RefreshCw,
  Search,
  PenTool,
  Zap,
  Cloud,
  Monitor,
  Tablet,
  Gauge,
  Lock,
  Bug,
  Headset,
  ActivitySquare,
  ClipboardList,
  Eye,
  Map as MapIcon,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/marquee";
import { clientLogos } from "@/lib/data";
import { serviceDetails, type ServiceIconName } from "@/lib/service-details";

function toTitleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function placeholder(width: number, height: number, label: string) {
  return `https://placehold.co/${width}x${height}/eef1ff/2f4bd0?text=${encodeURIComponent(
    label,
  )}`;
}

const serviceIconMap: Record<ServiceIconName, LucideIcon> = {
  Code2,
  Globe,
  Layers,
  Smartphone,
  Wrench,
  Palette,
  Rocket,
  Settings2,
  ShieldCheck,
  Building2,
  Workflow,
  BarChart3,
  LayoutDashboard,
  Link2,
  RefreshCw,
  Search,
  PenTool,
  CheckCircle2,
  Zap,
  Users2,
  Cloud,
  Monitor,
  Tablet,
  Gauge,
  Lock,
  Bug,
  Headset,
  Clock,
  ActivitySquare,
  ClipboardList,
  Eye,
  Wallet,
  TrendingUp,
  Map: MapIcon,
  Lightbulb,
};

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const defaultFeatureCards: { icon: LucideIcon; title: string; desc: string }[] =
  [
    {
      icon: Puzzle,
      title: "Seamless Integrations",
      desc: "Connect cleanly with the tools and systems your team already relies on.",
    },
    {
      icon: Zap,
      title: "Reduce Costs Year-Round",
      desc: "Optimized workflows that lower operational overhead as you scale.",
    },
    {
      icon: Layers,
      title: "50+ Apps & Powerful Integrations",
      desc: "Plug into the tools your team already uses without friction.",
    },
    {
      icon: ShieldCheck,
      title: "Built-In Reliability",
      desc: "Consistent uptime and support baked into every engagement.",
    },
  ];

const heroFloatCards = [
  { top: "-10%", left: "-25%", size: 72, delay: 0 },
  { top: "-6%", left: "120%", size: 64, delay: 0.5 },
  { top: "64%", left: "-18%", size: 68, delay: 1 },
  { top: "85%", left: "110%", size: 76, delay: 1.5 },
];

const whyCards = [
  {
    icon: Layers,
    title: "Modern Architecture",
    desc: "Built on a modular stack designed to scale with your business as requirements grow.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "No hidden costs or surprise fees — you know exactly what you're paying for from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    desc: "Every system we build follows strict security and compliance standards from the ground up.",
  },
];

const trackChecklist = [
  "Get full project visibility at a glance",
  "Deploy updates easily and securely",
  "Get live support whenever you need it",
];

const specialistItems = [
  {
    icon: Workflow,
    title: "First Working Process",
    desc: "A clear discovery-to-delivery pipeline so nothing falls through the cracks.",
  },
  {
    icon: Users2,
    title: "Dedicated Team",
    desc: "A consistent team of engineers who understand your business end to end.",
  },
  {
    icon: Clock,
    title: "24/7 Hours Support",
    desc: "Responsive support long after go-live, whenever an issue comes up.",
  },
];

const barSeeds = [42, 68, 55, 88, 64];

export function ServiceDetailView({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const displayTitle = toTitleCase(title);
  const detail = serviceDetails[slug];
  const accent = detail?.accent ?? "#2f4bd0";

  const featureCards = detail?.gridSection
    ? detail.gridSection.items.slice(0, 4).map((item) => ({
        icon: serviceIconMap[item.icon],
        title: item.title,
        desc: item.desc,
      }))
    : defaultFeatureCards;

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-28">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="ledger-lines-texture pointer-events-none absolute inset-0" />

          <div className="container-x relative">
            <div className="relative mx-auto max-w-2xl py-10 text-center lg:py-16">
              {/* floating decorative avatar/photo cards */}
              {heroFloatCards.map((c, i) => (
                <motion.div
                  key={i}
                  aria-hidden
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: c.delay,
                  }}
                  className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel shadow-[0_20px_40px_-16px_rgba(17,24,39,0.25)] lg:block"
                  style={{
                    top: c.top,
                    left: c.left,
                    width: c.size,
                    height: c.size,
                  }}
                >
                  <img
                    src={placeholder(c.size * 2, c.size * 2, "Photo")}
                    alt="Placeholder"
                    className="h-full w-full object-cover grayscale"
                  />
                </motion.div>
              ))}

              <motion.div
                aria-hidden
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-[10%] top-[-2%] hidden items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-panel px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(17,24,39,0.3)] lg:flex"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-blue-dim text-signal-teal">
                  <ArrowDownRight size={13} />
                </span>
                <div className="text-left">
                  <div className="text-[10.5px] text-ink-2">Delivered</div>
                  <div className="font-mono text-[12.5px] font-semibold text-ink-0">
                    12 Sprints
                  </div>
                </div>
              </motion.div>

              <motion.div
                aria-hidden
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="pointer-events-none absolute right-[10%] bottom-[-4%] hidden items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-panel px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(17,24,39,0.3)] lg:flex"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-blue-dim text-signal-teal">
                  <ArrowUpRight size={13} />
                </span>
                <div className="text-left">
                  <div className="text-[10.5px] text-ink-2">Shipped</div>
                  <div className="font-mono text-[12.5px] font-semibold text-ink-0">
                    v2.4 Release
                  </div>
                </div>
              </motion.div>

              <Reveal>
                <h1 className="font-display text-[clamp(32px,5.4vw,52px)] font-bold leading-[1.05] tracking-tight text-ink-0">
                  Building {displayTitle} has never been easier
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mx-auto mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink-1">
                  End-to-end {title} and technical execution in a single
                  partnership. Meet the team ready to help you realize it.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild size="default">
                    <a href="#kontak">
                      Get Started <ArrowRight size={15} />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="default">
                    <a href="#kontak">Request Demo</a>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= TRUSTED BY ================= */}
        <section className="relative border-y border-[var(--panel-border)] bg-surface py-10">
          <Reveal className="container-x mb-6 text-center">
            <p className="text-[13px] font-medium text-ink-2">
              Trusted by 30+ enterprise and financial institutions across
              Indonesia.
            </p>
          </Reveal>
          <Marquee items={clientLogos} />
        </section>

        {/* ================= WHY US — 3 CARDS ================= */}
        <section className="relative bg-void py-24">
          <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="container-x relative">
            <Reveal className="mx-auto max-w-xl text-center">
              <span className="mono-label">Why Intidata</span>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                Specially engineered for {title}.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {whyCards.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-[var(--panel-border)] bg-panel p-7 transition-colors hover:bg-panel-2">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: hexToRgba(accent, 0.12),
                        color: accent,
                      }}
                    >
                      <c.icon size={19} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 font-display text-[16px] font-medium text-ink-0">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                      {c.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRACK PROGRESS — MOCKUP + TEXT ================= */}
        <section className="relative overflow-hidden bg-surface py-24">
          <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel p-7 shadow-[0_30px_60px_-24px_rgba(17,24,39,0.25)]">
                <div className="mono-label">Quick Overview</div>
                <div className="mt-5 flex items-center">
                  {["D", "S", "A", "B", "M"].map((initial, i) => (
                    <span
                      key={i}
                      style={{ marginLeft: i === 0 ? 0 : -10 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-panel bg-[image:var(--grad-signal)] text-[12px] font-semibold text-white"
                    >
                      {initial}
                    </span>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="flex items-center justify-between text-[12px] text-ink-2">
                    <span>Progress</span>
                    <span>72%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-panel-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "72%" }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-[image:var(--grad-signal)]"
                    />
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[var(--panel-border)] bg-panel-2 p-4">
                    <div className="text-[12px] text-ink-2">Completed</div>
                    <div className="mt-1 flex items-center gap-1 font-display text-[20px] font-semibold text-ink-0">
                      24{" "}
                      <ArrowDownRight size={14} className="text-signal-teal" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--panel-border)] bg-panel-2 p-4">
                    <div className="text-[12px] text-ink-2">In Progress</div>
                    <div className="mt-1 flex items-center gap-1 font-display text-[20px] font-semibold text-ink-0">
                      6 <TrendingUp size={14} className="text-signal-blue" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="mono-label">Why Choose Us</span>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                Track your project the best way possible.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-1">
                End-to-end {title} and delivery tracking in a single solution.
                Meet the platform built to help you stay in control.
              </p>
              <ul className="mt-7 space-y-3.5">
                {trackChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: accent }}
                    />
                    <span className="text-[14.5px] text-ink-1">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ================= SPECIALIST — TEXT + PHOTO ================= */}
        <section className="relative overflow-hidden bg-void py-24">
          <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="mono-label">Why Choose Us</span>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                Specialists helping clients solve technical challenges.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-1">
                End-to-end {title} delivered by a team that understands your
                operational reality, not just the spec sheet.
              </p>

              <div className="mt-9 space-y-6">
                {specialistItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: hexToRgba(accent, 0.12),
                        color: accent,
                      }}
                    >
                      <item.icon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="font-display text-[15px] font-medium text-ink-0">
                        {item.title}
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative">
              <div className="relative mx-auto max-w-sm">
                {/* quarter-circle nongol dari belakang sudut kanan-atas foto */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-3 z-0 h-16 w-16"
                  style={{ background: accent, borderTopRightRadius: "100%" }}
                />
                <div className="relative z-10 overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel-2">
                  <img
                    src={placeholder(520, 640, "Team+Photo")}
                    alt="Placeholder"
                    className="h-[420px] w-full object-cover grayscale"
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-6 bottom-8 hidden w-52 rounded-xl border border-[var(--panel-border)] bg-panel p-4 shadow-[0_20px_40px_-16px_rgba(17,24,39,0.3)] sm:block"
              >
                <div className="text-[11px] text-ink-2">Total Progress</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display text-[19px] font-semibold text-ink-0">
                    82%
                  </span>
                  <span className="text-[11px] font-medium text-signal-teal">
                    +14%
                  </span>
                </div>
                <div className="mt-3 flex h-[36px] items-end gap-1.5">
                  {barSeeds.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full rounded-sm"
                      style={{
                        background: "linear-gradient(180deg, #2fe0c2, #4b64ff)",
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-surface py-24">
          <div className="container-x relative">
            <Reveal className="max-w-lg">
              <h2 className="text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                Features that make a difference.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-1">
                End-to-end {title} and technical execution in a single solution.
                Meet the platform built to help you realize it.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featureCards.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--panel-border)] bg-panel p-6">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        background: hexToRgba(accent, 0.12),
                        color: accent,
                      }}
                    >
                      <c.icon size={17} strokeWidth={1.75} />
                    </span>
                    <div className="mt-6">
                      <div className="font-display text-[15px] font-medium text-ink-0">
                        {c.title}
                      </div>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR FEATURE — PHOTO + TEXT ================= */}
        <section className="relative overflow-hidden bg-void py-24">
          <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal className="relative order-2 lg:order-1">
              <div className="relative isolate mx-auto max-w-sm">
                {/* quarter-circle nongol dari belakang sudut kiri-bawah foto */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-3 -bottom-3 z-20 h-16 w-16"
                  style={{ background: accent, borderBottomLeftRadius: "100%" }}
                />
                <div className="relative z-0 overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel-2">
                  <img
                    src={placeholder(520, 640, "Feature+Photo")}
                    alt="Placeholder"
                    className="h-[420px] w-full object-cover grayscale"
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 top-10 hidden items-center gap-2.5 rounded-xl border border-[var(--panel-border)] bg-panel px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(17,24,39,0.3)] sm:flex"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: hexToRgba(accent, 0.12), color: accent }}
                >
                  <ArrowUpRight size={14} />
                </span>
                <div>
                  <div className="text-[11px] font-medium text-ink-0">
                    Feature Shipped
                  </div>
                  <div className="text-[10.5px] text-ink-2">2 hours ago</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -right-6 bottom-16 hidden items-center gap-2.5 rounded-xl border border-[var(--panel-border)] bg-panel px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(17,24,39,0.3)] sm:flex"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: hexToRgba(accent, 0.12), color: accent }}
                >
                  <ArrowUpRight size={14} />
                </span>
                <div>
                  <div className="text-[11px] font-medium text-ink-0">
                    Deployed on Time
                  </div>
                  <div className="text-[10.5px] text-ink-2">Today, 09:41</div>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <span className="mono-label">Our Feature</span>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                Ship {title} quickly, from anywhere.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-1">
                Stay close to delivery with real-time visibility into every
                sprint, release, and support ticket — wherever your team is
                working from.
              </p>
              <Button asChild size="default" className="mt-8">
                <a href="#kontak">
                  Get Started <ArrowRight size={15} />
                </a>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="relative overflow-hidden bg-signal-blue py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-[clamp(28px,3.6vw,42px)] font-semibold leading-tight text-white">
                We are here to help you
                <br />
                grow your business.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mx-auto max-w-sm rounded-2xl border border-[var(--panel-border)] bg-panel p-7 shadow-[0_30px_60px_-20px_rgba(17,24,39,0.4)]">
                <div className="space-y-4">
                  <div>
                    <label className="mono-label !text-[10px]">Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="mt-2 w-full rounded-lg border border-[var(--panel-border)] bg-panel-2 px-3.5 py-2.5 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="mono-label !text-[10px]">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="mt-2 w-full rounded-lg border border-[var(--panel-border)] bg-panel-2 px-3.5 py-2.5 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="mono-label !text-[10px]">Message</label>
                    <input
                      type="text"
                      placeholder="Tell us about your project"
                      className="mt-2 w-full rounded-lg border border-[var(--panel-border)] bg-panel-2 px-3.5 py-2.5 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal"
                      readOnly
                    />
                  </div>
                  <Button
                    asChild
                    variant="primary"
                    className="mt-2 w-full justify-center"
                  >
                    <a href="#kontak">Send Message</a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= DOWNLOAD / RESOURCES ================= */}
        <section className="relative bg-void py-24 text-center">
          <div className="container-x relative">
            <Reveal className="mx-auto max-w-xl">
              <span className="mono-label">Get Started</span>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                Download our free {title} guide.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-1">
                End-to-end {title} and technical execution in a single solution.
                Meet the team ready to help you realize it.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="default">
                  <a href="#kontak">
                    <Download size={15} /> Download Brochure
                  </a>
                </Button>
                <Button asChild variant="ghost" size="default">
                  <a href="#kontak">
                    <FileText size={15} /> Request Demo
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}
