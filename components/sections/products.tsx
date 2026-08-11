"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowUpRight,
  LayoutGrid,
  BarChart3,
  Database,
  ShieldCheck,
  Settings2,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { products } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

const sidebarIcons = [LayoutGrid, BarChart3, Database, ShieldCheck, Settings2];

const barSeeds = [
  [42, 68, 55, 88, 64],
  [60, 46, 82, 50, 95],
  [50, 86, 40, 70, 60],
  [76, 54, 91, 46, 66],
  [46, 90, 60, 74, 52],
];

function ProductMockup({
  seed,
  code,
  metrics,
  modules,
}: {
  seed: number;
  code: string;
  metrics: { label: string; value: string }[];
  modules: string[];
}) {
  const bars = barSeeds[seed % barSeeds.length];

  return (
    <div className="relative">
      {/* glow blobs */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-10 -top-14 h-[280px] w-[280px] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(75,100,255,.28), transparent 65%)",
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
        initial={{ opacity: 0, y: 16, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2 }}
        whileHover={{ rotate: 0, y: -4 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-panel shadow-[0_30px_60px_-20px_rgba(17,24,39,0.25)]"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--panel-border)] bg-panel-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="ml-3 flex-1 truncate rounded-full border border-[var(--panel-border)] bg-panel px-3 py-1 font-mono text-[10px] text-ink-2">
            app.intidata.id/{code.toLowerCase()}
          </span>
          <Bell size={13} className="text-ink-3" />
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden flex-col items-center gap-4 border-r border-[var(--panel-border)] bg-panel-2 px-3 py-5 sm:flex">
            {sidebarIcons.map((Icon, i) => (
              <span
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  i === 0
                    ? "bg-[image:var(--grad-signal)] text-white"
                    : "text-ink-2"
                }`}
              >
                <Icon size={15} />
              </span>
            ))}
          </div>

          {/* main */}
          <div className="flex-1 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">
                Dashboard — {code}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-signal-teal/10 px-2.5 py-1 text-[10px] font-medium text-signal-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
                Live
              </span>
            </div>

            {/* stat cards */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              {metrics.slice(0, 2).map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-[var(--panel-border)] bg-panel-2 px-3 py-2.5"
                >
                  <div className="font-display text-[16px] font-semibold text-ink-0">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[10.5px] text-ink-2">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* chart */}
            <div className="mb-4 flex h-[64px] items-end gap-2 rounded-xl border border-[var(--panel-border)] bg-panel-2 p-3">
              {bars.map((h, i) => (
                <motion.div
                  key={`${code}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.06,
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

            {/* module rows */}
            <div className="space-y-1.5">
              {modules.slice(0, 3).map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-panel px-3 py-1.5"
                >
                  <CheckCircle2
                    size={12}
                    className="shrink-0 text-signal-teal"
                  />
                  <span className="truncate text-[11.5px] text-ink-1">{m}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Products() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((p) => p.id === activeId) ?? products[0];
  const activeIndex = products.findIndex((p) => p.id === activeId);

  return (
    <section id="produk" className="relative overflow-hidden bg-surface py-32">
      <div className="chevron-texture pointer-events-none absolute inset-0 opacity-50" />
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
                    className="absolute left-0 top-0 h-full w-[2px] bg-[image:var(--grad-signal)]"
                    style={{ opacity: activeId === p.id ? 1 : 0 }}
                  />
                  <span>
                    <span className="mono-label !text-[10.5px]">{p.code}</span>
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
                    <ProductMockup
                      seed={activeIndex}
                      code={active.code}
                      metrics={active.metrics}
                      modules={active.modules}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
