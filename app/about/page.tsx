"use client";

import React, { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import NumberFlow from "@number-flow/react";
import {
  Award,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
  Sparkles,
  Eye,
  Compass,
  Building2,
  TrendingUp,
  Calculator,
  Sprout,
  Landmark,
  Search,
  PenTool,
  Workflow,
  Rocket,
  ActivitySquare,
  Users2,
  MapPin,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/lib/data";
import { sectionTones } from "@/lib/section-tones";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const whyChooseIcons = [
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ActivitySquare,
  Users2,
  Award,
];

const journey = [
  {
    era: "Titik Awal",
    title: "Fondasi sistem inti",
    body: "Intidata memulai dari kebutuhan paling mendasar bagi institusi keuangan: pencatatan yang akurat dan proses operasional yang bisa diandalkan setiap hari.",
  },
  {
    era: "Spesialisasi",
    title: "Fokus ke sektor multifinance",
    body: "Pengalaman lapangan mendalam di industri pembiayaan menjadi cetak biru lahirnya FISCUS — sistem inti yang dirancang khusus untuk siklus kontrak, angsuran, hingga penagihan.",
  },
  {
    era: "Perluasan Layanan",
    title: "Dari factoring hingga perkebunan",
    body: "Ekosistem berkembang ke Factoring, Accounting, hingga Planta — membuktikan arsitektur modular kami bisa diadaptasi lintas industri tanpa dibangun ulang dari nol.",
  },
  {
    era: "Standarisasi",
    title: "Terhubung langsung ke regulator",
    body: "Modul SLIK/SILARAS Report dibangun agar validasi format dan jadwal pelaporan ke OJK berjalan otomatis, bukan pekerjaan manual di akhir periode.",
  },
  {
    era: "Hari Ini",
    title: "Mitra skala enterprise",
    body: "Lebih dari 30 tahun kemudian, Intidata mendampingi puluhan institusi lokal dan multinasional — dari kantor cabang tunggal hingga grup korporasi besar.",
  },
];

const missionPoints = [
  "Merancang sistem yang mengurangi proses manual dan mempercepat siklus operasional harian.",
  "Menjadikan kepatuhan regulasi berjalan otomatis, bukan pekerjaan tambahan di akhir bulan.",
  "Membangun kemitraan jangka panjang dengan klien, bukan sekadar transaksi proyek.",
  "Mendampingi pertumbuhan skala bisnis klien tanpa memaksa mereka membangun ulang sistem dari nol.",
];

const processSteps = [
  {
    icon: Search,
    label: "Discovery & Konsultasi",
    body: "Memetakan proses operasional dan tantangan spesifik klien sebelum satu baris kode pun ditulis.",
  },
  {
    icon: PenTool,
    label: "Rancang & Bangun",
    body: "Arsitektur modular yang disesuaikan dengan alur kerja bisnis Anda, bukan template siap pakai.",
  },
  {
    icon: Workflow,
    label: "Integrasi & Pengujian",
    body: "Menghubungkan sistem baru dengan infrastruktur yang sudah berjalan, termasuk jalur pelaporan ke OJK.",
  },
  {
    icon: Rocket,
    label: "Peluncuran & Pendampingan",
    body: "Go-live bertahap, didampingi tim support yang responsif untuk jangka panjang.",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Multifinance & Leasing",
    body: "Core system pembiayaan konsumen dan kendaraan dari akuisisi kontrak hingga penagihan.",
  },
  {
    icon: TrendingUp,
    title: "Factoring & Anjak Piutang",
    body: "Pelacakan invoice, disbursement dana, dan manajemen risiko konsentrasi debitur.",
  },
  {
    icon: Calculator,
    title: "Akuntansi Korporat",
    body: "Pembukuan terintegrasi — general ledger, AR/AP, hingga aset tetap dalam satu sumber data.",
  },
  {
    icon: Sprout,
    title: "Perkebunan & Agribisnis",
    body: "Manajemen operasional kebun sawit, dari data lapangan hingga produksi pabrik.",
  },
  {
    icon: Landmark,
    title: "Pelaporan Regulator",
    body: "Jembatan pelaporan langsung ke sistem OJK — SLIK dan SILARAS — yang selalu patuh format terbaru.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "18%"]);
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(
    heroScrollProgress,
    [0, 1],
    [0.55, 0.85],
  );
  const heroContentY = useTransform(heroScrollProgress, [0, 1], ["0%", "25%"]);
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.7], [1, 0]);

  // headline dipecah per kata biar bisa muncul staggered
  const headlineLine1 = "Membangun Fondasi".split(" ");
  const headlineLine2 = "Digital Enterprise Sejak 30+ Tahun.".split(" ");

  function StatCounter({
    value,
    suffix = "",
    label,
    color = "text-signal-teal",
  }: {
    value: number;
    suffix?: string;
    label: string;
    color?: string;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });

    return (
      <div ref={ref}>
        <div className={`font-mono text-3xl font-extrabold ${color}`}>
          <NumberFlow value={inView ? value : 0} suffix={suffix} />
        </div>
        <div className="mt-1 text-[12px] font-medium text-ink-2">{label}</div>
      </div>
    );
  }

  const headlineContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

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

      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 opacity-30 blur-[120px]">
        <div className="h-full w-full bg-gradient-to-tr from-signal-teal/30 via-signal-blue/20 to-transparent" />
      </div>
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-signal-teal/10 blur-[100px]" />

      <main className="pt-28 pb-24">
        {/* HERO SECTION — full-bleed, sits behind the transparent nav */}
        {/* HERO SECTION — full-bleed, sits behind the transparent nav */}
        <div
          ref={heroRef}
          className="relative -mt-28 left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-screen overflow-hidden"
        >
          {/* layer foto: parallax + Ken Burns zoom saat pertama masuk */}
          <motion.div
            className="absolute inset-0"
            style={{ y: heroImageY, scale: heroImageScale }}
          >
            <motion.img
              src="/table.png"
              alt="Tim Intidata berdiskusi"
              initial={{ scale: 1.18, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-black/55"
            style={{ opacity: heroOverlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* light sweep tipis lewat foto sekali di awal */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-20%" }}
            animate={{ x: "260%" }}
            transition={{ duration: 2.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-60 text-center"
          >
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="max-w-4xl text-[clamp(32px,6.5vw,64px)] font-extrabold leading-[1.08] tracking-tight text-white/80"
            >
              <span className="block">
                {headlineLine1.map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    variants={wordVariants}
                    className="mr-[0.28em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {headlineLine2.map((word, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    variants={wordVariants}
                    className="mr-[0.28em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 md:text-base"
            >
              Penyedia solusi terpadu rekayasa perangkat lunak, otomatisasi
              infrastruktur IT, dan pengembangan platform keuangan teregistrasi
              yang tepercaya di Indonesia.
            </motion.p>

            {/* scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2"
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
          </motion.div>
        </div>

        <section style={sectionTones.light} className="relative bg-void py-24">
          <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="container-x max-w-6xl relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: EASE_OUT },
                }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="md:col-span-7 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between group hover:border-signal-teal/40 transition-colors"
              >
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ rotate: -8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="h-10 w-10 rounded-xl bg-signal-teal/10 flex items-center justify-center text-signal-teal"
                  >
                    <Award size={22} />
                  </motion.div>
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
                  <StatCounter
                    value={30}
                    suffix="+"
                    label="Tahun Rekam Jejak"
                  />
                  <div className="h-8 w-[1px] bg-[var(--panel-border)]" />
                  <StatCounter
                    value={100}
                    suffix="%"
                    label="Custom Solutions"
                    color="text-ink-0"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="md:col-span-5 flex items-center justify-center"
              >
                <DotLottieReact
                  src="/animat.lottie"
                  autoplay
                  loop
                  className="h-full w-full max-h-[320px] object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: EASE_OUT },
                }}
                transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT }}
                className="md:col-span-5 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md hover:border-signal-teal/40 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: -8 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="h-10 w-10 rounded-xl bg-signal-teal/10 flex items-center justify-center text-signal-teal mb-4"
                >
                  <Code2 size={22} />
                </motion.div>
                <h3 className="text-xl font-bold text-ink-0 mb-2">
                  Fleksibilitas Custom Software
                </h3>
                <p className="text-sm text-ink-1 leading-relaxed">
                  Setiap bisnis memiliki tantangan unik. Kami membangun
                  perangkat lunak terpesan (*tailor-made*) yang disesuaikan
                  secara presisi dengan alur operasional internal Anda—hal yang
                  sering kali tidak dapat dipenuhi oleh software pasaran
                  (*readymade*).
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: EASE_OUT },
                }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT }}
                className="md:col-span-7 rounded-2xl border border-[var(--panel-border)] bg-panel/70 p-8 backdrop-blur-md hover:border-signal-teal/40 transition-colors"
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
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.05,
                        ease: EASE_OUT,
                      }}
                      className="flex items-center gap-2.5 rounded-lg border border-[var(--panel-border)] bg-panel-2/50 px-3 py-2.5 text-xs font-medium text-ink-1"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-signal-teal shrink-0"
                      />
                      <span className="truncate">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= 2 — DARK — VISI & MISI ================= */}
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-t border-[var(--panel-border)]"
        >
          <div className="circuit-texture pointer-events-none absolute inset-0 opacity-50" />
          <div className="container-x max-w-6xl relative">
            <Reveal className="text-center max-w-xl mx-auto mb-12">
              <span className="mono-label">Visi & Misi</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Arah yang kami tuju.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-2xl border border-[var(--panel-border)] bg-panel p-8">
                  <div className="h-11 w-11 rounded-xl bg-signal-blue-dim flex items-center justify-center text-signal-teal">
                    <Eye size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-[20px] font-semibold text-ink-0">
                    Visi
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-1">
                    Menjadi mitra teknologi utama bagi institusi keuangan dan
                    korporasi di Indonesia — memungkinkan setiap keputusan
                    bisnis dibuat di atas data yang akurat, real-time, dan patuh
                    regulasi.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-[var(--panel-border)] bg-panel p-8">
                  <div className="h-11 w-11 rounded-xl bg-signal-blue-dim flex items-center justify-center text-signal-teal">
                    <Compass size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-[20px] font-semibold text-ink-0">
                    Misi
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {missionPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-signal-teal"
                        />
                        <span className="text-[14px] leading-relaxed text-ink-1">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= 3 — LIGHT — PERJALANAN KAMI ================= */}
        <section
          style={sectionTones.light}
          className="relative bg-void py-24 border-t border-[var(--panel-border)]"
        >
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Perjalanan Kami</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Tiga dekade, satu komitmen yang sama.
              </h2>
            </Reveal>

            <div className="relative pl-8 sm:pl-10">
              <div
                aria-hidden
                className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--panel-border-strong)] sm:left-[11px]"
              />
              <div className="flex flex-col gap-10">
                {journey.map((step, i) => (
                  <Reveal
                    key={step.title}
                    delay={i * 0.06}
                    className="relative"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-8 top-1 h-3.5 w-3.5 rounded-full border-2 border-signal-teal bg-void sm:-left-10"
                    />
                    <span className="mono-label !text-signal-teal">
                      {step.era}
                    </span>
                    <h3 className="mt-2 font-display text-[19px] font-medium text-ink-0">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-1">
                      {step.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4 — DARK — CARA KERJA ================= */}
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-t border-[var(--panel-border)]"
        >
          <div className="chevron-texture pointer-events-none absolute inset-0 opacity-40" />
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Cara Kerja</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Bagaimana kami membangun sistem Anda.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.label} delay={i * 0.06}>
                  <div className="group h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--panel-border)] text-signal-teal transition-colors duration-300 group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
                        <step.icon size={17} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[11px] text-ink-2">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-5 font-display text-[15.5px] font-medium text-ink-0">
                      {step.label}
                    </div>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5 — LIGHT — CORE VALUES ================= */}
        <section
          style={sectionTones.light}
          className="relative bg-void py-24 border-t border-[var(--panel-border)]"
        >
          <div className="container-x max-w-6xl relative">
            <Reveal className="text-center max-w-xl mx-auto mb-12">
              <span className="mono-label">Pilar Keunggulan</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Nilai-Nilai Utama Kami
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, i) => (
                <Reveal key={val.title} delay={i * 0.06}>
                  <div className="h-full rounded-xl border border-[var(--panel-border)] bg-panel/40 p-6 backdrop-blur-sm transition-all hover:border-signal-teal/30 hover:bg-panel/70">
                    <div className="font-mono text-xs text-signal-teal mb-3">
                      0{i + 1}
                    </div>
                    <h4 className="font-bold text-ink-0 mb-2">{val.title}</h4>
                    <p className="text-xs text-ink-2 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6 — DARK — MENGAPA MEMILIH INTIDATA ================= */}
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-t border-[var(--panel-border)]"
        >
          <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-30" />
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Mengapa Memilih Kami</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Alasan klien bertahan bersama kami.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p, i) => {
                const Icon = whyChooseIcons[i % whyChooseIcons.length];
                return (
                  <Reveal key={p.label} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-[var(--panel-border)] bg-panel p-6 transition-colors hover:bg-panel-2">
                      <div className="h-10 w-10 rounded-lg bg-signal-blue-dim flex items-center justify-center text-signal-teal">
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                      <h4 className="mt-5 font-display text-[15.5px] font-medium text-ink-0">
                        {p.label}
                      </h4>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                        {p.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 7 — LIGHT — SEKTOR YANG KAMI LAYANI ================= */}
        <section
          style={sectionTones.light}
          className="relative bg-void py-24 border-t border-[var(--panel-border)]"
        >
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Cakupan Industri</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Sektor yang kami layani.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {industries.map((ind, i) => (
                <Reveal key={ind.title} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-[var(--panel-border)] bg-panel-2/50 p-5 transition-colors hover:bg-panel">
                    <div className="h-9 w-9 rounded-lg bg-panel flex items-center justify-center text-signal-teal border border-[var(--panel-border)]">
                      <ind.icon size={16} strokeWidth={1.75} />
                    </div>
                    <h4 className="mt-4 text-[13.5px] font-semibold text-ink-0">
                      {ind.title}
                    </h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-2">
                      {ind.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRUSTED BY STRIP ================= */}
        <div className="border-t border-[var(--panel-border)] pt-16">
          <Reveal className="container-x max-w-6xl text-center mb-8">
            <span className="mono-label">Dipercaya Oleh</span>
          </Reveal>
          <TrustedBy />
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}
