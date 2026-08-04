"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { heroStats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

const LedgerCoreScene = dynamic(
  () => import("./ledger-core").then((m) => m.LedgerCoreScene),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-full w-full rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(75,100,255,.35), transparent 65%)",
        }}
      />
    ),
  }
);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-void pb-28 pt-[180px]">
      <div className="grid-texture pointer-events-none absolute inset-0 h-[900px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[720px] w-[720px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(75,100,255,.35), transparent 65%)",
        }}
      />

      <div className="container-x relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mono-label mb-7 flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
            Sistem Inti untuk Lembaga Keuangan &amp; Korporasi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-[clamp(40px,6.2vw,76px)] font-semibold"
          >
            Infrastruktur data
            <br />
            yang menopang{" "}
            <span className="bg-[image:var(--grad-signal)] bg-clip-text text-transparent">
              keputusan finansial
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-8 max-w-[480px] text-[17px] leading-relaxed text-ink-1"
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
            className="mt-11 flex flex-wrap items-center gap-4"
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
            className="mt-16 grid max-w-[560px] grid-cols-3 gap-8 border-t border-[var(--panel-border)] pt-8"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[30px] font-semibold tabular-nums">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1.5 text-[13px] leading-snug text-ink-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-0">
            <LedgerCoreScene />
          </div>
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
            <span className="mono-label">Ledger Core — visualisasi sistem</span>
          </div>
        </div>
      </div>
    </section>
  );
}
