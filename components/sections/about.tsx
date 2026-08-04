"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const capabilities = [
  {
    tag: "Konsultasi",
    detail:
      "Memetakan proses operasional Anda saat ini sebelum satu baris kode pun ditulis.",
  },
  {
    tag: "Pengembangan",
    detail:
      "Membangun sistem inti yang modular, sehingga tumbuh bersama skala bisnis Anda.",
  },
  {
    tag: "Integrasi",
    detail:
      "Menghubungkan sistem internal Anda dengan pelaporan regulator secara langsung.",
  },
  {
    tag: "Perawatan",
    detail:
      "Menjaga kinerja sistem tetap stabil, jauh setelah proyek dinyatakan selesai.",
  },
];

export function About() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % capabilities.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="tentang" className="relative bg-void py-32">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <span className="mono-label">Tentang Kami</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Lebih dari sekadar
            <br />
            pengembang perangkat lunak.
          </h2>
          <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-1">
            PT Intidata Anugrah Pratama membentuk tim yang setara dalam
            kreativitas dan kecerdasan untuk memahami kebutuhan, tantangan,
            dan sasaran bisnis setiap mitra kami.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <button
                key={c.tag}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative flex min-h-[168px] flex-col justify-between bg-panel p-7 text-left transition-colors duration-300 ${
                  active === i ? "bg-panel-2" : ""
                }`}
              >
                <span
                  className={`font-mono text-[12px] tracking-wide transition-colors ${
                    active === i ? "text-signal-teal" : "text-ink-2"
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="font-display text-[19px] font-medium">
                  {c.tag}
                </span>
                <div
                  className={`h-px w-full origin-left bg-[image:var(--grad-signal)] transition-transform duration-500 ${
                    active === i ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="relative mt-px min-h-[92px] overflow-hidden rounded-b-[var(--radius)] border border-t-0 border-[var(--panel-border)] bg-surface p-7">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg text-[15px] leading-relaxed text-ink-1"
              >
                {capabilities[active].detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
