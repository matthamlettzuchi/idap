"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { heroStats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-void pb-16 pt-40 lg:pt-32">
      <div className="halftone-texture pointer-events-none absolute inset-0 h-225" />

      <div className="container-x relative grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-3 lg:gap-6">
        {/* left: copy + cta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <span className="mono-label">Sistem Inti Data</span>
          <p className="mx-auto mt-5 max-w-xs text-[15px] leading-relaxed text-ink-1 lg:mx-0">
            Infrastruktur data yang menopang keputusan finansial. Kami
            membangun dan merawat sistem inti bagi lembaga multifinance,
            factoring, dan korporasi — dari pembukuan hingga pelaporan
            regulator.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button asChild size="default">
              <a href="#kontak">
                Hubungi Kami <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="ghost" size="default">
              <a href="#produk">
                Lihat Produk <ArrowDownRight size={16} />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* center: color blob + foto operator */}
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full md:h-[380px] md:w-[380px] lg:h-[440px] lg:w-[440px]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, var(--signal-blue-light), var(--signal-blue) 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="relative z-10 w-[230px] overflow-hidden rounded-[32px] border border-white/20 shadow-[0_30px_70px_-20px_rgba(17,24,39,0.45)] md:w-[300px] lg:w-[340px]"
          >
            <img
              src="https://images.unsplash.com/photo-1758876204242-787309002a8f?auto=format&fit=crop&w=900&q=80"
              alt="Operator sedang berbicara dengan klien via telepon"
              className="aspect-[3/4] w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/600x800/2f4bd0/ffffff?text=Intidata";
              }}
            />
          </motion.div>

          {/* chip "sedang terhubung" */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-2 top-6 z-20 flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-panel/95 px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(17,24,39,0.35)] backdrop-blur-sm md:-left-6 lg:-left-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-teal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-teal" />
            </span>
            <span className="whitespace-nowrap text-[12.5px] font-medium text-ink-0">
              Terhubung dengan klien
            </span>
          </motion.div>
        </div>

        {/* right: oversized display heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="order-3 text-center lg:text-right"
        >
          <h1 className="text-[clamp(48px,9vw,100px)] font-semibold leading-[0.92] text-ink-0">
            Keputusan
            <br />
            <span className="text-signal-blue">Finansial</span>
          </h1>
        </motion.div>
      </div>

      {/* bottom row: stats */}
      <div className="container-x relative mt-16 flex flex-wrap items-center justify-center gap-10 border-t border-[var(--panel-border)] pt-8 lg:justify-between">
        {heroStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
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