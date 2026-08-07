"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ShieldCheck, Zap } from "lucide-react";

export function CarryingPersonIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ opacity: 0, y: -24, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <DotLottieReact
        src="/bisnis.lottie"
        autoplay
        loop
        className="h-full w-full"
      />
    </motion.div>
  );
}

/** Radar/compass berputar pelan — nyambung tema "arah" & icon Compass di Misi */
export function DirectionCompass({
  className,
  delay = 0.15,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* denyut radar melebar */}
      <motion.circle
        cx="80"
        cy="80"
        r="70"
        stroke="var(--signal-teal)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.45, 0] }}
        viewport={{ once: false, margin: "-10% 0px" }}
        animate={{ scale: [0.42, 1] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeOut",
          delay: delay + 0.4,
        }}
        style={{ transformOrigin: "80px 80px" }}
      />

      {/* ring statis */}
      <circle
        cx="80"
        cy="80"
        r="52"
        stroke="var(--panel-border-strong)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      <circle
        cx="80"
        cy="80"
        r="30"
        stroke="var(--panel-border-strong)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      {/* tanda mata angin */}
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="80"
          y1="8"
          x2="80"
          y2="16"
          stroke="var(--ink-2)"
          strokeWidth="1.5"
          transform={`rotate(${deg} 80 80)`}
        />
      ))}

      {/* jarum yang berputar terus, kayak nyari arah */}
      <motion.g
        style={{ transformOrigin: "80px 80px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay }}
      >
        <line
          x1="80"
          y1="80"
          x2="80"
          y2="24"
          stroke="var(--signal-teal)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="80" cy="24" r="4" fill="var(--signal-teal)">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      </motion.g>

      <circle cx="80" cy="80" r="5" fill="var(--signal-teal)" />
    </motion.svg>
  );
}

const proofItems = [
  { icon: ShieldCheck, label: "Patuh Regulasi OJK" },
  { icon: Zap, label: "Real-time Data" },
];

/** Badge mengambang keluar dari sudut kartu — isi kekosongan sekaligus proof point */
export function FloatingProofBadges({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {proofItems.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16, x: -10 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.6,
            delay: 0.15 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-3 last:mb-0"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--panel-border-strong)] bg-panel px-3.5 py-2 text-[12.5px] font-medium text-ink-0 shadow-[0_16px_32px_-16px_rgba(75,100,255,0.5)]"
          >
            <item.icon size={14} className="text-signal-teal" />
            {item.label}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}