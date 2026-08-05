"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-[var(--panel-border)] bg-void/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <a href="#" className="flex items-center">
            <Logo className="h-12 w-32" />
          </a>
          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[14.5px] font-medium text-ink-1 transition-colors hover:text-ink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild size="sm" variant="primary">
              <a href="#kontak">Hubungi Kami</a>
            </Button>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center text-ink-0 md:hidden"
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-[var(--panel-border)] bg-void/95 backdrop-blur-xl md:hidden"
        >
          <div className="container-x flex flex-col gap-5 py-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-[20px] font-medium text-ink-0"
              >
                {item.label}
              </a>
            ))}
            <Button asChild variant="primary" className="mt-2">
              <a href="#kontak">Hubungi Kami</a>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
