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
  type LucideIcon,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import { sectionTones } from "@/lib/section-tones";
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

function gridCols(count: number) {
  if (count <= 3) return "sm:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "sm:grid-cols-2 lg:grid-cols-4";
  if (count <= 6) return "sm:grid-cols-2 lg:grid-cols-3";
  return "sm:grid-cols-2 lg:grid-cols-4";
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

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-28 pb-24">
        {/* HERO */}
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-b border-[var(--panel-border)]"
        >
          <div className="circuit-texture pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full blur-[110px]"
            style={{ background: `radial-gradient(circle, ${hexToRgba(accent, 0.32)}, transparent 65%)` }}
          />

          <div className="container-x relative max-w-4xl">
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
              <h1 className="mt-6 font-display text-[clamp(30px,4.4vw,48px)] font-semibold leading-[1.08] text-white">
                {service.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-ink-1">
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
        </section>

        {/* HIGHLIGHTS */}
        {service.highlights && (
          <section style={sectionTones.light} className="relative bg-void py-20 border-b border-[var(--panel-border)]">
            <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-60" />
            <div className="container-x relative">
              <div className={`grid grid-cols-1 gap-6 ${gridCols(service.highlights.length)}`}>
                {service.highlights.map((h, i) => {
                  const HIcon = serviceIconMap[h.icon];
                  return (
                    <Reveal key={h.title} delay={i * 0.06}>
                      <div className="h-full rounded-2xl border border-[var(--panel-border)] bg-panel p-7 transition-colors hover:bg-panel-2">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ background: hexToRgba(accent, 0.12), color: accent }}
                        >
                          <HIcon size={19} strokeWidth={1.75} />
                        </span>
                        <h3 className="mt-5 font-display text-[16px] font-medium text-ink-0">
                          {h.title}
                        </h3>
                        <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                          {h.desc}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* GRID SECTION */}
        {service.gridSection && (
          <section
            style={sectionTones.dark}
            className="relative overflow-hidden bg-void py-24 border-b border-[var(--panel-border)]"
          >
            <div className="wave-stream-texture pointer-events-none absolute inset-0 opacity-70" />
            <div className="container-x relative max-w-6xl">
              <Reveal className="max-w-xl mb-12">
                <span className="mono-label" style={{ color: accent }}>
                  {service.gridSection.label}
                </span>
                <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-white">
                  {service.gridSection.title}
                </h2>
                {service.gridSection.desc && (
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-1">
                    {service.gridSection.desc}
                  </p>
                )}
              </Reveal>

              <div
                className={`grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-border)] ${gridCols(
                  service.gridSection.items.length
                )}`}
              >
                {service.gridSection.items.map((item, i) => {
                  const ItemIcon = serviceIconMap[item.icon];
                  return (
                    <Reveal key={item.title} delay={i * 0.05}>
                      <div className="group h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ background: hexToRgba(accent, 0.12), color: accent }}
                        >
                          <ItemIcon size={17} strokeWidth={1.75} />
                        </span>
                        <div className="mt-5 font-display text-[15px] font-medium text-ink-0">
                          {item.title}
                        </div>
                        <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-2">
                          {item.desc}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TECH STACK */}
        {service.techStack && (
          <section style={sectionTones.light} className="relative bg-void py-24 border-b border-[var(--panel-border)]">
            <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-60" />
            <div className="container-x relative max-w-6xl">
              <Reveal className="max-w-xl mb-12">
                <span className="mono-label" style={{ color: accent }}>
                  {service.techStack.label}
                </span>
                <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-ink-0">
                  {service.techStack.title}
                </h2>
                {service.techStack.desc && (
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-1">
                    {service.techStack.desc}
                  </p>
                )}
              </Reveal>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {service.techStack.groups.map((group, i) => (
                  <Reveal key={group.label} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-[var(--panel-border)] bg-panel p-7">
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

        {/* PROCESS */}
        {service.process && (
          <section
            style={sectionTones.dark}
            className="relative overflow-hidden bg-void py-24 border-b border-[var(--panel-border)]"
          >
            <div className="chevron-texture pointer-events-none absolute inset-0 opacity-40" />
            <div className="container-x relative max-w-6xl">
              <Reveal className="max-w-xl mb-12">
                <span className="mono-label" style={{ color: accent }}>
                  Proses Kerja
                </span>
                <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-white">
                  Bagaimana kami membangun layanan ini.
                </h2>
              </Reveal>

              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2 lg:grid-cols-4">
                {service.process.map((step, i) => {
                  const StepIcon = serviceIconMap[step.icon];
                  return (
                    <Reveal key={step.title} delay={i * 0.06}>
                      <div className="group h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2">
                        <div className="flex items-center justify-between">
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                            style={{ background: hexToRgba(accent, 0.14), color: accent }}
                          >
                            <StepIcon size={17} strokeWidth={1.75} />
                          </span>
                          <span className="font-mono text-[11px] text-ink-2">{step.step}</span>
                        </div>
                        <div className="mt-5 font-display text-[15.5px] font-medium text-ink-0">
                          {step.title}
                        </div>
                        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                          {step.desc}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CLOSING CTA BANNER */}
        {service.closingCtaTitle && (
          <section style={sectionTones.light} className="relative bg-void py-20 border-b border-[var(--panel-border)]">
            <div className="container-x">
              <Reveal>
                <div
                  className="flex flex-col items-center gap-6 rounded-2xl border p-10 text-center sm:flex-row sm:justify-between sm:text-left"
                  style={{ borderColor: hexToRgba(accent, 0.3), background: hexToRgba(accent, 0.06) }}
                >
                  <h3 className="font-display text-[22px] font-semibold text-ink-0 sm:text-[26px]">
                    {service.closingCtaTitle}
                  </h3>
                  <a
                    href="#kontak"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: accent }}
                  >
                    Konsultasi Sekarang <ArrowRight size={15} />
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* RELATED SERVICES */}
        <section className="relative border-b border-[var(--panel-border)] py-20">
          <div className="container-x">
            <Reveal className="mb-10 max-w-xl">
              <span className="mono-label">Layanan Lainnya</span>
              <h2 className="mt-3 text-[clamp(24px,2.6vw,32px)] font-semibold text-ink-0">
                Jelajahi layanan Intidata lainnya.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => {
                const RIcon = serviceIconMap[r.icon];
                return (
                  <Reveal key={r.slug} delay={i * 0.05}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group flex h-full flex-col justify-between rounded-xl border border-[var(--panel-border)] bg-panel p-5 transition-colors hover:bg-panel-2"
                    >
                      <div>
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ background: hexToRgba(r.accent, 0.12), color: r.accent }}
                        >
                          <RIcon size={16} strokeWidth={1.75} />
                        </span>
                        <div className="mt-4 font-display text-[14px] font-medium text-ink-0">
                          {r.name}
                        </div>
                      </div>
                      <span className="mt-6 flex items-center gap-1 text-[12px] font-medium text-ink-2 opacity-0 transition-opacity group-hover:opacity-100">
                        Lihat detail <ArrowUpRight size={12} />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}