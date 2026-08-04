"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { principles, products } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

const stages = [
  { label: "Discovery", detail: "Memetakan proses dan titik gesekan operasional Anda." },
  { label: "Rancang", detail: "Menyusun arsitektur modular sesuai skala kebutuhan." },
  { label: "Integrasi", detail: "Menghubungkan sistem internal dengan pelaporan regulator." },
  { label: "Operasikan", detail: "Merawat kinerja sistem secara berkelanjutan pasca-peluncuran." },
];

function ModuleChart() {
  const max = Math.max(...products.map((p) => p.modules.length));
  return (
    <div className="flex h-[220px] items-end gap-4 sm:gap-6">
      {products.map((p, i) => (
        <div key={p.id} className="flex flex-1 flex-col items-center gap-3">
          <div className="relative flex h-full w-full items-end justify-center">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(p.modules.length / max) * 100}%` }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[38px] rounded-t-[6px]"
              style={{
                background:
                  "linear-gradient(180deg, #2fe0c2, #4b64ff)",
                opacity: 0.9,
              }}
            />
          </div>
          <span className="mono-label !text-[10px] text-center leading-tight">
            {p.code}
          </span>
        </div>
      ))}
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

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.9fr]">
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

          <Reveal delay={0.1}>
            <div className="panel p-8">
              <span className="mono-label">Modul per sistem</span>
              <div className="mt-8">
                <ModuleChart />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-24 block">
          <ProcessTimeline />
        </Reveal>
      </div>
    </section>
  );
}
