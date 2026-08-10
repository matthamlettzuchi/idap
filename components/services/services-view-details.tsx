// components/services/services-view-details.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
  Map,
  Lightbulb,
  Boxes,
  Database,
  Network,
  Building,
  HeartHandshake,
  BrainCircuit,
  Mail,
  Phone,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/ui/reveal";
import { sectionTones } from "@/lib/section-tones";
import { contact } from "@/lib/data";
import type { ServiceDetail, ServiceIconName } from "@/lib/service-details";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  Map,
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

/* ------------------------------------------------------------------ */
/* Generic value-prop copy — derived from highlights when present,    */
/* falls back to universal engineering principles otherwise so every  */
/* service page (even ones without `highlights`) gets this section.   */
/* ------------------------------------------------------------------ */
const defaultPrinciples = [
  {
    icon: Boxes,
    tag: "Tailored",
    body: "Every system is scoped around your actual workflow, not a generic template.",
  },
  {
    icon: ShieldCheck,
    tag: "Secure",
    body: "Security and reliability are built in from architecture, not patched on afterward.",
  },
  {
    icon: Layers,
    tag: "Scalable",
    body: "Architecture designed to grow with transaction volume and organizational scale.",
  },
];

const differentiators = [
  {
    icon: BrainCircuit,
    title: "Business Understanding",
    body: "We map your operational process before proposing a single technical decision.",
  },
  {
    icon: Code2,
    title: "Technology Expertise",
    body: "Engineering practices proven across financial and enterprise-grade systems.",
  },
  {
    icon: Network,
    title: "Integration Ready",
    body: "Built to connect cleanly with existing core systems, not to replace them wholesale.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Support",
    body: "Systems are maintained as a relationship, not shipped and abandoned.",
  },
];

const pipelineStages = [
  "Business Requirements",
  "Business Logic",
  "Software Architecture",
  "Application",
  "Integration",
  "Operational System",
];

const stageLabels = ["DISCOVER", "DESIGN", "BUILD", "DELIVER"];

function gridCols(count: number) {
  if (count <= 3) return "sm:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "sm:grid-cols-2 lg:grid-cols-4";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

/* ------------------------------------------------------------------ */
/* Abstract "engineering environment" visual — layered architecture   */
/* nodes + a monitor silhouette. No people, no readable code.         */
/* ------------------------------------------------------------------ */
function HeroTechVisual({ accent }: { accent: string }) {
  return (
    <div className="relative h-[420px] w-full max-w-[440px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[32px] blur-[70px]"
        style={{ background: hexToRgba(accent, 0.28) }}
      />
      <svg viewBox="0 0 440 420" className="relative h-full w-full" fill="none">
        {/* faint layer grid */}
        {[80, 160, 240, 320].map((y, i) => (
          <motion.line
            key={y}
            x1="30"
            y1={y}
            x2="410"
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: EASE_OUT }}
          />
        ))}

        {/* monitor silhouette, right side */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
        >
          <rect x="220" y="60" width="170" height="112" rx="6" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          <rect x="232" y="72" width="146" height="88" rx="2" fill="rgba(255,255,255,0.03)" />
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={240}
              y={82 + i * 18}
              width={i % 2 === 0 ? 100 : 70}
              height="6"
              rx="2"
              fill={hexToRgba(accent, 0.5)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "240px center" }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: EASE_OUT }}
            />
          ))}
          <rect x="290" y="172" width="30" height="14" fill="rgba(255,255,255,0.15)" />
          <rect x="270" y="186" width="70" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
        </motion.g>

        {/* architecture nodes, left side */}
        {[
          { x: 70, y: 100, r: 20 },
          { x: 60, y: 200, r: 15 },
          { x: 110, y: 270, r: 18 },
          { x: 60, y: 340, r: 12 },
        ].map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            stroke={hexToRgba(accent, 0.55)}
            strokeWidth="1.5"
            fill={hexToRgba(accent, 0.08)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: EASE_OUT }}
          />
        ))}

        {/* connecting lines between nodes + monitor */}
        {[
          [70, 100, 220, 90],
          [60, 200, 220, 130],
          [110, 270, 220, 150],
          [60, 340, 90, 300],
          [90, 300, 110, 270],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.08, ease: EASE_OUT }}
          />
        ))}

        {/* traveling signal */}
        <motion.circle
          r="3"
          fill={accent}
          animate={{
            cx: [70, 220, 70],
            cy: [100, 90, 100],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
        />
      </svg>
    </div>
  );
}

/* Layered "Business → Applications → Integration → Data → Infrastructure" diagram */
function CapabilityDiagram({ accent }: { accent: string }) {
  const layers = ["Business", "Applications", "Integration", "Data", "Infrastructure"];
  return (
    <div className="relative flex flex-col gap-3">
      {layers.map((label, i) => (
        <Reveal key={label} delay={i * 0.06} className="relative">
          <div
            className="flex items-center justify-between rounded-lg border px-5 py-3.5"
            style={{
              borderColor: hexToRgba(accent, 0.25 - i * 0.02),
              background: hexToRgba(accent, 0.05 - i * 0.005),
              marginLeft: `${i * 14}px`,
            }}
          >
            <span className="font-mono text-[11px] tracking-wide text-ink-2">
              0{i + 1}
            </span>
            <span className="font-display text-[14.5px] font-medium text-ink-0">
              {label}
            </span>
          </div>
          {i < layers.length - 1 && (
            <div
              className="ml-[calc(50%-0.5px)] h-3 w-px"
              style={{ background: hexToRgba(accent, 0.3), marginLeft: `${i * 14 + 26}px` }}
            />
          )}
        </Reveal>
      ))}
    </div>
  );
}

/* Abstract enterprise workstation / dashboard environment visual */
function EnterpriseEnvironmentVisual({ accent }: { accent: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel">
      <div className="circuit-texture pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full blur-[90px]"
        style={{ background: hexToRgba(accent, 0.22) }}
      />
      <div className="relative flex h-full items-center justify-center gap-4 p-8 sm:gap-6">
        {/* left small panel */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="hidden h-[62%] w-[18%] rounded-lg border border-[var(--panel-border-strong)] bg-panel-2 p-2.5 sm:block"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="mb-1.5 h-1.5 rounded-full bg-[var(--panel-border-strong)]"
              style={{ width: `${60 + (i % 3) * 15}%` }}
            />
          ))}
        </motion.div>

        {/* main dashboard panel */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="h-[78%] w-[58%] rounded-lg border border-[var(--panel-border-strong)] bg-panel-2 p-3 sm:w-[46%]"
        >
          <div className="flex h-full flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink-3/50" />
              <span className="h-2 w-2 rounded-full bg-ink-3/50" />
              <span className="h-2 w-2 rounded-full bg-ink-3/50" />
            </div>
            <div className="flex flex-1 items-end gap-1.5 rounded-md border border-[var(--panel-border)] bg-panel p-2.5">
              {[38, 62, 48, 80, 56, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE_OUT }}
                  className="flex-1 rounded-sm"
                  style={{ background: hexToRgba(accent, 0.7) }}
                />
              ))}
            </div>
            <div className="h-3.5 rounded-sm border border-[var(--panel-border)] bg-panel" />
          </div>
        </motion.div>

        {/* right small panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="hidden h-[62%] w-[18%] rounded-lg border border-[var(--panel-border-strong)] bg-panel-2 p-2.5 sm:flex sm:flex-col sm:items-center sm:justify-center"
        >
          <div
            className="h-14 w-14 rounded-full border-2"
            style={{ borderColor: hexToRgba(accent, 0.5) }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function ServiceDetailView({
  service,
  related,
}: {
  service: ServiceDetail;
  related: ServiceDetail[];
}) {
  const Icon = serviceIconMap[service.icon];
  const accent = service.accent;

  const principles = service.highlights?.length
    ? service.highlights.map((h) => ({
        icon: serviceIconMap[h.icon],
        tag: h.title,
        body: h.desc,
      }))
    : defaultPrinciples.map((p) => ({ icon: p.icon, tag: p.tag, body: p.body }));

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-28 pb-24">
        {/* ================= HERO ================= */}
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-b border-[var(--panel-border)] lg:py-28"
        >
          <div className="circuit-texture pointer-events-none absolute inset-0 opacity-50" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full blur-[120px]"
            style={{ background: `radial-gradient(circle, ${hexToRgba(accent, 0.3)}, transparent 65%)` }}
          />

          <div className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-xl">
              <Reveal className="flex items-center gap-2 text-[12.5px] text-ink-2">
                <Link href="/#service" className="transition-colors hover:text-white">
                  Services
                </Link>
                <span>/</span>
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold"
                  style={{
                    color: "#dce6ff",
                    background: hexToRgba(accent, 0.22),
                    border: `1px solid ${hexToRgba(accent, 0.4)}`,
                  }}
                >
                  {service.code}
                </span>
              </Reveal>

              <Reveal delay={0.06} className="mt-6 flex items-center gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_20px_40px_-16px_rgba(0,0,0,0.4)]"
                  style={{ background: accent }}
                >
                  <Icon size={24} strokeWidth={1.75} />
                </span>
              </Reveal>

              <Reveal delay={0.12}>
                <h1 className="mt-6 font-display text-[clamp(32px,4.2vw,50px)] font-semibold leading-[1.06] text-white">
                  {service.heroTitle}
                </h1>
                <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink-1">
                  {service.heroDesc}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#kontak"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: accent }}
                  >
                    Konsultasi Sekarang <ArrowRight size={15} />
                  </a>
                  <Link
                    href="/#service"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-panel-2 px-6 py-3 text-[14px] font-medium text-ink-0 transition-colors hover:bg-panel"
                  >
                    Lihat Layanan Lain
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="hidden justify-center lg:flex">
              <HeroTechVisual accent={accent} />
            </div>
          </div>
        </section>

        {/* ================= VALUE PROPS — editorial numbered row ================= */}
        <section style={sectionTones.light} className="relative bg-void py-20 border-b border-[var(--panel-border)]">
          <div className="container-x">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
              {principles.slice(0, 3).map((p, i) => (
                <Reveal key={p.tag} delay={i * 0.08}>
                  <div className={i > 0 ? "sm:border-l sm:border-[var(--panel-border)] sm:pl-8" : ""}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[13px] text-ink-3">
                        0{i + 1}
                      </span>
                      <span style={{ color: accent }}>
                        <p.icon size={18} strokeWidth={1.75} />
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[16.5px] font-medium text-ink-0">
                      {p.tag}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CAPABILITY MAP ================= */}
        {service.gridSection && (
          <section
            style={sectionTones.dark}
            className="relative overflow-hidden bg-void py-28 border-b border-[var(--panel-border)]"
          >
            <div className="wave-stream-texture pointer-events-none absolute inset-0 opacity-60" />
            <div className="container-x relative max-w-6xl">
              <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-start">
                <Reveal>
                  <span className="mono-label" style={{ color: accent }}>
                    {service.gridSection.label}
                  </span>
                  <h2 className="mt-3 text-[clamp(28px,3.4vw,40px)] font-semibold text-white">
                    {service.gridSection.title}
                  </h2>
                  {service.gridSection.desc && (
                    <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-ink-1">
                      {service.gridSection.desc}
                    </p>
                  )}
                </Reveal>
                <Reveal delay={0.1}>
                  <CapabilityDiagram accent={accent} />
                </Reveal>
              </div>

              {/* editorial list, alternating rhythm instead of equal tiles */}
              <div className="mt-16 divide-y divide-[var(--panel-border)] border-t border-[var(--panel-border)]">
                {service.gridSection.items.map((item, i) => {
                  const ItemIcon = serviceIconMap[item.icon];
                  return (
                    <Reveal key={item.title} delay={i * 0.05}>
                      <div className="grid grid-cols-1 items-baseline gap-3 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ background: hexToRgba(accent, 0.14), color: accent }}
                        >
                          <ItemIcon size={16} strokeWidth={1.75} />
                        </span>
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-8">
                          <span className="font-display text-[15.5px] font-medium text-ink-0 sm:w-64 sm:shrink-0">
                            {item.title}
                          </span>
                          <p className="text-[13.5px] leading-relaxed text-ink-2">
                            {item.desc}
                          </p>
                        </div>
                        <span className="font-mono text-[11px] text-ink-3 sm:justify-self-end">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ================= TECH STACK ================= */}
        {service.techStack && (
          <section style={sectionTones.dark} className="relative overflow-hidden bg-void py-24 border-b border-[var(--panel-border)]">
            <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-40" />
            <div className="container-x relative max-w-6xl">
              <Reveal className="max-w-xl mb-12">
                <span className="mono-label" style={{ color: accent }}>
                  {service.techStack.label}
                </span>
                <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-white">
                  {service.techStack.title}
                </h2>
                {service.techStack.desc && (
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-1">
                    {service.techStack.desc}
                  </p>
                )}
              </Reveal>

              <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {service.techStack.groups.map((group, i) => (
                  <Reveal key={group.label} delay={i * 0.06}>
                    <div className="border-t border-[var(--panel-border)] pt-5">
                      <div className="mono-label !text-[10.5px]">{group.label}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[var(--panel-border)] bg-panel-2 px-3.5 py-1.5 text-[12.5px] text-ink-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= PROCESS TIMELINE ================= */}
        {service.process && (
          <section style={sectionTones.light} className="relative bg-void py-28 border-b border-[var(--panel-border)]">
            <div className="container-x relative max-w-6xl">
              <Reveal className="max-w-xl mb-16">
                <span className="mono-label" style={{ color: accent }}>
                  Proses Kerja
                </span>
                <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] font-semibold text-ink-0">
                  Bagaimana kami membangun layanan ini.
                </h2>
              </Reveal>

              <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-[26px] hidden h-px bg-[var(--panel-border)] lg:block"
                />
                {service.process.map((step, i) => {
                  const StepIcon = serviceIconMap[step.icon];
                  return (
                    <Reveal key={step.title} delay={i * 0.08} className="relative lg:px-5">
                      <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
                        <span
                          className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 bg-void font-display text-[17px] font-semibold"
                          style={{ borderColor: accent, color: accent }}
                        >
                          {step.step}
                        </span>
                        <span
                          className="ml-3 font-mono text-[10.5px] tracking-[0.14em] text-ink-3 lg:ml-0 lg:mt-5"
                        >
                          {stageLabels[i] ?? "STAGE"}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 lg:mt-1">
                        <StepIcon size={15} strokeWidth={1.75} style={{ color: accent }} />
                        <div className="font-display text-[16px] font-medium text-ink-0">
                          {step.title}
                        </div>
                      </div>
                      <p className="mt-2.5 max-w-[220px] text-[13px] leading-relaxed text-ink-2">
                        {step.desc}
                      </p>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ================= WHAT MAKES INTIDATA DIFFERENT (generic) ================= */}
        <section style={sectionTones.dark} className="relative overflow-hidden bg-void py-28 border-b border-[var(--panel-border)]">
          <div className="chevron-texture pointer-events-none absolute inset-0 opacity-30" />
          <div className="container-x relative max-w-6xl">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
              <Reveal>
                <span className="mono-label" style={{ color: accent }}>
                  Perbedaan Kami
                </span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-semibold leading-tight text-white">
                  Software engineering dengan konteks bisnis.
                </h2>
                <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-ink-1">
                  Kami bukan sekadar penyedia jasa outsourcing software. Kami
                  memahami proses operasional Anda terlebih dahulu, baru
                  merancang teknologi di sekitarnya.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2">
                {differentiators.map((d, i) => (
                  <Reveal key={d.title} delay={i * 0.06}>
                    <div className="h-full bg-panel p-7">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ background: hexToRgba(accent, 0.14), color: accent }}
                      >
                        <d.icon size={18} strokeWidth={1.75} />
                      </span>
                      <h4 className="mt-5 font-display text-[15px] font-medium text-ink-0">
                        {d.title}
                      </h4>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                        {d.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= ENTERPRISE ENVIRONMENT VISUAL (generic) ================= */}
        <section className="relative border-b border-[var(--panel-border)] py-24">
          <div className="container-x max-w-5xl">
            <Reveal>
              <EnterpriseEnvironmentVisual accent={accent} />
            </Reveal>
          </div>
        </section>

        {/* ================= RELATED SERVICES — compact nav rows ================= */}
        <section className="relative border-b border-[var(--panel-border)] py-20">
          <div className="container-x max-w-4xl">
            <Reveal className="mb-8 max-w-xl">
              <span className="mono-label">Layanan Lainnya</span>
              <h2 className="mt-3 text-[clamp(22px,2.4vw,28px)] font-semibold text-ink-0">
                Jelajahi layanan Intidata lainnya.
              </h2>
            </Reveal>

            <div className="divide-y divide-[var(--panel-border)] border-t border-[var(--panel-border)]">
              {related.map((r, i) => {
                const RIcon = serviceIconMap[r.icon];
                return (
                  <Reveal key={r.slug} delay={i * 0.05}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-panel-2/40"
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: hexToRgba(r.accent, 0.12), color: r.accent }}
                        >
                          <RIcon size={16} strokeWidth={1.75} />
                        </span>
                        <span className="font-display text-[14.5px] font-medium text-ink-0">
                          {r.name}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-ink-2 opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section style={sectionTones.dark} className="relative overflow-hidden bg-void py-28">
          <div className="grid-texture pointer-events-none absolute inset-0" />
          <motion.div
            aria-hidden
            animate={{ opacity: [0.14, 0.26, 0.14] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ background: `radial-gradient(circle, ${hexToRgba(accent, 0.22)}, transparent 65%)` }}
          />

          <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="mono-label" style={{ color: accent }}>
                Contact
              </span>
              <h2 className="mt-6 text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.1] text-white">
                {service.closingCtaTitle ?? "Let's build something that works for your business."}
              </h2>
              <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-ink-1">
                Tell us about your business requirements, operational
                challenges, or software project. Our team can help define the
                right technical approach.
              </p>
              <a
                href="#kontak"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                Discuss Your Project <ArrowRight size={15} />
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <div id="kontak" className="panel divide-y divide-[var(--panel-border)] p-2">
                <div className="group flex gap-4 rounded-[calc(var(--radius)-6px)] p-6 transition-colors hover:bg-panel-2">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--panel-border)]"
                    style={{ color: accent }}
                  >
                    <MapPin size={17} />
                  </span>
                  <div>
                    <div className="mono-label !text-[10.5px]">Location</div>
                    <p className="mt-1.5 text-[15px] font-medium leading-snug text-ink-0">
                      {contact.address}
                    </p>
                  </div>
                </div>
                <div className="group flex gap-4 rounded-[calc(var(--radius)-6px)] p-6 transition-colors hover:bg-panel-2">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--panel-border)]"
                    style={{ color: accent }}
                  >
                    <Mail size={17} />
                  </span>
                  <div>
                    <div className="mono-label !text-[10.5px]">Email</div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1.5 block text-[15px] font-medium text-ink-0 transition-colors hover:text-signal-teal"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="group flex gap-4 rounded-[calc(var(--radius)-6px)] p-6 transition-colors hover:bg-panel-2">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--panel-border)]"
                    style={{ color: accent }}
                  >
                    <Phone size={17} />
                  </span>
                  <div>
                    <div className="mono-label !text-[10.5px]">Phone</div>
                    <div className="mt-1.5 flex flex-col gap-1">
                      {contact.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.replace(/-/g, "")}`}
                          className="text-[15px] font-medium text-ink-0 transition-colors hover:text-signal-teal"
                        >
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}