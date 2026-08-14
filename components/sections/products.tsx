"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Bell,
  Users2,
  FileText,
  Landmark,
  TrendingUp,
  Search,
  Plus,
  Printer,
  Check,
  Trash2,
  Pencil,
  Bot,
  Sprout,
  Factory,
  Sparkles,
} from "lucide-react";
import { products as staticProducts, type Product } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

const accentMap: Record<string, string> = {
  "fiscus-multifinance": "#2f4bd0",
  "fiscus-factoring": "#0e9488",
  "fiscus-accounting": "#7c3aed",
  planta: "#15803d",
  "slik-silaras": "#b45309",
};

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function DashboardFrame({
  code,
  accent,
  children,
}: {
  code: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-10 -top-14 h-[280px] w-[280px] rounded-full blur-[90px]"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(accent, 0.3)}, transparent 65%)`,
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute -left-8 bottom-0 h-[220px] w-[220px] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14,148,136,.24), transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel shadow-[0_24px_50px_-24px_rgba(17,24,39,0.3)] transition-shadow duration-300 hover:shadow-[0_34px_64px_-20px_rgba(17,24,39,0.35)]"
      >
        <div className="flex items-center gap-2 border-b border-[var(--panel-border)] bg-panel-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60 transition-colors hover:bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60 transition-colors hover:bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60 transition-colors hover:bg-signal-teal/70" />
          <span className="ml-3 flex-1 truncate rounded-full border border-[var(--panel-border)] bg-panel px-3 py-1 font-mono text-[10px] text-ink-2 transition-colors hover:border-[var(--panel-border-strong)]">
            app.intidata.id/{code.toLowerCase()}
          </span>
          <Bell
            size={13}
            className="text-ink-3 transition-colors hover:text-ink-1"
          />
        </div>

        <div className="min-h-[330px] p-4 sm:p-5">{children}</div>
      </motion.div>
    </div>
  );
}

function Sparkline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 80 24"
      className="mt-2 h-6 w-full"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 16 L13 12 L26 17 L39 8 L52 13 L65 6 L80 10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

const kpiCards = [
  {
    icon: Users2,
    label: "Total Customers",
    value: "327",
    trend: "-50%",
    up: false,
    progress: 86,
  },
  {
    icon: FileText,
    label: "Active Contracts",
    value: "333",
    trend: "-40%",
    up: false,
    progress: 91,
  },
  {
    icon: Landmark,
    label: "Loan Outstanding",
    value: "IDR 2.1B",
    trend: "+4.6%",
    up: true,
    progress: 68,
  },
  {
    icon: TrendingUp,
    label: "Disbursement (Mo.)",
    value: "IDR 640M",
    trend: "+11%",
    up: true,
    progress: 74,
  },
];

function KpiDashboardMockup({ accent }: { accent: string }) {
  const bars = [accent, "#b45309", "#2f4bd0", "#0e9488"];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">
          Dashboard Overview
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-signal-teal/10 px-2.5 py-1 text-[10px] font-medium text-signal-teal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {kpiCards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3 transition-colors duration-200 hover:border-[var(--panel-border-strong)] hover:bg-panel"
          >
            <span
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: bars[i % bars.length] }}
            />
            <div className="flex items-center justify-between">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex h-6 w-6 items-center justify-center rounded-md transition-transform"
                style={{ background: hexToRgba(accent, 0.14), color: accent }}
              >
                <c.icon size={12} />
              </motion.span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                  c.up
                    ? "text-signal-teal bg-signal-teal/10"
                    : "text-ink-2 bg-panel"
                }`}
              >
                {c.trend}
              </span>
            </div>
            <div className="mt-2 text-[9px] uppercase tracking-wide text-ink-2">
              {c.label}
            </div>
            <div className="mt-0.5 font-display text-[15px] font-semibold text-ink-0">
              {c.value}
            </div>
            <Sparkline color={accent} />
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-panel">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.progress}%` }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full"
                style={{ background: accent }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const factoringRows = [
  { no: "AP-FAS/IDS/2024/0007", client: "Name_410744", status: "Disbursed" },
  { no: "AP-FAS/IDS/2024/0006", client: "Name_694607", status: "Disbursed" },
  { no: "AP-FAS/IDS/2023/0013", client: "Name_473630", status: "Disbursed" },
  { no: "AP-FAS/IDS/2013/0001", client: "Name_837728", status: "Terminated" },
];

function StatusPill({ status }: { status: string }) {
  const isDisbursed = status === "Disbursed";
  return (
    <span
      className="rounded-md px-2 py-1 text-[9.5px] font-semibold"
      style={{
        color: isDisbursed ? "#a16207" : "#b91c1c",
        background: isDisbursed
          ? "rgba(217,119,6,0.14)"
          : "rgba(220,38,38,0.12)",
      }}
    >
      {status}
    </span>
  );
}

function DataTableMockup({ accent }: { accent: string }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex-1 min-w-[110px] cursor-pointer rounded-lg border border-[var(--panel-border)] bg-panel-2 px-2.5 py-1.5 text-[10px] text-ink-2 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel">
          Customer: <span className="text-ink-0 font-medium">All</span>
        </div>
        <motion.span
          whileHover={{ filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.94 }}
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white"
          style={{ background: accent }}
        >
          <Search size={12} />
        </motion.span>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <motion.span
          whileHover={{ filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.96 }}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-white"
          style={{ background: accent }}
        >
          <Plus size={11} /> New Facility
        </motion.span>
        <div className="flex-1 cursor-text rounded-lg border border-[var(--panel-border)] bg-panel-2 px-2.5 py-1.5 text-[10px] text-ink-3 transition-colors hover:border-[var(--panel-border-strong)] focus-within:border-signal-teal">
          Search facility…
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--panel-border)]">
        <div className="grid grid-cols-[36px_1fr_0.8fr_0.7fr] gap-2 border-b border-[var(--panel-border)] bg-panel-2 px-2.5 py-2 text-[9px] font-semibold uppercase tracking-wide text-ink-2">
          <span />
          <span>Facility No</span>
          <span>Client</span>
          <span>Status</span>
        </div>
        {factoringRows.map((r, i) => (
          <motion.div
            key={r.no}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
            className="group grid cursor-pointer grid-cols-[36px_1fr_0.8fr_0.7fr] items-center gap-2 border-b border-[var(--panel-border)] px-2.5 py-2 transition-colors last:border-b-0 odd:bg-panel even:bg-panel-2/60 hover:bg-signal-blue-dim/60"
          >
            <span className="flex items-center gap-1.5 text-ink-3">
              <Trash2
                size={10}
                className="transition-colors hover:text-red-500"
              />
              <Pencil
                size={10}
                className="transition-colors hover:text-signal-teal"
              />
            </span>
            <span className="truncate font-mono text-[9.5px] text-ink-1 transition-colors group-hover:text-ink-0">
              {r.no}
            </span>
            <span className="truncate text-[10px] text-ink-1">{r.client}</span>
            <StatusPill status={r.status} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const voucherRows = [
  { code: "FA", voucher: "260100001", date: "31/Jan/2026" },
  { code: "FA", voucher: "260100002", date: "31/Jan/2026" },
  { code: "AU", voucher: "PL202601", date: "28/Jan/2026" },
];

function VoucherTableMockup({ accent }: { accent: string }) {
  return (
    <div>
      <div className="mb-3 grid grid-cols-2 gap-2.5">
        <motion.div
          whileHover={{ y: -2 }}
          className="cursor-pointer rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-ink-2">Need to be Post</span>
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: hexToRgba(accent, 0.14), color: accent }}
            >
              <FileText size={12} />
            </span>
          </div>
          <div className="mt-1 font-display text-[18px] font-semibold text-ink-0">
            0
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="cursor-pointer rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-ink-2">Total Posted</span>
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: hexToRgba(accent, 0.14), color: accent }}
            >
              <CheckCircle2 size={12} />
            </span>
          </div>
          <div className="mt-1 font-display text-[18px] font-semibold text-ink-0">
            {voucherRows.length}
          </div>
        </motion.div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {["Branch", "Source", "Status"].map((f) => (
          <div
            key={f}
            className="cursor-pointer truncate rounded-lg border border-[var(--panel-border)] bg-panel-2 px-2 py-1.5 text-[9px] text-ink-2 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel"
          >
            {f}: <span className="text-ink-0">All</span>
          </div>
        ))}
      </div>

      <div className="mb-3 flex items-center gap-2">
        <motion.span
          whileHover={{ filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.96 }}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-white"
          style={{ background: accent }}
        >
          <Plus size={11} /> Add
        </motion.span>
        <motion.span
          whileHover={{ filter: "brightness(1.2)" }}
          whileTap={{ scale: 0.96 }}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-ink-0 px-2.5 py-1.5 text-[10px] font-semibold text-white"
        >
          <Printer size={11} /> Print
        </motion.span>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--panel-border)]">
        <div className="grid grid-cols-[26px_0.6fr_1fr_0.8fr] gap-2 border-b border-[var(--panel-border)] bg-panel-2 px-2.5 py-2 text-[9px] font-semibold uppercase tracking-wide text-ink-2">
          <span />
          <span>Scode</span>
          <span>Voucher</span>
          <span>Trans Dt</span>
        </div>
        {voucherRows.map((r, i) => (
          <motion.div
            key={r.voucher}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
            className="group grid cursor-pointer grid-cols-[26px_0.6fr_1fr_0.8fr] items-center gap-2 border-b border-[var(--panel-border)] px-2.5 py-2 transition-colors last:border-b-0 odd:bg-panel even:bg-panel-2/60 hover:bg-signal-blue-dim/60"
          >
            <motion.span
              whileHover={{ scale: 1.15 }}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px]"
              style={{ background: accent }}
            >
              <Check size={9} className="text-white" strokeWidth={3} />
            </motion.span>
            <span className="text-[9.5px] font-medium text-ink-1">
              {r.code}
            </span>
            <span className="truncate font-mono text-[9.5px] text-ink-1 transition-colors group-hover:text-ink-0">
              {r.voucher}
            </span>
            <span className="truncate text-[9.5px] text-ink-2">{r.date}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const complianceBubbles = [
  { value: "335", label: "Rincian" },
  { value: "1035", label: "PSAK" },
  { value: "50", label: "Fasilitas" },
  { value: "20", label: "Pengurus" },
];

const complianceChecklist = ["Neraca", "Laba Rugi", "Arus Kas", "Aset"];

function ComplianceBubblesMockup({ accent }: { accent: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-2">
        Pelaporan · Jul 2026
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {complianceBubbles.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{
              delay: 0.08 + i * 0.08,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full text-center transition-shadow"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${hexToRgba(accent, 0.4)}, ${hexToRgba(
                accent,
                0.18,
              )})`,
              border: `1px solid ${hexToRgba(accent, 0.35)}`,
            }}
          >
            <span className="font-display text-[13px] font-bold text-ink-0">
              {b.value}
            </span>
            <span className="mt-0.5 px-1 text-[7px] leading-tight text-ink-2">
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {complianceChecklist.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ delay: 0.35 + i * 0.06, duration: 0.35 }}
            className="flex cursor-pointer flex-col items-center gap-1 rounded-lg py-1 text-center transition-colors hover:bg-panel-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal-teal/15 text-signal-teal transition-transform">
              <CheckCircle2 size={13} />
            </span>
            <span className="text-[9px] font-medium text-ink-1">{c}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-4 flex cursor-default items-center gap-3 rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3 transition-colors hover:border-[var(--panel-border-strong)]"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: hexToRgba(accent, 0.16), color: accent }}
        >
          <Bot size={16} />
        </span>
        <p className="text-[10px] leading-snug text-ink-1">
          Your data is ready to be reported.
        </p>
      </motion.div>

      <div className="mt-3 flex gap-2">
        {["Sync", "Export"].map((label) => (
          <motion.span
            key={label}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[var(--panel-border)] bg-panel py-1.5 text-[9.5px] font-medium text-ink-1 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel-2"
          >
            {label}{" "}
            <ArrowRight
              size={10}
              style={{ color: accent }}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function RadialGauge({
  value,
  label,
  icon: Icon,
  accent,
  delay = 0,
}: {
  value: number;
  label: string;
  icon: typeof Sprout;
  accent: string;
  delay?: number;
}) {
  const r = 30;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      className="flex cursor-pointer flex-col items-center"
    >
      <svg viewBox="0 0 76 76" className="h-20 w-20">
        <circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke="var(--panel-border-strong)"
          strokeWidth="6"
        />
        <motion.circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          transform="rotate(-90 38 38)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - value / 100) }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        <foreignObject x="18" y="18" width="40" height="40">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Icon size={13} style={{ color: accent }} />
            <span className="mt-0.5 font-mono text-[11px] font-bold text-ink-0">
              {value}%
            </span>
          </div>
        </foreignObject>
      </svg>
      <span className="mt-1 text-[9.5px] font-medium text-ink-1">{label}</span>
    </motion.div>
  );
}

const ffbBars = [48, 72, 60, 88, 66, 54];

function RadialGaugeMockup({ accent }: { accent: string }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">
          Estate + Mill Overview
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-signal-teal/10 px-2.5 py-1 text-[10px] font-medium text-signal-teal">
          <Sparkles size={10} /> Daily
        </span>
      </div>

      <div className="flex items-center justify-around rounded-xl border border-[var(--panel-border)] bg-panel-2 py-4">
        <RadialGauge
          value={82}
          label="Field Yield"
          icon={Sprout}
          accent={accent}
          delay={0.1}
        />
        <RadialGauge
          value={64}
          label="Mill Extraction"
          icon={Factory}
          accent={accent}
          delay={0.25}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <motion.div
          whileHover={{ y: -2 }}
          className="cursor-pointer rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel"
        >
          <div className="text-[9px] uppercase tracking-wide text-ink-2">
            FFB Tonnage
          </div>
          <div className="mt-0.5 font-display text-[15px] font-semibold text-ink-0">
            1,284 t
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="cursor-pointer rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3 transition-colors hover:border-[var(--panel-border-strong)] hover:bg-panel"
        >
          <div className="text-[9px] uppercase tracking-wide text-ink-2">
            Active Blocks
          </div>
          <div className="mt-0.5 font-display text-[15px] font-semibold text-ink-0">
            36
          </div>
        </motion.div>
      </div>

      <div className="mt-3 rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3">
        <div className="mb-2 text-[9px] uppercase tracking-wide text-ink-2">
          Weekly FFB Intake
        </div>
        <div className="flex h-[48px] items-end gap-1.5">
          {ffbBars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              whileHover={{ opacity: 1, scaleY: 1.04 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full origin-bottom cursor-pointer rounded-sm"
              style={{
                background: `linear-gradient(180deg, ${accent}, #2fe0c2)`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductMockup({
  productId,
  code,
}: {
  productId: string;
  code: string;
}) {
  const accent = accentMap[productId] ?? "#2f4bd0";

  return (
    <DashboardFrame code={code} accent={accent}>
      {productId === "fiscus-multifinance" && (
        <KpiDashboardMockup accent={accent} />
      )}
      {productId === "fiscus-factoring" && <DataTableMockup accent={accent} />}
      {productId === "fiscus-accounting" && (
        <VoucherTableMockup accent={accent} />
      )}
      {productId === "slik-silaras" && (
        <ComplianceBubblesMockup accent={accent} />
      )}
      {productId === "planta" && <RadialGaugeMockup accent={accent} />}
    </DashboardFrame>
  );
}

export function Products() {
  const slugToId: Record<string, string> = {
    multifinance: "fiscus-multifinance",
    factoring: "fiscus-factoring",
    accounting: "fiscus-accounting",
    planta: "planta",
    "slik-silaras": "slik-silaras",
  };

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadHomeProducts() {
      const { data, error } = await supabase
        .from("products")
        .select(
          "slug, code, name, home_summary, home_description, home_metrics, home_modules",
        )
        .order("sort_order", { ascending: true });
      if (cancelled) return;

      const mapped =
        !error && data
          ? data
              .filter((p) => p.home_summary && p.home_description)
              .map((p) => ({
                id: slugToId[p.slug] ?? p.slug,
                link: p.slug,
                code: p.code,
                name: p.name,
                summary: p.home_summary as string,
                description: p.home_description as string,
                metrics: (p.home_metrics as Product["metrics"]) ?? [],
                modules: (p.home_modules as string[]) ?? [],
              }))
          : [];

      setProducts(mapped.length > 0 ? mapped : staticProducts);
    }
    loadHomeProducts();
    return () => {
      cancelled = true;
    };
  }, []);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (products && products.length > 0 && activeId === null) {
      setActiveId(products[0].id);
    }
  }, [products, activeId]);

  const active = products?.find((p) => p.id === activeId) ?? products?.[0];
  const activeIndex = products?.findIndex((p) => p.id === activeId) ?? 0;

  return (
    <section id="produk" className="relative overflow-hidden bg-surface py-32">
      <div className="chevron-texture pointer-events-none absolute inset-0 opacity-100" />
      <div className="container-x relative">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="mono-label">Products</span>
            <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
              Five systems, one
              <br />
              single source of truth.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-[15.5px] leading-relaxed text-ink-1 lg:justify-self-end lg:text-right">
              Select a system to view its modular scope. Each product is
              designed to stand alone or work seamlessly with other Intidata
              systems.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {!products || !active ? (
            <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] lg:grid-cols-[320px_1fr]">
              <div className="flex flex-col border-b border-[var(--panel-border)] bg-panel lg:border-b-0 lg:border-r">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-[var(--panel-border)] px-7 py-6 last:border-b-0"
                  >
                    <div className="h-2.5 w-14 animate-pulse rounded bg-panel-2" />
                    <div className="mt-3 h-4 w-40 animate-pulse rounded bg-panel-2" />
                  </div>
                ))}
              </div>
              <div className="min-h-[420px] bg-panel-2 p-8 sm:p-10">
                <div className="h-3 w-16 animate-pulse rounded bg-panel" />
                <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-4">
                    <div className="h-8 w-2/3 animate-pulse rounded bg-panel" />
                    <div className="h-4 w-full animate-pulse rounded bg-panel" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-panel" />
                  </div>
                  <div className="aspect-[4/3.2] w-full animate-pulse rounded-2xl bg-panel" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] lg:grid-cols-[320px_1fr]">
              <div className="flex flex-col border-b border-[var(--panel-border)] bg-panel lg:border-b-0 lg:border-r">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveId(p.id)}
                    className={`group relative flex items-center justify-between gap-4 border-b border-[var(--panel-border)] px-7 py-6 text-left last:border-b-0 transition-colors ${
                      activeId === p.id ? "bg-panel-2" : "hover:bg-panel-2/60"
                    }`}
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-[2px]"
                      style={{
                        background: accentMap[p.id] ?? "var(--signal-blue)",
                        opacity: activeId === p.id ? 1 : 0,
                      }}
                    />
                    <span>
                      <span className="mono-label !text-[10.5px]">
                        {p.code}
                      </span>
                      <span
                        className={`mt-1.5 block font-display text-[16px] font-medium transition-colors ${
                          activeId === p.id ? "text-ink-0" : "text-ink-1"
                        }`}
                      >
                        {p.name}
                      </span>
                    </span>
                    <Link href={`/products/${p.link}`}>
                      <ArrowUpRight
                        size={16}
                        className={`shrink-0 transition-all ${
                          activeId === p.id
                            ? "translate-x-0 text-signal-teal opacity-100"
                            : "-translate-x-1 text-ink-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                        }`}
                      />
                    </Link>
                  </button>
                ))}
              </div>

              {/* detail panel */}
              <div className="relative min-h-[420px] bg-panel-2 p-8 sm:p-10">
                <div className="mono-label mb-8">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(products.length).padStart(2, "0")}
                </div>

                <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="font-display text-[26px] font-semibold sm:text-[30px]">
                        {active.name}
                      </h3>
                      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-1">
                        {active.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-8">
                        {active.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-display text-[19px] font-semibold text-signal-teal">
                              {m.value}
                            </div>
                            <div className="mt-1 text-[12.5px] text-ink-2">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-9 flex flex-wrap gap-2.5">
                        {active.modules.map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-[var(--panel-border)] bg-panel px-3.5 py-1.5 text-[12.5px] text-ink-1"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id + "-mockup"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductMockup productId={active.id} code={active.code} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
