"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  Layers,
  Wrench,
  Rocket,
  Server,
  ShieldCheck,
  Network,
  ArrowRight,
  Code2,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { sectionTones } from "@/lib/section-tones";

const colsClass: Record<number, string> = {
  2: "sm:grid-cols-2 lg:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const serviceCategories = [
  {
    id: "software",
    label: "Software Development",
    tagline:
      "Custom software development solutions engineered specifically to support your unique business needs and long-term growth.",
    services: [
      {
        icon: Settings2,
        title: "Custom Software Development",
        desc: "Tailored software solutions designed precisely around your business workflows and operational demands.",
      },
      {
        icon: Layers,
        title: "System Integration",
        desc: "Connecting internal core systems with regulatory reporting pipelines end-to-end.",
      },
      {
        icon: Wrench,
        title: "Software Maintenance & Support",
        desc: "Dedicated maintenance and support services to ensure your systems remain reliable and up-to-date.",
      },
      {
        icon: Rocket,
        title: "Modular Scaling",
        desc: "Phased rollout of new modules as your operational scope and business requirements evolve.",
      },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    tagline:
      "Tailored IT infrastructure solutions designed to support high uptime, security, and scalable business growth.",
    services: [
      {
        icon: Server,
        title: "IT Services",
        desc: "End-to-end IT services managing underlying infrastructure, network setups, and day-to-day operations.",
      },
      {
        icon: Network,
        title: "Network Management",
        desc: "Proactive management of stable internal networks and connectivity required for daily operations.",
      },
      {
        icon: ShieldCheck,
        title: "System Security & Reliability",
        desc: "Safeguarding core system performance, minimizing downtime, and protecting critical enterprise data.",
      },
    ],
  },
];

export function Services() {
  const [activeCat, setActiveCat] = useState(serviceCategories[0].id);
  const category =
    serviceCategories.find((c) => c.id === activeCat) ?? serviceCategories[0];

  return (
    <section
      id="layanan"
      style={sectionTones.dark}
      className="relative overflow-hidden bg-void py-32"
    >
      <div className="container-x mb-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="mono-label">Our Services</span>
            <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
              One partner,
              <br />
              comprehensive financial solutions.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-[15.5px] leading-relaxed text-ink-1 lg:justify-self-end lg:text-right">
              From core software development to supporting infrastructure —
              every service is engineered to operate independently or integrate
              seamlessly as a unified platform.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-x">
        {/* tab switcher */}
        <Reveal delay={0.1}>
          <div className="mb-8 inline-flex gap-2 rounded-full border border-[var(--panel-border)] bg-panel-2 p-1.5">
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  activeCat === c.id
                    ? "bg-[image:var(--grad-signal)] text-white"
                    : "text-ink-1 hover:text-ink-0"
                }`}
              >
                {c.id === "software" ? (
                  <Code2 size={14} />
                ) : (
                  <Server size={14} />
                )}
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-8 max-w-lg text-[14.5px] leading-relaxed text-ink-1">
              {category.tagline}
            </p>

            <div
              className={`grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--panel-border)] ${
                colsClass[category.services.length] ??
                "sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {category.services.map((s) => (
                <a
                  key={s.title}
                  href="#kontak"
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}