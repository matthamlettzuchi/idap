"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = testimonials[index];

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimoni" className="relative overflow-hidden bg-void py-32">
      <div className="grid-texture pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="mono-label">Testimoni</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Kata mereka tentang Intidata.
          </h2>
          <p className="mt-6 text-[15.5px] leading-relaxed text-ink-1">
            Dengarkan langsung dari klien kami tentang bagaimana sistem kami
            membantu operasional mereka.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            {/* visual card — sekarang video YouTube asli */}
            <div className="relative aspect-[4/3] w-full">
              <motion.div
                aria-hidden
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-10 -top-10 h-[220px] w-[220px] rounded-full blur-[90px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(47,75,208,.35), transparent 65%)",
                }}
              />
              <motion.div
                aria-hidden
                animate={{ opacity: [0.2, 0.35, 0.2] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="pointer-events-none absolute -bottom-8 -right-8 h-[200px] w-[200px] rounded-full blur-[80px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(111,141,255,.3), transparent 65%)",
                }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 24 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] p-1.5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(47,75,208,0.12), rgba(111,141,255,0.12))",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-lg)-6px)] bg-panel-2">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${active.videoId}`}
                      title={active.company}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* content */}
            <div className="relative flex min-h-[480px] flex-col sm:min-h-[440px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id + "-content"}
                  custom={direction}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex rounded-full border border-[var(--panel-border)] bg-signal-blue-dim px-3.5 py-1.5 text-[12.5px] font-medium text-signal-blue">
                    {active.category}
                  </span>

                  <Quote size={28} className="mt-6 text-ink-3" strokeWidth={1.5} />
                  <p className="mt-4 text-[19px] font-medium leading-relaxed text-ink-0 sm:text-[21px]">
                    &ldquo;{active.quote}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-signal)] font-display text-[14px] font-semibold text-white">
                      {active.initials}
                    </span>
                    <div>
                      <div className="font-display text-[15px] font-medium text-ink-0">
                        {active.name}
                      </div>
                      <div className="text-[13px] text-ink-2">
                        {active.role}, {active.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* nav controls — posisi tetap, tidak ikut animasi konten */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-4">
                <button
                  aria-label="Testimoni sebelumnya"
                  onClick={() => go(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--panel-border)] text-ink-1 transition-colors hover:border-signal-blue hover:text-signal-blue"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  aria-label="Testimoni selanjutnya"
                  onClick={() => go(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--panel-border)] text-ink-1 transition-colors hover:border-signal-blue hover:text-signal-blue"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="ml-2 flex items-center gap-1.5">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      aria-label={`Ke testimoni ${i + 1}`}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index
                          ? "w-6 bg-signal-blue"
                          : "w-1.5 bg-[var(--panel-border-strong)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}