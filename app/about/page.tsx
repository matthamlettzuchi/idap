"use client";

import React, { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { JourneyTrail } from "@/components/ui/journey-trail";
import {
  CarryingPersonIllustration,
  DirectionCompass,
  FloatingProofBadges,
} from "@/components/ui/vision-illustrations";
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
    era: "Starting Point",
    title: "Core System Foundation",
    body: "Intidata started from the most fundamental need of financial institutions: accurate record-keeping and reliable daily operational processes.",
  },
  {
    era: "Specialization",
    title: "Focus on the Multifinance Sector",
    body: "Deep field experience in the financing industry became the blueprint for FISCUS — a core system specially designed for contract lifecycles, installments, and collections.",
  },
  {
    era: "Service Expansion",
    title: "From Factoring to Plantation Management",
    body: "The ecosystem expanded into Factoring, Accounting, and Planta — proving that our modular architecture can adapt across industries without being rebuilt from scratch.",
  },
  {
    era: "Standardization",
    title: "Direct Regulatory Connectivity",
    body: "The SLIK/SILARAS Report module was built so format validation and reporting schedules to OJK run automatically, rather than being manual tasks at period-end.",
  },
  {
    era: "Present Day",
    title: "Enterprise-Scale Partner",
    body: "More than 30 years later, Intidata supports dozens of local and multinational institutions — from single branch offices to large corporate groups.",
  },
];

const missionPoints = [
  "Designing systems that minimize manual processes and accelerate daily operational cycles.",
  "Making regulatory compliance run automatically, rather than being an extra burden at month-end.",
  "Building long-term partnerships with clients rather than treating projects as one-off transactions.",
  "Supporting client business growth without forcing them to rebuild systems from scratch.",
];

const processSteps = [
  {
    icon: Search,
    label: "Discovery & Consultation",
    body: "Mapping operational processes and client-specific challenges before writing a single line of code.",
  },
  {
    icon: PenTool,
    label: "Design & Build",
    body: "A modular architecture customized to your business workflow, not a off-the-shelf template.",
  },
  {
    icon: Workflow,
    label: "Integration & Testing",
    body: "Connecting new systems with existing infrastructure, including regulatory reporting pathways to OJK.",
  },
  {
    icon: Rocket,
    label: "Launch & Ongoing Support",
    body: "Phased go-live supported by a responsive team for the long term.",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Multifinance & Leasing",
    body: "Consumer and vehicle financing core system, covering contract acquisition to collections.",
  },
  {
    icon: TrendingUp,
    title: "Factoring & Receivables",
    body: "Invoice tracking, fund disbursement, and debtor concentration risk management.",
  },
  {
    icon: Calculator,
    title: "Corporate Accounting",
    body: "Integrated bookkeeping — general ledger, AR/AP, and fixed assets within a single source of truth.",
  },
  {
    icon: Sprout,
    title: "Plantation & Agribusiness",
    body: "Operational management for palm oil plantations, from field data to factory processing.",
  },
  {
    icon: Landmark,
    title: "Regulatory Reporting",
    body: "A direct reporting bridge to OJK systems — SLIK and SILARAS — always compliant with latest formats.",
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

  const headlineLine1 = "Building Digital Enterprise".split(" ");
  const headlineLine2 = "Foundations for 30+ Years.".split(" ");

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
      title: "Hard Work & Dedication",
      desc: "Full commitment to delivering high-precision outcomes for every business scheme.",
    },
    {
      title: "Cutting-Edge Technology",
      desc: "Adopting modern open-source and cloud-native architecture stacks.",
    },
    {
      title: "Team Collaboration",
      desc: "A synergy of experienced tech experts and financial analysts.",
    },
    {
      title: "Long-Term Partnerships",
      desc: "Guiding enterprise system growth from SMEs to large corporations.",
    },
  ];

  const solutions = [
    "MultiFinance System (LOS & LMS)",
    "Factoring & Supply Chain Finance",
    "Enterprise Accounting (GL/AR/AP)",
    "Payroll & Human Resource ERP",
    "Agribusiness & Plantation System",
    "Software Licensing & Cybersecurity",
  ];

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal relative overflow-hidden">
      <Nav overlayHero />

      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-150 w-full max-w-7xl -translate-x-1/2 opacity-30 blur-[120px]">
        <div className="h-full w-full bg-linear-to-tr from-signal-teal/30 via-signal-blue/20 to-transparent" />
      </div>
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-signal-teal/10 blur-[100px]" />

      <main className="pt-28 pb-24">
        <div
          ref={heroRef}
          className="relative -mt-28 left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-screen overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: heroImageY, scale: heroImageScale }}
          >
            <motion.img
              src="/table.png"
              alt="Intidata team discussion"
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
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
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
              A trusted end-to-end software engineering, IT infrastructure automation,
              and registered financial platform development partner in Indonesia.
            </motion.p>

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
                className="md:col-span-7 rounded-2xl border border-(--panel-border) bg-panel/70 p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between group hover:border-signal-teal/40 transition-colors"
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
                    30+ Years of Industry Experience
                  </h3>
                  <p className="text-sm text-ink-1 leading-relaxed">
                    Since its inception, Intidata has grown to support hundreds of local
                    and multinational institutions. We combine deep technical expertise
                    with mature domain knowledge to deliver reliable software.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-(--panel-border) flex items-center gap-8">
                  <StatCounter
                    value={30}
                    suffix="+"
                    label="Years Track Record"
                  />
                  <div className="h-8 w-px bg-(--panel-border)" />
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
                  className="h-auto w-auto max-h-80 object-contain"
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
                className="md:col-span-5 rounded-2xl border border-(--panel-border) bg-panel/70 p-8 backdrop-blur-md hover:border-signal-teal/40 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: -8 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="h-10 w-10 rounded-xl bg-signal-teal/10 flex items-center justify-center text-signal-teal mb-4"
                >
                  <Code2 size={22} />
                </motion.div>
                <h3 className="text-xl font-bold text-ink-0 mb-2">
                  Custom Software Flexibility
                </h3>
                <p className="text-sm text-ink-1 leading-relaxed">
                  Every business faces unique challenges. We build tailor-made
                  software explicitly tailored to your internal operational workflows—something off-the-shelf software often fails to address.
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
                className="md:col-span-7 rounded-2xl border border-(--panel-border) bg-panel/70 p-8 backdrop-blur-md hover:border-signal-teal/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-signal-blue-dim flex items-center justify-center text-signal-teal">
                    <Layers size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-ink-0">
                    Enterprise Solution Scope
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
                      className="flex items-center gap-2.5 rounded-lg border border-(--panel-border) bg-panel-2/50 px-3 py-2.5 text-xs font-medium text-ink-1"
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
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-36 border-t border-(--panel-border) lg:pt-20"
        >
          <div className="circuit-texture pointer-events-none absolute inset-0 opacity-50" />

          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-6 hidden h-75 w-75 rounded-full blur-[90px] lg:block"
            style={{
              background:
                "radial-gradient(circle, rgba(111,141,255,.35), transparent 70%)",
              zIndex: 0,
            }}
          />

          <CarryingPersonIllustration className="pointer-events-none absolute top-21 left-4 z-20 hidden h-70 w-70 lg:block" />

          <DirectionCompass className="pointer-events-none absolute top-15 right-20 z-20 hidden h-42.5 w-42.5 lg:block" />

          <div className="container-x max-w-6xl relative z-10">
            <Reveal className="text-center max-w-xl mx-auto mb-12">
              <span className="mono-label inline-flex items-center rounded-full border border-(--panel-border-strong) bg-panel-2 px-3 py-1 text-[11px]! font-semibold tracking-[0.16em] text-signal-teal">
                VISION & MISSION
              </span>
              <h2 className="mt-4 text-2xl font-bold text-ink-0 md:text-3xl">
                The direction we are headed.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Reveal className="relative">
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-(--panel-border) bg-panel p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-signal-teal/30 bg-signal-blue-dim text-signal-teal shadow-[0_0_28px_-8px_var(--signal-teal)]">
                      <Eye size={19} />
                    </div>
                    <h3 className="font-display text-[20px] font-semibold text-ink-0">
                      Vision
                    </h3>
                  </div>

                  <p className="mt-3 font-display text-[19px] font-medium leading-snug text-ink-0 sm:text-[21px]">
                    A trusted technology partner for data-driven business decisions.
                  </p>

                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-0/75">
                    To be the primary technology partner for financial institutions and corporations in Indonesia — enabling every business decision to be made on accurate, real-time, and regulatory-compliant data.
                  </p>

                  <div className="mt-auto grid grid-cols-3 gap-3 border-t border-(--panel-border) pt-6">
                    {[
                      { value: "25+", label: "Years Experience" },
                      { value: "17+", label: "Active Clients" },
                      { value: "5", label: "Core Systems" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-[18px] font-semibold text-signal-teal">
                          {s.value}
                        </div>
                        <div className="mt-1 text-[10.5px] leading-snug text-ink-2">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-(--panel-border) bg-panel p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-signal-teal/30 bg-signal-blue-dim text-signal-teal shadow-[0_0_28px_-8px_var(--signal-teal)]">
                      <Compass size={19} />
                    </div>
                    <h3 className="font-display text-[20px] font-semibold text-ink-0">
                      Mission
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-5">
                    {missionPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="mt-0.75 shrink-0 text-signal-teal"
                        />
                        <span className="text-[14.5px] leading-relaxed text-ink-0/75">
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
        <section
          style={sectionTones.light}
          className="relative bg-void py-24 border-t border-(--panel-border)"
        >
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Our Journey</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Three decades, the same single commitment.
              </h2>
            </Reveal>

            <div className="relative grid grid-cols-1 gap-10 pl-8 sm:pl-10 lg:grid-cols-[1fr_240px] lg:items-stretch lg:gap-20">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute lg:-left-8.25 md:-left-8.25 top-2 bottom-2 w-px bg-(--panel-border-strong) -left-6.5"
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
                      <span className="mono-label text-signal-teal!">
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

              <JourneyTrail
                steps={journey.length}
                className="relative hidden lg:block"
              />
            </div>
          </div>
        </section>
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-t border-(--panel-border)"
        >
          <div className="chevron-texture pointer-events-none absolute inset-0 opacity-40" />
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">How We Work</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                How we build your system.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--panel-border) bg-(--panel-border) sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.label} delay={i * 0.06}>
                  <div className="group h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--panel-border) text-signal-teal transition-colors duration-300 group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
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
        <section
          style={sectionTones.light}
          className="relative bg-void py-24 border-t border-(--panel-border)"
        >
          <div className="container-x max-w-6xl relative">
            <Reveal className="text-center max-w-xl mx-auto mb-12">
              <span className="mono-label">Pillars of Excellence</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Our Core Values
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, i) => (
                <Reveal key={val.title} delay={i * 0.06}>
                  <div className="h-full rounded-xl border border-(--panel-border) bg-panel/40 p-6 backdrop-blur-sm transition-all hover:border-signal-teal/30 hover:bg-panel/70">
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
        <section
          style={sectionTones.dark}
          className="relative overflow-hidden bg-void py-24 border-t border-(--panel-border)"
        >
          <div className="wave-stream-texture pointer-events-none absolute inset-0 opacity-80" />
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Why Choose Us</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Why clients stay with us.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p, i) => {
                const Icon = whyChooseIcons[i % whyChooseIcons.length];
                return (
                  <Reveal key={p.label} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-(--panel-border) bg-panel p-6 transition-colors hover:bg-panel-2">
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
        <section
          style={sectionTones.light}
          className="relative bg-void py-24 border-t border-(--panel-border)"
        >
          <div className="container-x max-w-6xl relative">
            <Reveal className="max-w-xl mb-12">
              <span className="mono-label">Industry Scope</span>
              <h2 className="mt-2 text-2xl font-bold text-ink-0 md:text-3xl">
                Sectors we serve.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {industries.map((ind, i) => (
                <Reveal key={ind.title} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-(--panel-border) bg-panel-2/50 p-5 transition-colors hover:bg-panel">
                    <div className="h-9 w-9 rounded-lg bg-panel flex items-center justify-center text-signal-teal border border-(--panel-border)">
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
        <div className="border-t border-(--panel-border) pt-16">
          <Reveal className="container-x max-w-6xl text-center mb-8">
            <span className="mono-label">Trusted By</span>
          </Reveal>
          <TrustedBy />
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}