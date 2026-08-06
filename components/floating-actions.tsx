"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { contact } from "@/lib/data";

export function FloatingActions() {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollButtonVisible(latest > 480);
  });

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {/* WhatsApp — selalu tampil, nggak tergantung scroll */}
      <motion.a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2 }}
        aria-label="Hubungi kami via WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-shadow hover:shadow-[0_14px_36px_-8px_rgba(37,211,102,0.7)]"
      >
        <FaWhatsapp size={22} />
      </motion.a>

      {/* Scroll to top — perilaku sama seperti sebelumnya, muncul setelah scroll */}
      <AnimatePresence>
        {scrollButtonVisible && (
          <motion.button
            key="top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            aria-label="Kembali ke atas"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--panel-border)] bg-panel text-ink-1 shadow-[0_10px_30px_-10px_rgba(17,24,39,0.35)] transition-colors hover:border-signal-teal hover:text-signal-teal"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}