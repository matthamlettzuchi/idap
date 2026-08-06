// app/about/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Award,
  Cpu,
  Layers,
  Users2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
  Server,
  Sparkles,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Contact } from "@/components/sections/contact";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Kerja Keras & Dedikasi",
      desc: "Komitmen penuh memberikan hasil presisi tinggi untuk setiap skema bisnis.",
    },
    {
      title: "Teknologi Terkini",
      desc: "Mengadopsi stack arsitektur modern berbasis open-source & cloud native.",
    },
    {
      title: "Kolaborasi Tim",
      desc: "Sinergi pakar teknologi & analis finansial yang berpengalaman.",
    },
    {
      title: "Kemitraan Jangka Panjang",
      desc: "Mendampingi pertumbuhan sistem enterprise dari skala UMKM hingga korporasi.",
    },
  ];

  const solutions = [
    "Sistem MultiFinance (LOS & LMS)",
    "Factoring & Supply Chain Finance",
    "Akuntansi Enterprise (GL/AR/AP)",
    "Payroll & Human Resource ERP",
    "Sistem Agribisnis & Perkebunan",
    "Software License & Cyber Security",
  ];

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal relative overflow-hidden">
      <Nav overlayHero />

      {/* Decorative Background Glows (Framer / 21st.dev Aesthetic) */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 opacity-30 blur-[120px]">
        <div className="h-full w-full bg-gradient-to-tr from-signal-teal/30 via-signal-blue/20 to-transparent" />
      </div>
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-signal-teal/10 blur-[100px]" />

      <main className="pt-28 pb-24">
        {/* HERO SECTION — full-bleed, sits behind the transparent nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative -mt-28 left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-screen overflow-hidden"
        >
          <img
            src="/table.png"
            alt="Tim Intidata berdiskusi"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-60 text-center">

            <h1 className="max-w-4xl text-[clamp(32px,6.5vw,64px)] font-extrabold leading-[1.08] tracking-tight text-white/80">
              Membangun Fondasi
              <br />
              Digital Enterprise Sejak 30+ Tahun.
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 md:text-base">
              Penyedia solusi terpadu rekayasa perangkat lunak, otomatisasi
              infrastruktur IT, dan pengembangan platform keuangan teregistrasi
              yang tepercaya di Indonesia.
            </p>
          </div>
        </motion.div>

        <div className="container-x max-w-6xl">
          {/* BENTO GRID SECTION — unchanged */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1: Main Highlight (30+ Years) - Span 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-7 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between group hover:border-signal-teal/40 transition-all"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-signal-teal/10 flex items-center justify-center text-signal-teal">
                  <Award size={22} />
                </div>
                <h3 className="text-2xl font-bold text-ink-0">
                  30+ Tahun Pengalaman Industri
                </h3>
                <p className="text-sm text-ink-1 leading-relaxed">
                  Sejak berdiri, Intidata terus tumbuh mendampingi ratusan
                  instansi lokal maupun multinasional. Kami memadukan keahlian
                  teknik mendalam dengan pemahaman domain bisnis yang matang
                  untuk menghadirkan perangkat lunak yang andal.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--panel-border)] flex items-center gap-8">
                <div>
                  <div className="font-mono text-3xl font-extrabold text-signal-teal">
                    30+
                  </div>
                  <div className="text-[12px] text-ink-2 font-medium">
                    Tahun Rekam Jejak
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-[var(--panel-border)]" />
                <div>
                  <div className="font-mono text-3xl font-extrabold text-ink-0">
                    100%
                  </div>
                  <div className="text-[12px] text-ink-2 font-medium">
                    Custom Solutions
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Flagship Product FISCUS - Span 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="md:col-span-5 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md flex flex-col justify-between hover:border-signal-teal/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-signal-blue-dim flex items-center justify-center text-signal-teal">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-panel-2 text-ink-2 border border-[var(--panel-border)]">
                    Kemenkumham Registered
                  </span>
                </div>

                <h3 className="text-xl font-bold text-ink-0">
                  Ekosistem Perangkat Lunak FISCUS
                </h3>
                <p className="text-sm text-ink-1 leading-relaxed">
                  Platform solusi paket unggulan yang dirancang khusus untuk
                  otomatisasi alur pembiayaan, sistem akuntansi, hingga tata
                  kelola enterprise skala kecil hingga besar.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 font-mono text-[12.5px] text-signal-teal font-semibold">
                <span>Solusi Terintegrasi</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>

            {/* Card 3: Custom Software Development - Span 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="md:col-span-5 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md hover:border-signal-teal/40 transition-all"
            >
              <div className="h-10 w-10 rounded-xl bg-signal-teal/10 flex items-center justify-center text-signal-teal mb-4">
                <Code2 size={22} />
              </div>
              <h3 className="text-xl font-bold text-ink-0 mb-2">
                Fleksibilitas Custom Software
              </h3>
              <p className="text-sm text-ink-1 leading-relaxed">
                Setiap bisnis memiliki tantangan unik. Kami membangun perangkat
                lunak terpesan (*tailor-made*) yang disesuaikan secara presisi
                dengan alur operasional internal Anda—hal yang sering kali tidak
                dapat dipenuhi oleh software pasaran (*readymade*).
              </p>
            </motion.div>

            {/* Card 4: Comprehensive Modules List - Span 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="md:col-span-7 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md hover:border-signal-teal/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-signal-blue-dim flex items-center justify-center text-signal-teal">
                  <Layers size={22} />
                </div>
                <h3 className="text-xl font-bold text-ink-0">
                  Cakupan Solusi Enterprise
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {solutions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg border border-[var(--panel-border)] bg-panel-2/50 px-3 py-2.5 text-xs font-medium text-ink-1"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-signal-teal shrink-0"
                    />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CORE VALUES SECTION */}
          <div className="mt-20">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="mono-label">Pilar Keunggulan</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Nilai-Nilai Utama Kami
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--panel-border)] bg-panel/40 p-6 backdrop-blur-sm transition-all hover:border-signal-teal/30 hover:bg-panel/70"
                >
                  <div className="font-mono text-xs text-signal-teal mb-3">
                    0{i + 1}
                  </div>
                  <h4 className="font-bold text-ink-0 mb-2">{val.title}</h4>
                  <p className="text-xs text-ink-2 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}
