"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { X } from "lucide-react";
import {
  defaultSeasonalThemes,
  pickActiveSeasonalTheme,
  type SeasonalTheme,
} from "@/lib/seasonal-theme";
import { supabase } from "@/lib/supabase";
import { storageUrl } from "@/lib/storage";

function RamadanLampIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
      <path
        d="M24 4v5"
        stroke="#fde68a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 12h18l-2 6H17l-2-6Z"
        fill="#fde68a"
        fillOpacity="0.25"
        stroke="#fde68a"
        strokeWidth="1.5"
      />
      <path
        d="M16 18h16l-1.5 16a2 2 0 0 1-2 1.8h-9a2 2 0 0 1-2-1.8L16 18Z"
        fill="#fbbf24"
        fillOpacity="0.35"
        stroke="#fde68a"
        strokeWidth="1.5"
      />
      <circle cx="24" cy="26" r="4" fill="#fef3c7" fillOpacity="0.9" />
      <path
        d="M20 40h8l-1.5 4h-5L20 40Z"
        fill="#fde68a"
        stroke="#fde68a"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EnvelopeClosedIcon({ theme }: { theme: SeasonalTheme }) {
  if (theme.envelopeIcon === "cny") {
    return (
      <Image
        src="/envelope-cny.png"
        alt=""
        width={400}
        height={400}
        className="h-24 w-24 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      />
    );
  }
  if (theme.envelopeIcon === "christmas") {
    return (
      <Image
        src={storageUrl("images", "envelope-cny.png")}
        alt=""
        width={400}
        height={400}
        className="h-24 w-24 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
      />
    );
  }
  return <RamadanLampIcon />;
}

export function SeasonalEnvelope() {
  const [theme, setTheme] = useState<SeasonalTheme | null>(null);
  const [open, setOpen] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHiddenByScroll(latest > 80);
    if (latest > 80) setOpen(false);
  });

  useEffect(() => {
    let cancelled = false;
    async function loadSeasonalTheme() {
      const { data, error } = await supabase
        .from("seasonal_themes")
        .select(
          "id, label, start_month, start_day, end_month, end_day, decoration, envelope_icon, accent, envelope_title, envelope_message",
        )
        .order("sort_order", { ascending: true });
      if (cancelled) return;

      const themes: SeasonalTheme[] =
        !error && data && data.length > 0
          ? data.map((t) => ({
              id: t.id,
              label: t.label,
              startMonth: t.start_month,
              startDay: t.start_day,
              endMonth: t.end_month,
              endDay: t.end_day,
              decoration: t.decoration,
              envelopeIcon: t.envelope_icon,
              accent: t.accent,
              envelopeTitle: t.envelope_title,
              envelopeMessage: t.envelope_message,
            }))
          : defaultSeasonalThemes;

      setTheme(pickActiveSeasonalTheme(themes, new Date()));
    }
    loadSeasonalTheme();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!theme) return null;

  return (
    <AnimatePresence>
      {!hiddenByScroll && (
        <motion.div
          key="envelope-root"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-24 lg:bottom-4 lg:right-18 z-40 sm:bottom-8 sm:right-28"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 right-0 w-72 rounded-2xl border p-5 shadow-[0_24px_50px_-20px_rgba(17,24,39,0.35)]"
                style={{
                  background: "var(--panel)",
                  borderColor: `${theme.accent}40`,
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Tutup"
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-panel-2 hover:text-ink-0"
                >
                  <X size={14} />
                </button>
                <div className="mono-label" style={{ color: theme.accent }}>
                  {theme.label}
                </div>
                <h4 className="mt-2 font-display text-[17px] font-semibold text-ink-0">
                  {theme.envelopeTitle}
                </h4>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-1">
                  {theme.envelopeMessage}
                </p>
              </motion.div>
            ) : (
              <motion.button
                key="closed"
                onClick={() => setOpen(true)}
                aria-label="Buka ucapan"
                initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: -14,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotate: { duration: 0.4 },
                  y: {
                    duration: 2.6,
                    delay: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.28,
                  rotate: -4,
                  y: -6,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{ scale: 1.1 }}
                style={{ transformOrigin: "bottom right" }}
                className="relative flex h-50 w-50 items-end justify-end"
              >
                <EnvelopeClosedIcon theme={theme} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
