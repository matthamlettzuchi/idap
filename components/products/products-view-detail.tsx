"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  // Product Icons
  Building2,
  TrendingUp,
  Calculator,
  FileSpreadsheet,
  Sprout,
  // UI & Arrow Icons
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  // Advantage Icons
  Sparkles,
  ShieldCheck,
  Rocket,
  Smartphone,
  Gauge,
  Zap,
  // Feature Icons
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
import type { ProductDetail, ProductIconName } from "@/lib/product-details";

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

// Backdrop lingkaran dekoratif di belakang foto — kombinasi lingkaran solid
// berbagai ukuran (buat depth) + cluster ring konsentris (motif "sasaran")
// biar rame tapi tetap ngikutin warna accent tiap produk.
function PersonBackdrop({ accent }: { accent: string }) {
  const rings = Array.from({ length: 12 }, (_, i) => 22 + i * 9);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {/* lingkaran solid tersebar, opacity beda-beda buat kesan berlapis */}
      <div
        className="absolute -left-10 top-0 h-36 w-36 rounded-full"
        style={{ background: hexToRgba(accent, 0.22) }}
      />
      <div
        className="absolute right-0 top-24 h-20 w-20 rounded-full"
        style={{ background: hexToRgba(accent, 0.14) }}
      />
      <div
        className="absolute left-8 bottom-2 h-28 w-28 rounded-full"
        style={{ background: hexToRgba(accent, 0.18) }}
      />
      <div
        className="absolute -right-8 bottom-20 h-16 w-16 rounded-full"
        style={{ background: hexToRgba(accent, 0.12) }}
      />

      {/* cluster ring konsentris, nyempil di pojok kanan atas */}
      <svg
        viewBox="0 0 300 300"
        className="absolute -right-24 -top-16 h-[240px] w-[240px]"
        fill="none"
      >
        {rings.map((r) => (
          <circle
            key={r}
            cx="220"
            cy="80"
            r={r}
            stroke={hexToRgba(accent, 0.28)}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
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

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-28">
        {/* HERO */}
        <section className="relative overflow-hidden py-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full blur-[120px]"
            style={{
              background: `radial-gradient(circle, ${hexToRgba(accent, 0.28)}, transparent 65%)`,
            }}
          />
          <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-40" />

          <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-[12.5px] text-ink-2"
              >
                <Link
                  href="/#produk"
                  className="transition-colors hover:text-signal-teal"
                >
                  Products
                </Link>
                <span>/</span>
                <span className="font-mono" style={{ color: accent }}>
                  {product.code}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 font-display text-[clamp(34px,5.2vw,58px)] font-semibold leading-[1.02] text-ink-0"
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink-1"
              >
                {product.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#kontak"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: accent }}
                >
                  Konsultasi Sekarang <ArrowRight size={15} />
                </a>
                <Link
                  href="/#produk"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] px-6 py-3 text-[14px] font-medium text-ink-0 transition-colors hover:border-[var(--panel-border-strong)]"
                >
                  Lihat Produk Lain
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-9 flex flex-wrap gap-2"
              >
                {product.quickFacts.map((fact) => (
                  <span
                    key={fact}
                    className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium"
                    style={{
                      borderColor: hexToRgba(accent, 0.35),
                      color: accent,
                      background: hexToRgba(accent, 0.08),
                    }}
                  >
                    {fact}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* SIGNATURE PHOTO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto flex h-[320px] w-[280px] items-end justify-center sm:h-[400px] sm:w-[340px]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-6 left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full blur-[90px]"
                style={{
                  background: `radial-gradient(circle, ${hexToRgba(accent, 0.35)}, transparent 70%)`,
                }}
              />

              <img
                src={product.personImage}
                alt={`Tim ${product.name}`}
                className="relative z-10 h-full w-auto select-none object-contain object-bottom grayscale"
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/360x560/e2e8f0/64748b?text=${encodeURIComponent(product.code)}`;
                }}
              />

              {[
                { top: "15%", left: "50%" }, // atas — tengah
                { top: "58%", left: "92%" }, // kanan
                { top: "48%", left: "8%" }, // kiri
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
                    className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[var(--panel-border)] bg-panel px-3 py-1.5 text-[14px] font-medium text-ink-1 shadow-[0_16px_32px_-16px_rgba(17,24,39,0.35)] sm:flex"
                    style={pos}
                  >
                    {fact}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="relative border-t border-[var(--panel-border)] py-20">
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
              {/* aksen orbit yang dipindah dari hero */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 hidden h-[120px] w-[120px] items-center justify-center lg:flex"
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

              <div className="rounded-2xl border border-[var(--panel-border)] bg-panel p-7">
                <div className="mono-label">Ringkasan Sistem</div>
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
                <div className="mt-7 flex items-center gap-2 border-t border-[var(--panel-border)] pt-5 font-mono text-[12px] text-ink-2">
                  Modul terintegrasi
                  <ArrowUpRight size={13} style={{ color: accent }} />
                  Platform FISCUS
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ADVANTAGES */}
        <section
          className="relative overflow-hidden border-t border-[var(--panel-border)] py-20"
          style={{ background: hexToRgba(accent, 0.04) }}
        >
          <div className="container-x">
            <Reveal className="max-w-xl">
              <span className="mono-label" style={{ color: accent }}>
                Keunggulan
              </span>
              <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-ink-0">
                Kenapa {product.name} unggul.
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2 lg:grid-cols-3">
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

        {/* PROCESS */}
        {product.processIntro && (
          <section className="relative border-t border-[var(--panel-border)] py-20">
            <div className="container-x">
              <Reveal>
                <div
                  className="rounded-2xl border p-8 sm:p-10"
                  style={{
                    borderColor: hexToRgba(accent, 0.3),
                    background: hexToRgba(accent, 0.05),
                  }}
                >
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
              </Reveal>
            </div>
          </section>
        )}

        {/* FEATURES */}
        <section className="relative border-t border-[var(--panel-border)] py-20">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <span className="mono-label" style={{ color: accent }}>
                Fitur Utama
              </span>
              <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold text-ink-0">
                Apa yang Anda dapatkan.
              </h2>
              {product.featuresIntro && (
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-1">
                  {product.featuresIntro}
                </p>
              )}
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.features.map((f, i) => {
                const FIcon = featureIcons[i % featureIcons.length];
                return (
                  <Reveal key={f.title} delay={i * 0.06}>
                    <div className="h-full rounded-xl border border-[var(--panel-border)] bg-panel p-6 transition-colors hover:bg-panel-2">
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
              })}
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="relative border-t border-[var(--panel-border)] py-20">
          <div className="container-x">
            <Reveal className="mb-10 max-w-xl">
              <span className="mono-label">Produk Lainnya</span>
              <h2 className="mt-3 text-[clamp(24px,2.6vw,32px)] font-semibold text-ink-0">
                Jelajahi ekosistem FISCUS lainnya.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => {
                const RIcon = productIconMap[r.icon];
                return (
                  <Reveal key={r.slug} delay={i * 0.05}>
                    <Link
                      href={`/products/${r.slug}`}
                      className="group flex h-full flex-col justify-between rounded-xl border border-[var(--panel-border)] bg-panel p-5 transition-colors hover:bg-panel-2"
                    >
                      <div>
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{
                            background: hexToRgba(r.accent, 0.12),
                            color: r.accent,
                          }}
                        >
                          <RIcon size={16} strokeWidth={1.75} />
                        </span>
                        <div className="mt-4 font-display text-[14px] font-medium text-ink-0">
                          {r.name}
                        </div>
                      </div>
                      <span className="mt-6 flex items-center gap-1 text-[12px] font-medium text-ink-2 opacity-0 transition-opacity group-hover:opacity-100">
                        Lihat detail <ArrowUpRight size={12} />
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
    </div>
  );
}
