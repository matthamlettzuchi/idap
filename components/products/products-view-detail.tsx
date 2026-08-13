"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useScroll, useTransform } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Calculator,
  FileSpreadsheet,
  Sprout,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Rocket,
  Smartphone,
  Gauge,
  Zap,
  LayoutGrid,
  BarChart3,
  Globe,
  ClipboardList,
  Users2,
  Database,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import { BalancedGrid } from "@/components/ui/balanced-grid";
import type { ProductDetail, ProductIconName } from "@/lib/product-details";
import Image from "next/image";
import { FloatingActions } from "@/components/floating-actions";

const productIconMap: Record<ProductIconName, typeof Building2> = {
  Building2,
  TrendingUp,
  Calculator,
  FileSpreadsheet,
  Sprout,
};
const advantageIcons = [Sparkles, ShieldCheck, Rocket, Smartphone, Gauge, Zap];
const featureIcons = [
  LayoutGrid,
  BarChart3,
  Globe,
  ClipboardList,
  Users2,
  Database,
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ProductDetailView({
  product,
  related,
}: {
  product: ProductDetail;
  related: ProductDetail[];
}) {
  const Icon = productIconMap[product.icon];
  const accent = product.accent;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(heroScrollProgress, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);
  const personY = useTransform(heroScrollProgress, [0, 1], ["9%", "26%"]);
  const contentOpacity = useTransform(heroScrollProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav overlayHero />

      <main>
        <div
          ref={heroRef}
          className="relative -mt-28 left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-screen min-h-225 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: bgY, scale: bgScale }}
          >
            <motion.img
              src={product.backgroundImage}
              alt=""
              aria-hidden
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-linear-to-r from-black/72 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/15" />

          <motion.div
            className="absolute inset-x-0 bottom-0 flex justify-end pb-8 pr-[4%] sm:pb-10 sm:pr-[7%]"
            style={{ y: personY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: product.personImageOffsetY ?? 0,
                x: `${product.personImageOffsetX ?? 0}%`,
                scale: product.personImageScale ?? 1,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 16,
                delay: 0.5,
              }}
              style={{ transformOrigin: "bottom center" }}
              className="relative flex h-[64%] w-[320px] items-end justify-center sm:h-[72%] sm:w-105 lg:w-125"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-4 left-1/2 h-7.5 w-[68%] -translate-x-1/2 rounded-full bg-black/45 blur-xl"
              />
              <Image
                src={product.personImage}
                alt={`Tim ${product.name}`}
                height={420}
                width={800}
                className="relative z-10 h-full w-auto select-none object-contain object-bottom drop-shadow-[0_28px_32px_rgba(0,0,0,0.4)]"
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/460x700/e2e8f0/64748b?text=${encodeURIComponent(product.code)}`;
                }}
              />

              {[
                { top: "4%", left: "46%" },
                { top: "58%", left: "6%" },
                { top: "35%", left: "83%" },
              ].map((pos, i) => {
                const fact = product.quickFacts[i];
                if (!fact) return null;
                return (
                  <motion.span
                    key={fact}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[16px] font-medium text-ink-1 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.5)] sm:flex"
                    style={pos}
                  >
                    {fact}
                  </motion.span>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              opacity: contentOpacity,
              paddingTop: "clamp(60px, 8vh, 120px)",
            }}
            className="relative z-10 flex h-full items-center justify-start px-6 sm:px-10 lg:px-[clamp(40px,5vw,64px)]"
          >
            <div className="w-full max-w-lg text-left lg:w-[46%]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center justify-start gap-2 text-[12.5px] text-white/70"
              >
                <Link
                  href="/#produk"
                  className="transition-colors hover:text-white"
                >
                  Products
                </Link>
                <span>/</span>
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold"
                  style={{
                    color: "#dce6ff",
                    background: "rgba(111,141,255,0.22)",
                    border: "1px solid rgba(111,141,255,0.4)",
                  }}
                >
                  {product.code}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -40, skewX: 3 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 font-display text-[clamp(32px,4.6vw,52px)] font-semibold leading-[1.04] text-white"
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.92,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 text-[15.5px] leading-relaxed text-white/85"
              >
                {product.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 1.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 flex flex-wrap items-center justify-start gap-3"
              >
                <a
                  href="#kontak"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: accent }}
                >
                  Consult Now <ArrowRight size={15} />
                </a>
                <Link
                  href="/#produk"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Explore Other Products
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.16 }}
                className="mt-9 flex flex-wrap items-center justify-start gap-2"
              >
                {product.quickFacts.map((fact) => (
                  <span
                    key={fact}
                    className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium backdrop-blur-sm"
                    style={{
                      borderColor: "rgba(255,255,255,0.35)",
                      color: "#fff",
                      background: hexToRgba(accent, 0.4),
                    }}
                  >
                    {fact}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"
            >
              <span className="h-1.5 w-1 rounded-full bg-white/70" />
            </motion.div>
          </motion.div>
        </div>

        <section className="relative border-t border-(--panel-border) py-20">
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <span className="mono-label" style={{ color: accent }}>
                Overview
              </span>
              <div className="mt-5 space-y-5">
                {product.overview.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-ink-1">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 hidden h-30 w-30 items-center justify-center lg:flex"
              >
                {[0, 1, 2].map((ring) => (
                  <motion.span
                    key={ring}
                    animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{
                      duration: 4 + ring,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: ring * 0.4,
                    }}
                    className="absolute rounded-full border"
                    style={{
                      inset: ring * 14,
                      borderColor: hexToRgba(accent, 0.3),
                    }}
                  />
                ))}
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]"
                  style={{ background: accent }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
              </div>

              <div className="rounded-2xl border border-(--panel-border) bg-panel p-7">
                <div className="mono-label">System Summary</div>
                <ul className="mt-5 space-y-4">
                  {product.quickFacts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: hexToRgba(accent, 0.14),
                          color: accent,
                        }}
                      >
                        <CheckCircle2 size={13} />
                      </span>
                      <span className="text-[14px] text-ink-1">{fact}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-2 border-t border-(--panel-border) pt-5 font-mono text-[12px] text-ink-2">
                  Integrated modules
                  <ArrowUpRight size={13} style={{ color: accent }} />
                  FISCUS Platform
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          className="relative overflow-hidden border-t border-(--panel-border) py-20"
          style={{ background: hexToRgba(accent, 0.04) }}
        >
          <div className="container-x">
            <Reveal className="max-w-xl">
              <span className="mono-label" style={{ color: accent }}>
                Benefits
              </span>
              <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-ink-0">
                Why is {product.name} beneficial.
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--panel-border) bg-(--panel-border) sm:grid-cols-2 lg:grid-cols-3">
              {product.advantages.map((adv, i) => {
                const AdvIcon = advantageIcons[i % advantageIcons.length];
                return (
                  <Reveal key={adv.title} delay={i * 0.05}>
                    <div className="group h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2">
                      <div className="flex items-center justify-between">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{
                            background: hexToRgba(accent, 0.12),
                            color: accent,
                          }}
                        >
                          <AdvIcon size={17} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[11px] text-ink-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-5 font-display text-[15.5px] font-medium text-ink-0">
                        {adv.title}
                      </div>
                      {adv.subtitle && (
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
                          {adv.subtitle}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {product.processIntro && (
          <section className="relative border-t border-(--panel-border) py-20">
            <div className="container-x">
              <Reveal>
                <div
                  className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]"
                  style={{
                    borderColor: hexToRgba(accent, 0.3),
                    background: hexToRgba(accent, 0.05),
                  }}
                >
                  <div>
                    <span className="mono-label" style={{ color: accent }}>
                      Proses
                    </span>
                    <h3 className="mt-3 font-display text-[22px] font-semibold text-ink-0 sm:text-[26px]">
                      {product.processIntro.heading}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-1">
                      {product.processIntro.body}
                    </p>
                  </div>

                  {product.processLottie && (
                    <div className="relative mx-auto flex h-55 w-full max-w-[320px] items-center justify-center sm:h-55">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full blur-[60px]"
                        style={{ background: hexToRgba(accent, 0.25) }}
                      />
                      <DotLottieReact
                        src={product.processLottie}
                        autoplay
                        loop
                        className="relative h-full w-full"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <section className="relative border-t border-(--panel-border) py-20">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <span className="mono-label" style={{ color: accent }}>
                Core Features
              </span>
              <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-ink-0">
                What you will get.
              </h2>
              {product.featuresIntro && (
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-1">
                  {product.featuresIntro}
                </p>
              )}
            </Reveal>

            <div className="mt-12">
              <BalancedGrid
                items={product.features}
                baseCols={4}
                renderItem={(f, i) => {
                  const FIcon = featureIcons[i % featureIcons.length];
                  return (
                    <Reveal key={f.title} delay={i * 0.06}>
                      <div className="h-full rounded-xl border border-(--panel-border) bg-panel p-6 transition-colors hover:bg-panel-2">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-lg border"
                          style={{
                            borderColor: hexToRgba(accent, 0.3),
                            color: accent,
                          }}
                        >
                          <FIcon size={17} strokeWidth={1.75} />
                        </span>
                        <h4 className="mt-5 font-display text-[14.5px] font-medium text-ink-0">
                          {f.title}
                        </h4>
                        <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-2">
                          {f.body}
                        </p>
                      </div>
                    </Reveal>
                  );
                }}
              />
            </div>
          </div>
        </section>

        <section className="relative border-t border-(--panel-border) py-20">
          <div className="container-x">
            <Reveal className="mb-10 max-w-xl">
              <span className="mono-label">Other Products</span>
              <h2 className="mt-3 text-[clamp(24px,2.6vw,32px)] font-semibold text-ink-0">
                Explore other FISCUS ecosystems.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => {
                const RIcon = productIconMap[r.icon];
                return (
                  <Reveal key={r.slug} delay={i * 0.05}>
                    <Link
                      href={`/products/${r.slug}`}
                      className="group flex h-full flex-col justify-between rounded-xl border border-(--panel-border) bg-panel p-6 transition-colors hover:bg-panel-2"
                    >
                      <div>
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-full"
                          style={{
                            background: hexToRgba(r.accent, 0.12),
                            color: r.accent,
                          }}
                        >
                          <RIcon size={18} strokeWidth={1.75} />
                        </span>
                        <div className="mt-4 font-display text-[14px] font-medium text-ink-0">
                          {r.name}
                        </div>
                        <p className="mt-2.5 line-clamp-2 text-[12px] leading-relaxed text-ink-2">
                          {r.tagline}
                        </p>
                      </div>
                      <span
                        className="mt-6 flex items-center gap-1 text-[12px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: r.accent }}
                      >
                        See detail <ArrowUpRight size={12} />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
      <FloatingActions />
    </div>
  );
}
