"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { principles, products } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import {
  Landmark,
  Receipt,
  BookOpenCheck,
  Trees,
  FileCheck2,
  Activity,
} from "lucide-react";

const stages = [
  { label: "Discovery", detail: "Memetakan proses dan titik gesekan operasional Anda." },
  { label: "Rancang", detail: "Menyusun arsitektur modular sesuai skala kebutuhan." },
  { label: "Integrasi", detail: "Menghubungkan sistem internal dengan pelaporan regulator." },
  { label: "Operasikan", detail: "Merawat kinerja sistem secara berkelanjutan pasca-peluncuran." },
];

const productIcons = [Landmark, Receipt, BookOpenCheck, Trees, FileCheck2];

const activityLog = [
  { label: "FIS-MF · Rekonsiliasi kas selesai", time: "2 menit lalu" },
  { label: "SLK-SR · Laporan terkirim ke OJK", time: "14 menit lalu" },
  { label: "PLN · Sinkronisasi data produksi", time: "26 menit lalu" },
  { label: "FIS-AC · Penutupan periode berjalan", time: "1 jam lalu" },
];

function ModuleChart({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...products.map((p) => p.modules.length));

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[200px] flex-col justify-between">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-px w-full bg-[var(--panel-border)]" />
        ))}
      </div>

      <div className="relative flex h-[200px] items-end gap-4 sm:gap-6">
        {products.map((p, i) => {
          const Icon = productIcons[i % productIcons.length];
          return (
            <div
              key={p.id}
              className="flex flex-1 flex-col items-center gap-3"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative flex h-full w-full items-end justify-center">
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="absolute -top-1 rounded-full border border-[var(--panel-border)] bg-panel px-2 py-0.5 font-mono text-[10px] text-ink-1"
                >
                  {p.modules.length} modul
                </motion.span>

                <motion.div
                  initial={{ height: 0 }}
                  animate={
                    active
                      ? { height: `${(p.modules.length / max) * 100}%` }
                      : { height: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative w-full max-w-[44px] overflow-hidden rounded-t-[8px]"
                  style={{
                    background: "linear-gradient(180deg, #2fe0c2, #4b64ff)",
                    opacity: hovered === null || hovered === i ? 0.95 : 0.35,
                  }}
                >
                  <motion.div
                    aria-hidden
                    animate={{ opacity: hovered === i ? 0.25 : 0 }}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>

                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-1 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-full rounded-xl border border-[var(--panel-border)] bg-panel p-3 shadow-[0_16px_40px_-16px_rgba(17,24,39,0.35)]"
                  >
                    <div className="mb-2 flex items-center gap-1.5">
                      <Icon size={13} className="text-signal-teal" />
                      <span className="text-[11.5px] font-medium text-ink-0">
                        {p.name}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {p.modules.map((m) => (
                        <li key={m} className="text-[11px] text-ink-2">
                          · {m}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              <Icon
                size={15}
                className={`transition-colors ${
                  hovered === i ? "text-signal-teal" : "text-ink-3"
                }`}
              />
              <span className="mono-label !text-[10px] text-center leading-tight">
                {p.code}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityFeed({ active }: { active: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--panel-border)] bg-panel-2 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-teal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-teal" />
        </span>
        <span className="mono-label !text-[10px]">Aktivitas Sistem</span>
      </div>
      <div className="space-y-2.5">
        {activityLog.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
            className="flex items-center justify-between gap-3 border-b border-[var(--panel-border)] pb-2.5 last:border-b-0 last:pb-0"
          >
            <span className="flex items-center gap-2 text-[12px] text-ink-1">
              <Activity size={12} className="shrink-0 text-signal-teal" />
              {a.label}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-ink-3">
              {a.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="relative h-px w-full bg-[var(--panel-border)]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 origin-left bg-[image:var(--grad-signal)]"
        />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
          >
            <span className="mono-label !text-signal-teal">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-2 font-display text-[17px] font-medium">
              {s.label}
            </div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
              {s.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TrackRecord() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [panelActive, setPanelActive] = useState(false);

  return (
    <section id="rekam-jejak" className="relative bg-surface py-32">
      <div className="container-x">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="mono-label">Rekam Jejak</span>
            <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
              Komitmen yang teruji,
              <br />
              bukan sekadar janji.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-[15.5px] leading-relaxed text-ink-1 lg:justify-self-end lg:text-right">
              Enam prinsip yang kami pegang di setiap proyek, dan proses yang
              sama yang kami jalankan untuk setiap klien.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <Reveal>
            <ul>
              {principles.map((p, i) => (
                <li
                  key={p.label}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group border-b border-[var(--panel-border)] py-6 first:border-t"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <span
                      className={`font-display text-[19px] font-medium transition-colors duration-300 ${
                        hovered === i ? "text-signal-teal" : "text-ink-0"
                      }`}
                    >
                      {p.label}
                    </span>
                    <span className="mono-label shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <motion.p
                    initial={false}
                    animate={{
                      height: hovered === i ? "auto" : 0,
                      opacity: hovered === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-md overflow-hidden text-[14px] leading-relaxed text-ink-1"
                  >
                    <span className="inline-block pt-3">{p.body}</span>
                  </motion.p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <motion.div
              onViewportEnter={() => setPanelActive(true)}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="halftone-texture relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-panel p-8"
            >
              <div className="relative mb-2 flex items-center justify-between">
                <span className="mono-label">Modul per Sistem</span>
                <span className="rounded-full bg-signal-teal/10 px-2.5 py-1 font-mono text-[10px] text-signal-teal">
                  {products.length} sistem aktif
                </span>
              </div>
              <p className="relative mb-8 text-[12.5px] text-ink-2">
                Arahkan kursor ke batang untuk melihat rincian modul.
              </p>

              <div className="relative">
                <ModuleChart active={panelActive} />
              </div>

              <div className="relative mt-auto pt-8">
                <ActivityFeed active={panelActive} />
              </div>
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-24 block">
          <ProcessTimeline />
        </Reveal>
      </div>
    </section>
  );
}