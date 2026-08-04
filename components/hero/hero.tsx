"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { heroStats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

const HeroWaveBackground = dynamic(
  () => import("./wave-background").then((m) => m.HeroWaveBackground),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-void pb-28 pt-[180px]">
      <div className="absolute inset-0">
        <HeroWaveBackground />
      </div>
      {/* veil biar teks tetap kebaca di atas background terang */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/10 via-void/40 to-void" />
      <div className="grid-texture pointer-events-none absolute inset-0 h-[900px]" />

      <div className="container-x relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-panel px-4 py-2"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-teal" />
          <span className="text-[13px] font-medium text-ink-1">
            Sistem Inti untuk Lembaga Keuangan &amp; Korporasi
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="max-w-[900px] text-[clamp(40px,6.2vw,76px)] font-semibold text-ink-0"
        >
          Infrastruktur data yang menopang{" "}
          <span className="text-signal-blue">keputusan finansial</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="mt-8 max-w-[560px] text-[17px] leading-relaxed text-ink-1"
        >
          PT Intidata Anugrah Pratama membangun dan merawat sistem inti bagi
          lembaga multifinance, factoring, dan korporasi — dari pembukuan
          hingga pelaporan regulator, dalam satu rantai data yang dapat
          dipercaya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 grid w-full max-w-[560px] grid-cols-3 gap-8 border-t border-[var(--panel-border)] pt-8"
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-[30px] font-semibold tabular-nums text-ink-0">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 text-[13px] leading-snug text-ink-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}