"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Settings2,
  Globe,
  Layers,
  Smartphone,
  Wrench,
  Palette,
  Rocket,
  ShieldCheck,
  Network,
  ArrowRight,
  Code2,
  Wifi,
  Database,
  Cloud,
  Lock,
  Cpu,
  Server,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { sectionTones } from "@/lib/section-tones";

const softwareServices = [
  {
    icon: Settings2,
    title: "Custom Software Development",
    desc: "Software solutions tailored to your business processes, operational needs, and growth strategy.",
    href: "/services/custom-software-development",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    desc: "Scalable, secure web applications that support your operations and deliver the best user experience.",
    href: "/services/web-application-development",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    desc: "End-to-end systems with modern architecture, high performance, and ready to scale.",
    href: "/services/full-stack-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "High-performance Android and iOS applications with an architecture ready to grow with your business.",
    href: "/services/mobile-app-development",
  },
  {
    icon: Wrench,
    title: "Software Maintenance & Support",
    desc: "Professional maintenance and support that keeps your systems stable, secure, and optimized.",
    href: "/services/software-maintenance-support",
  },
  {
    icon: Palette,
    title: "UI/UX Design Services",
    desc: "Intuitive, consistent interface design grounded in real user research, from wireframes to handoff.",
    href: "/services/ui-ux-design-services",
  },
  {
    icon: Rocket,
    title: "MVP Software Development",
    desc: "Fast, focused MVPs that let you validate an idea and scale confidently toward the full product.",
    href: "/services/mvp-software-development",
  },
];
type Depth = "far" | "mid" | "near";

const depthStyle: Record<
  Depth,
  { box: string; icon: number; opacity: number; blur: string }
> = {
  far: { box: "h-7 w-7", icon: 11, opacity: 0.5, blur: "blur-[0.5px]" },
  mid: { box: "h-10 w-10", icon: 15, opacity: 0.8, blur: "" },
  near: { box: "h-14 w-14", icon: 21, opacity: 1, blur: "" },
};

const handshakeBadges: {
  icon: typeof Wifi;
  top: string;
  left: string;
  delay: number;
  depth: Depth;
}[] = [
  { icon: Cpu, top: "2%", left: "16%", delay: 0, depth: "far" },
  { icon: Wifi, top: "6%", left: "46%", delay: 0.08, depth: "mid" },
  { icon: Cloud, top: "4%", left: "78%", delay: 0.16, depth: "far" },
  { icon: ShieldCheck, top: "26%", left: "94%", delay: 0.24, depth: "near" },
  { icon: Lock, top: "50%", left: "2%", delay: 0.3, depth: "far" },
  { icon: Database, top: "68%", left: "0%", delay: 0.38, depth: "near" },
  { icon: Network, top: "88%", left: "20%", delay: 0.46, depth: "mid" },
  { icon: Wrench, top: "92%", left: "80%", delay: 0.54, depth: "near" },
  { icon: Server, top: "60%", left: "96%", delay: 0.62, depth: "mid" },
];

const HANDSHAKE_ORIGIN = { top: "62%", left: "50%" };

function HandshakeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const inViewNow = useInView(containerRef, {
    margin: "-20% 0px",
    once: false,
  });

  return (
    <motion.div
      ref={containerRef}
      onViewportEnter={() => setActive(true)}
      viewport={{ once: true, margin: "-10% 0px" }}
      className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-md lg:mx-0 lg:ml-auto"
    >
      <motion.div
        aria-hidden
        animate={inViewNow ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          top: HANDSHAKE_ORIGIN.top,
          left: HANDSHAKE_ORIGIN.left,
          background:
            "radial-gradient(circle, rgba(47,75,208,.4), transparent 65%)",
        }}
      />

      <motion.img
        src="/deal.svg"
        alt="Intidata partnership handshake"
        initial={{ opacity: 0, y: 16 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-5 left-1/2 h-auto w-[70%] -translate-x-1/2 select-none"
        style={{
          background: `
      radial-gradient(
        circle,
        rgba(80,120,255,.22) 0%,
        rgba(47,75,208,.12) 20%,
        transparent 72%
      )
    `,
        }}
        draggable={false}
      />

      {handshakeBadges.map((b, i) => {
        const Icon = b.icon;
        const d = depthStyle[b.depth];
        return (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            initial={{
              top: HANDSHAKE_ORIGIN.top,
              left: HANDSHAKE_ORIGIN.left,
              opacity: 0,
              scale: 0.3,
              filter: "blur(10px)",
            }}
            animate={
              active
                ? {
                    top: b.top,
                    left: b.left,
                    opacity: d.opacity,
                    scale: 1,
                    filter: "blur(0px)",
                  }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: b.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              animate={inViewNow ? { y: [0, -7, 0] } : { y: 0 }}
              transition={{
                duration: 3.2,
                delay: b.delay + 0.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`flex items-center justify-center rounded-full border border-[var(--panel-border-strong)] bg-panel text-signal-teal shadow-[0_16px_32px_-16px_rgba(75,100,255,0.45)] ${d.box} ${d.blur}`}
            >
              <Icon size={d.icon} strokeWidth={1.75} />
            </motion.span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="layanan"
      style={sectionTones.dark}
      className="relative overflow-hidden bg-void py-32 lg:py-20"
    >
      <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-90" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, var(--signal-blue), transparent 65%)",
        }}
      />
      <div className="container-x relative mb-14">
        {" "}
        <div className="max-w-[640px]">
          <Reveal>
            <span className="mono-label">Software Development</span>

            <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold text-white">
              One partner,
              <br />
              a full software development lifecycle.
            </h2>
          </Reveal>
        </div>
        <div className="pointer-events-none absolute right-20 top-[-60px] hidden w-[560px] lg:block">
          <Reveal delay={0.08}>
            <HandshakeVisual />
          </Reveal>
        </div>
      </div>

      <div className="container-x">
        <Reveal delay={0.1}>
          <p className="mb-8 max-w-lg text-[14.5px] leading-relaxed text-ink-1">
            Custom software development solutions engineered specifically to
            support your unique business needs and long-term growth — from
            the first line of code to ongoing support.
          </p>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2 lg:grid-cols-4">
            {softwareServices.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group flex h-full flex-col justify-between bg-panel p-6 transition-colors duration-300 hover:bg-panel-2"
              >
                <div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--panel-border)] text-signal-teal transition-colors duration-300 group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
                    <s.icon size={17} strokeWidth={1.75} />
                  </span>
                  <div className="mt-5 font-display text-[16px] font-medium text-ink-0">
                    {s.title}
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                    {s.desc}
                  </p>
                </div>

                <span className="mt-6 flex items-center gap-1.5 text-[12.5px] font-medium text-signal-teal opacity-80 transition-opacity group-hover:opacity-100">
                  Learn More
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}