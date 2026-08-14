"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs as staticFaqs } from "@/lib/data";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import { storageUrl } from "@/lib/storage";

export function Faq() {
  const [faqs, setFaqs] = useState<typeof staticFaqs | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadFaqs() {
      const { data, error } = await supabase
        .from("faqs")
        .select("question, answer")
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      setFaqs(
        !error && data && data.length > 0
          ? data.map((f) => ({ q: f.question, a: f.answer }))
          : staticFaqs,
      );
    }
    loadFaqs();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-surface pb-32 pt-16"
    >
      <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-90" />

      {/* Decorative background glows */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.15, 0.32, 0.15], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[420px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--signal-blue-light), transparent 65%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.1, 0.22, 0.1], x: [0, -16, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.4,
        }}
        className="pointer-events-none absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--signal-blue), transparent 65%)",
        }}
      />

      <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Image
            src={storageUrl("images", "faq.svg")}
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
            Didn&apos;t find the answer you&apos;re looking for?
            <br />
            Our team is ready to help.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          {faqs === null ? (
            <div className="space-y-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-[var(--panel-border)] py-7"
                >
                  <div className="h-5 w-2/3 animate-pulse rounded bg-panel-2" />
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q || i} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </Reveal>
      </div>
    </section>
  );
}
