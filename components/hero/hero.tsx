"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { heroStats } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { HeroDashboardVisual } from "./dashboard-visual";

const HeroWaveBackground = dynamic(
  () => import("./wave-background").then((m) => m.HeroWaveBackground),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-void pb-28 lg:pb-12 pt-40 lg:pt-35">
      <div className="absolute inset-0">
        <HeroDashboardVisual />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-void/10 via-void/40 to-void" />
      <div className="halftone-texture pointer-events-none absolute inset-0 h-225" />

      <div className="container-x relative flex flex-col items-center text-center">

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="max-w-225 text-[clamp(40px,6.2vw,76px)] font-semibold text-ink-0"
        >
          Infrastruktur data yang menopang{" "}
          <span className="text-signal-blue">keputusan finansial</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="mt-8 max-w-140 text-[17px] leading-relaxed text-ink-1"
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

      </div>
    </section>
  );
}