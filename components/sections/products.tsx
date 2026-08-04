"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

function Schematic({ seed }: { seed: number }) {
  const paths = [
    "M10 60 C 60 10, 120 110, 180 40 S 300 70, 360 30",
    "M10 90 C 80 40, 140 140, 220 70 S 320 100, 380 60",
    "M10 30 C 70 90, 150 10, 210 80 S 310 40, 370 90",
  ];
  const path = paths[seed % paths.length];
  return (
    <svg viewBox="0 0 390 150" className="h-full w-full" fill="none">
      <path d={path} stroke="rgba(17,24,39,0.12)" strokeWidth="1.5" />{" "}
      <motion.path
        key={seed}
        d={path}
        stroke="url(#schematic-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="18 240"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -260 }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="schematic-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4b64ff" />
          <stop offset="1" stopColor="#2fe0c2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Products() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((p) => p.id === activeId) ?? products[0];
  const activeIndex = products.findIndex((p) => p.id === activeId);

  return (
    <section id="produk" className="relative bg-surface py-32">
      <div className="container-x">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="mono-label">Produk</span>
            <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
              Lima sistem, satu
              <br />
              rantai kebenaran data.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-[15.5px] leading-relaxed text-ink-1 lg:justify-self-end lg:text-right">
              Pilih satu sistem untuk melihat cakupan modulnya. Setiap produk
              dirancang untuk berdiri sendiri, atau bekerja bersama sistem
              Intidata lainnya.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] lg:grid-cols-[320px_1fr]">
            {/* product list */}
            <div className="flex flex-col border-b border-[var(--panel-border)] bg-panel lg:border-b-0 lg:border-r">
              {products.map((p, i) => (
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
                  <ArrowUpRight
                    size={16}
                    className={`shrink-0 transition-all ${
                      activeId === p.id
                        ? "translate-x-0 text-signal-teal opacity-100"
                        : "-translate-x-1 text-ink-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* detail panel */}
            <div className="relative min-h-[420px] bg-panel-2 p-8 sm:p-10">
              <div className="mono-label mb-8">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(products.length).padStart(2, "0")}
              </div>
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

                  <div className="mt-8 h-[110px] w-full max-w-md opacity-80">
                    <Schematic seed={activeIndex} />
                  </div>

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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
