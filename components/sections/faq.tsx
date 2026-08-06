"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-surface pb-32 pt-16">
      {/* dekorasi background — tetap terang, cuma ditambah tekstur & glow */}
      <div className="halftone-texture pointer-events-none absolute inset-0 opacity-50" />

      <motion.div
        aria-hidden
        animate={{ opacity: [0.15, 0.32, 0.15], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[420px] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--signal-blue-light), transparent 65%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.1, 0.22, 0.1], x: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        className="pointer-events-none absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--signal-blue), transparent 65%)",
        }}
      />

      <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Image
            src="/faq.svg"
            alt="Ilustrasi FAQ"
            width="400"
            height="400"
            className="mb-10"
          />
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Questions that
            <br />
            were asked frequently.
          </h2>
          <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-ink-1">
            Didn&apos;t find the answer you&apos;re looking for?<br></br>Our team is ready to help.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}