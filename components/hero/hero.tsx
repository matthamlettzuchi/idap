"use client";

import { useEffect, useState } from "react";
import { getActiveHeroTheme, type HeroTheme } from "@/lib/hero-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  Users2,
  FileText,
  Landmark,
  Bell,
  Clock,
  Building2,
  Layers,
} from "lucide-react";
import { heroStats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

const statIcons = [Clock, Building2, Layers];
const kpiMetrics = [
  {
    icon: Users2,
    label: "Total Customers",
    value: "327",
    trend: "-50.0%",
    up: false,
    accent: "#0e9488",
    progress: 86,
    footnote: "1 new customers this month",
  },
  {
    icon: FileText,
    label: "Active Contracts",
    value: "333",
    trend: "-40.0%",
    up: false,
    accent: "#d97706",
    progress: 91,
    footnote: "3 contracts disbursed this month",
  },
  {
    icon: Landmark,
    label: "Loan Outstanding",
    value: "IDR 0",
    trend: "-0.7%",
    up: false,
    accent: "#ca8a04",
    progress: 91,
    footnote: "Avg. Ticket: IDR 0M",
  },
  {
    icon: ArrowUpRight,
    label: "Disbursement",
    value: "IDR 0",
    trend: "-71.0%",
    up: false,
    accent: "#16a34a",
    progress: 91,
    footnote: "Avg. Disb: IDR 0M",
  },
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Decorative trend line under each metric, matching the live Fiscus
// dashboard's thin sparkline.
function MiniSparkline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 100 24"
      className="mt-2 h-5 w-full"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 15 C 12 17, 22 8, 34 12 S 56 20, 68 13 S 88 6, 100 11"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function HeroDashboardCard() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative z-10 w-full max-w-[900px] overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel shadow-[0_30px_60px_-20px_rgba(17,24,39,0.35)]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2.5 border-b border-[var(--panel-border)] bg-panel-2 px-5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
        <span className="ml-3 flex-1 truncate rounded-full border border-[var(--panel-border)] bg-panel px-4 py-1 font-mono text-[12px] text-ink-2">
          app.intidata.id
        </span>
        <motion.button
          type="button"
          aria-label="Notifications"
          whileHover={{ scale: 1.15, color: "var(--signal-teal)" }}
          whileTap={{ scale: 0.9 }}
          className="text-ink-3"
        >
          <Bell size={15} />
        </motion.button>
      </div>

      <div className="p-4 sm:p-5">
        {/* header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="font-display text-[18px] font-semibold text-ink-0">
              Dashboard Overview
            </div>
            <div className="font-mono text-[11px] text-ink-2">
              Fiscus &rsaquo; Dashboard
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-signal-teal/10 px-3 py-1 text-[11px] font-medium text-signal-teal"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-signal-teal"
            />
            Live
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {kpiMetrics.map((m, i) => (
            <motion.button
              type="button"
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              onClick={() =>
                setActiveMetric((prev) => (prev === m.label ? null : m.label))
              }
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden rounded-xl border px-5 py-3.5 text-left transition-colors ${
                activeMetric === m.label
                  ? "border-signal-teal bg-panel"
                  : "border-[var(--panel-border)] bg-panel-2 hover:border-[var(--panel-border-strong)]"
              }`}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: m.accent }}
              />
              <div className="flex items-center justify-between gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: hexToRgba(m.accent, 0.14),
                    color: m.accent,
                  }}
                >
                  <m.icon size={15} />
                </span>
                <div className="text-right">
                  <span
                    className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      m.up
                        ? "bg-signal-teal/10 text-signal-teal"
                        : "bg-panel text-ink-2"
                    }`}
                  >
                    {m.trend}
                  </span>
                  <div className="whitespace-nowrap text-[9.5px] text-ink-3">
                    vs last month
                  </div>
                </div>
              </div>

              <div className="mt-1.5 flex items-baseline justify-between gap-2">
                <span className="truncate text-[10px] font-medium uppercase tracking-wide text-ink-2">
                  {m.label}
                </span>
                <span className="truncate font-display text-[18px] font-semibold text-ink-0">
                  {m.value}
                </span>
              </div>

              <MiniSparkline color={m.accent} />

              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="truncate text-[10px] text-ink-3">
                  {m.footnote}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-panel">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{
                        duration: 0.7,
                        delay: 0.7 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full"
                      style={{ background: m.accent }}
                    />
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-ink-2">
                    {m.progress}%
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [activeTheme, setActiveTheme] = useState<HeroTheme | null>(null);

  useEffect(() => {
    setActiveTheme(getActiveHeroTheme(new Date("2026-02-01")));
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-void pb-16 pt-40 lg:pt-36">
      <div
        className={`${activeTheme?.backgroundImage == null ? "ledger-lines-texture" : ""} pointer-events-none absolute inset-0`}
      />

      <AnimatePresence>
        {activeTheme && (
          <motion.div
            key={activeTheme.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
          >
            {activeTheme.backgroundImage && (
              <img
                src={activeTheme.backgroundImage}
                alt=""
                className="h-full w-full object-cover opacity-[0.18]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{ background: activeTheme.backgroundWash }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-x relative flex flex-col lg:min-h-[72vh] lg:flex-row lg:items-stretch lg:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 order-2 mt-8 flex flex-col items-center text-center lg:order-1 lg:mt-0 lg:w-[26%] lg:items-start lg:justify-center lg:pr-10 lg:text-left"
        >
          <h1 className="font-display text-[clamp(38px,6.6vw,84px)] font-bold leading-[0.88] tracking-tight text-ink-0">
            Solutions
            <br />
            <span className="text-blue-300">Built On</span>
            <br />
            <span className="text-blue-400">Trust.</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8"
          >
            <p className="mx-auto max-w-xs text-[14.5px] leading-relaxed text-ink-1 lg:mx-0 lg:max-w-[260px]">
              With over 25 years of experience, we deliver integrated IT systems
              engineered for precision and reliability, helping businesses
              innovate through technology and earn lasting trust from their
              customers.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <Button asChild size="sm">
                <a href="#kontak">
                  Contact Us <ArrowRight size={15} />
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="#produk">
                  View Products <ArrowDownRight size={15} />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative order-1 mt-10 flex items-end justify-center lg:order-2 lg:mt-0 lg:w-[42%]">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="absolute bottom-4 left-72 sm:left-85 md:left-113 z-0 h-[280px] w-[280px] -translate-x-[200px] rounded-full sm:h-[360px] sm:w-[360px] lg:left-[42%] lg:h-[420px] lg:w-[420px]"
            style={{
              background:
                activeTheme?.blobGradient ??
                "radial-gradient(circle at 35% 30%, var(--signal-blue-light), var(--signal-blue) 70%)",
            }}
          />

          {activeTheme && (
            <motion.span
              initial={{ opacity: 0, y: -8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--panel-border)] bg-panel px-4 py-1.5 text-[12.5px] font-medium text-ink-0 shadow-[0_12px_28px_-12px_rgba(17,24,39,0.35)] sm:-top-4"
            >
              {activeTheme.greeting}
            </motion.span>
          )}

          <motion.img
            key={activeTheme?.id ?? "default"}
            src={activeTheme?.characterImage ?? "/financeguy.png"}
            alt={
              activeTheme?.characterAlt ?? "Financial analyst monitoring data"
            }
            initial={{ opacity: 0, y: 40 }}
            style={{
              maskImage:
                "linear-gradient(to bottom, black 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 95%, transparent 100%)",
            }}
            animate={{
              opacity: 1,
              y: activeTheme?.imageOffsetY ?? 0,
              scale: activeTheme?.scale ?? 1,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="relative lg:right-4 z-10 h-[340px] w-auto object-contain object-bottom sm:h-[440px] lg:h-[560px]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/financeguy.png";
            }}
          />
        </div>

        {/* right: dashboard only, enlarged to fill the column */}
        <div className="relative z-20 order-3 flex flex-col lg:order-3 lg:w-[40%] lg:mr-[-150px] lg:items-end lg:justify-start">
          <div className="mt-8 hidden justify-center lg:mt-7 lg:flex lg:w-full lg:justify-end">
            <HeroDashboardCard />
          </div>
        </div>
      </div>

      {/* stats row */}
      <div className="container-x relative mt-16">
        <div className="relative overflow-hidden left-5 rounded-2xl border border-[var(--panel-border)] bg-panel">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
          <motion.div
            aria-hidden
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-10 top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(47,75,208,.35), transparent 65%)",
            }}
          />

          <div className="relative grid grid-cols-1 divide-y divide-[var(--panel-border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroStats.map((s, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -2 }}
                  className="group flex items-center gap-4 px-7 py-7 transition-colors duration-300 hover:bg-panel-2 sm:px-8"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--panel-border)] text-signal-teal transition-colors duration-300 group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      className="font-display text-[26px] font-semibold text-ink-0"
                    />
                    <div className="mt-0.5 text-[12.5px] text-ink-2">
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
