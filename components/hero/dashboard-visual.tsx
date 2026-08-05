"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  ShieldCheck,
  BookOpenCheck,
  Trees,
  Bell,
  CheckCircle2,
} from "lucide-react";

const chips = [
  { label: "Multifinance", icon: Landmark, className: "left-[2%] top-[6%] lg:left-[10%]" },
  { label: "Pelaporan OJK", icon: ShieldCheck, className: "right-[2%] top-[10%] lg:right-[10%]" },
  { label: "Accounting", icon: BookOpenCheck, className: "left-[4%] bottom-[4%] lg:left-[14%]" },
  { label: "Planta", icon: Trees, className: "right-[4%] bottom-[8%] lg:right-[14%]" },
];

const bars = [38, 62, 48, 80, 56, 70, 44, 60];

const lines = [
  "M130,110 C260,170 360,230 470,290",
  "M870,100 C740,160 640,220 530,280",
  "M120,470 C250,410 360,360 470,320",
  "M880,490 C750,430 640,380 530,320",
];

export function HeroDashboardVisual() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[300px] bottom-0 lg:top-[340px]">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(47,75,208,.22), transparent 65%)" }}
      />

      {/* connecting lines */}
      <svg
        viewBox="0 0 1000 600"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {lines.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--panel-border-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {/* floating labeled chips */}
      {chips.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${c.className} flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-panel/90 px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(17,24,39,0.35)] backdrop-blur-sm`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-blue-dim text-signal-blue">
            <c.icon size={16} strokeWidth={1.75} />
          </span>
          <span className="whitespace-nowrap text-[12.5px] font-medium text-ink-0">
            {c.label}
          </span>
        </motion.div>
      ))}

      {/* dashboard card mockup */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 w-[min(680px,86vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel/95 shadow-[0_40px_80px_-30px_rgba(17,24,39,0.35)] backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 border-b border-[var(--panel-border)] bg-panel-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="ml-3 flex-1 truncate rounded-full border border-[var(--panel-border)] bg-panel px-3 py-1 font-mono text-[10px] text-ink-2">
            app.intidata.id/dashboard
          </span>
          <Bell size={13} className="text-ink-3" />
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">
              Ringkasan Sistem
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-signal-teal/10 px-2.5 py-1 text-[10px] font-medium text-signal-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
              Live
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Sistem Aktif", value: "5" },
              { label: "Klien Korporasi", value: "17+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Laporan Terkirim", value: "1.2K" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-[var(--panel-border)] bg-panel-2 px-3 py-2.5">
                <div className="font-display text-[16px] font-semibold text-ink-0">{m.value}</div>
                <div className="mt-0.5 text-[10.5px] text-ink-2">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-4 flex h-[80px] items-end gap-2 rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-sm"
                style={{ background: "linear-gradient(180deg, #6f8dff, #2f4bd0)", opacity: 0.9 }}
              />
            ))}
          </div>

          <div className="space-y-1.5">
            {["Rekonsiliasi kas selesai", "Laporan SLIK terkirim ke OJK", "Sinkronisasi data produksi"].map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-panel px-3 py-1.5"
              >
                <CheckCircle2 size={12} className="shrink-0 text-signal-teal" />
                <span className="truncate text-[11.5px] text-ink-1">{m}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}