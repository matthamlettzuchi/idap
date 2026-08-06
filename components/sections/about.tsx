// components/sections/about.tsx
"use client";

import { Compass, Code2, Link2, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { sectionTones } from "@/lib/section-tones";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Compass,
    tag: "Consulting",
    detail:
      "Mapping your current operational processes before a single line of code is written.",
  },
  {
    icon: Code2,
    tag: "Development",
    detail:
      "Building modular core systems that grow alongside your business scale.",
  },
  {
    icon: Link2,
    tag: "Integration",
    detail:
      "Directly connecting your internal systems with regulatory reporting systems.",
  },
  {
    icon: ShieldCheck,
    tag: "Maintenance",
    detail:
      "Keeping system performance stable long after the project is declared complete.",
  },
];

export function About() {
  return (
<section id="tentang" style={sectionTones.dark} className="relative overflow-hidden bg-void py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--signal-blue-light), transparent 65%)" }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--signal-blue), transparent 65%)" }}
        animate={{ x: [0, 30, 0], y: [0, -24, 0], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr]">        <Reveal>
          <span className="mono-label">About Us</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            More than just a
            <br />
            software developer.
          </h2>
          <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-1">
            PT Intidata Anugrah Pratama forms a team equal in creativity
            and intelligence to understand the needs, challenges, and
            business goals of every partner.
          </p>

          {/* small stat accent to keep left column filled */}
          <div className="mt-10 flex gap-10 border-t border-[var(--panel-border)] pt-8">
            <div>
              <div className="font-display text-[26px] font-semibold text-signal-teal">
                25+
              </div>
              <div className="mt-1 text-[12.5px] text-ink-2">
                Years of experience
              </div>
            </div>
            <div>
              <div className="font-display text-[26px] font-semibold text-signal-teal">
                17+
              </div>
              <div className="mt-1 text-[12.5px] text-ink-2">
                Active clients
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <div
                key={c.tag}
                className="group relative flex flex-col justify-between bg-panel p-7 transition-colors duration-300 hover:bg-panel-2"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--panel-border)] text-signal-teal transition-colors duration-300 group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
                    <c.icon size={19} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[12px] tracking-wide text-ink-2">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-8">
                  <div className="font-display text-[19px] font-medium text-ink-0">
                    {c.tag}
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                    {c.detail}
                  </p>
                </div>

                <div className="mt-6 h-px w-full origin-left scale-x-0 bg-[image:var(--grad-signal)] transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}