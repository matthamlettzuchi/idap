"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  Users2,
  FileText,
  Landmark,
  Percent,
  Activity,
  Bell,
} from "lucide-react";
import { heroStats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

const kpiMetrics = [
  {
    icon: Users2,
    label: "Total Customers",
    value: "327",
    trend: "-50.0%",
    up: false,
    accent: "#0e9488",
    progress: 86,
  },
  {
    icon: FileText,
    label: "Active Contracts",
    value: "333",
    trend: "-40.0%",
    up: false,
    accent: "#d97706",
    progress: 91,
  },
  {
    icon: Landmark,
    label: "Loan Outstanding",
    value: "IDR 0",
    trend: "-0.7%",
    up: false,
    accent: "#ca8a04",
    progress: 91,
  },
  {
    icon: ArrowUpRight,
    label: "Disbursement",
    value: "IDR 0",
    trend: "-71.0%",
    up: false,
    accent: "#16a34a",
    progress: 91,
  },
  {
    icon: Percent,
    label: "NPL Ratio",
    value: "0.01%",
    trend: "+1.1%",
    up: true,
    accent: "#db2777",
    progress: 91,
  },
  {
    icon: Activity,
    label: "Collection Rate",
    value: "0.0%",
    trend: "+1.1%",
    up: true,
    accent: "#0e9488",
    progress: 91,
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

// Landscape dashboard card: wider max-width + 3-column KPI grid (2 rows x 3 cols)
// instead of the previous portrait 2-column / 3-row layout.
function HeroDashboardCard() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel shadow-[0_30px_60px_-20px_rgba(17,24,39,0.35)] sm:max-w-[600px] lg:w-[1080px]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2.5 border-b border-[var(--panel-border)] bg-panel-2 px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-ink-3/60" />
        <span className="h-3 w-3 rounded-full bg-ink-3/60" />
        <span className="h-3 w-3 rounded-full bg-ink-3/60" />
        <span className="ml-3 flex-1 truncate rounded-full border border-[var(--panel-border)] bg-panel px-4 py-1.5 font-mono text-[13px] text-ink-2">
          app.intidata.id
        </span>
        <motion.button
          type="button"
          aria-label="Notifications"
          whileHover={{ scale: 1.15, color: "var(--signal-teal)" }}
          whileTap={{ scale: 0.9 }}
          className="text-ink-3"
        >
          <Bell size={17} />
        </motion.button>
      </div>

      <div className="p-6">
        {/* header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="font-display text-[20px] font-semibold text-ink-0">
              Dashboard Overview
            </div>
            <div className="mt-1 font-mono text-[12px] text-ink-2">
              Fiscus &rsaquo; Dashboard
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-signal-teal/10 px-4 py-1.5 text-[12px] font-medium text-signal-teal"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-signal-teal"
            />
            Live
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {kpiMetrics.map((m, i) => (
            <motion.button
              type="button"
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
              onClick={() =>
                setActiveMetric((prev) => (prev === m.label ? null : m.label))
              }
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={`relative overflow-hidden rounded-xl border p-8 text-left transition-colors ${
                activeMetric === m.label
                  ? "border-signal-teal bg-panel"
                  : "border-[var(--panel-border)] bg-panel-2 hover:border-[var(--panel-border-strong)]"
              }`}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: m.accent }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="flex h-8 w-16 items-center justify-center rounded-lg"
                  style={{
                    background: hexToRgba(m.accent, 0.14),
                    color: m.accent,
                  }}
                >
                  <m.icon size={16} />
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    m.up
                      ? "bg-signal-teal/10 text-signal-teal"
                      : "bg-panel text-ink-2"
                  }`}
                >
                  {m.trend}
                </span>
              </div>
              <div className="mt-3 truncate text-[10px] uppercase tracking-wide text-ink-2">
                {m.label}
              </div>
              <div className="mt-1 truncate font-display text-[17px] font-semibold text-ink-0">
                {m.value}
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-panel">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.progress}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full rounded-full"
                  style={{ background: m.accent }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-void pb-16 pt-40 lg:pt-36">
      <div className="ledger-lines-texture pointer-events-none absolute inset-0" />

      <div className="container-x relative flex flex-col lg:min-h-[72vh] lg:flex-row lg:items-stretch lg:gap-4">
        {/* left: giant statement + copy + CTA, stacked together */}
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

        {/* center: photo + blob */}
        <div className="relative order-1 mt-10 flex items-end justify-center lg:order-2 lg:mt-0 lg:w-[42%]">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="absolute bottom-4 left-1/2 z-0 h-[280px] w-[280px] -translate-x-[200px] rounded-full sm:h-[360px] sm:w-[360px] lg:left-[38%] lg:h-[420px] lg:w-[420px]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, var(--signal-blue-light), var(--signal-blue) 70%)",
            }}
          />

          <motion.img
            src="/financeguy.png"
            alt="Financial analyst monitoring data"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="relative z-10 h-[340px] w-auto object-contain grayscale object-bottom sm:h-[440px] lg:h-[560px]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/500x700/2f4bd0/ffffff?text=Intidata";
            }}
          />
        </div>

        {/* right: dashboard only, enlarged to fill the column */}
        <div className="relative z-20 order-3 flex flex-col lg:order-3 lg:w-[36%] lg:mr-[-24px] lg:items-end lg:justify-start">
          <div className="mt-8 hidden justify-center lg:mt-0 lg:flex lg:w-full lg:justify-end">
            <HeroDashboardCard />
          </div>
        </div>
      </div>

      {/* stats row */}
      <div className="container-x relative mt-16 flex flex-wrap items-center justify-center gap-10 border-t border-[var(--panel-border)] pt-8 lg:justify-between">
        {heroStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            className="text-center lg:text-left"
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-display text-[28px] font-semibold text-ink-0"
            />
            <div className="mt-1 text-[12.5px] text-ink-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
