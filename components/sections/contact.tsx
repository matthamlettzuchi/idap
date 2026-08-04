"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden bg-void py-32">
      <div className="grid-texture pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(47,224,194,.25), transparent 65%)",
        }}
      />

      <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="mono-label">Kontak</span>
          <h2 className="mt-6 text-[clamp(32px,4vw,48px)] font-semibold">
            Mari mulai
            <br />
            percakapan.
          </h2>
          <p className="mt-7 max-w-sm text-[15.5px] leading-relaxed text-ink-1">
            Kami siap menghadirkan teknologi yang sesuai dan mampu
            meningkatkan kinerja bisnis Anda.
          </p>
          <Button asChild size="default" className="mt-9">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> Hubungi via WhatsApp
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel divide-y divide-[var(--panel-border)] p-2">
            <ContactRow icon={<MapPin size={17} />} label="Lokasi">
              <p className="text-[15px] font-medium leading-snug text-ink-0">
                {contact.address}
              </p>
            </ContactRow>
            <ContactRow icon={<Mail size={17} />} label="Email">
              <a
                href={`mailto:${contact.email}`}
                className="text-[15px] font-medium text-ink-0 transition-colors hover:text-signal-teal"
              >
                {contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone size={17} />} label="Telepon">
              <div className="flex flex-col gap-1">
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/-/g, "")}`}
                    className="text-[15px] font-medium text-ink-0 transition-colors hover:text-signal-teal"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </ContactRow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="group flex gap-4 rounded-[calc(var(--radius)-6px)] p-6 transition-colors hover:bg-panel-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--panel-border)] text-signal-teal transition-colors group-hover:border-[var(--panel-border-strong)]">
        {icon}
      </span>
      <div>
        <div className="mono-label !text-[10.5px]">{label}</div>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}
