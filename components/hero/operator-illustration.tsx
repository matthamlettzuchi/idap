"use client";

import { motion } from "framer-motion";

const barHeights = [18, 30, 22, 36];

export function OperatorIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 380" fill="none" className={className} aria-hidden>
      {/* desk / monitor with a little finance chart */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <rect x="70" y="272" width="150" height="86" rx="10" fill="#ffffff" opacity="0.14" />
        <rect x="86" y="288" width="118" height="54" rx="6" fill="#ffffff" opacity="0.22" />
        {barHeights.map((h, i) => (
          <rect
            key={i}
            x={98 + i * 24}
            y={330 - h}
            width="12"
            height={h}
            rx="2"
            fill="var(--signal-amber)"
          />
        ))}
      </motion.g>

      {/* operator: headset + mic */}
      <motion.g
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M92 300c0-52 26-84 68-84s68 32 68 84" fill="#ffffff" opacity="0.95" />
        <circle cx="160" cy="140" r="46" fill="#ffffff" />
        <path
          d="M118 132a42 42 0 0 1 84 0"
          stroke="var(--ink-0)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="116" cy="140" r="9" fill="var(--ink-0)" />
        <circle cx="204" cy="140" r="9" fill="var(--ink-0)" />
        <path
          d="M116 149c-4 10-2 20 8 24"
          stroke="var(--ink-0)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="126" cy="174" r="3.5" fill="var(--signal-blue)" />
      </motion.g>

      {/* speech bubble — operator is mid-conversation */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "236px 96px" }}
      >
        <path
          d="M206 70h68a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10h-42l-14 14v-14h-12a10 10 0 0 1-10-10V80a10 10 0 0 1 10-10z"
          fill="#ffffff"
        />
        <circle cx="224" cy="94" r="4" fill="var(--signal-blue)" />
        <circle cx="240" cy="94" r="4" fill="var(--signal-blue)" />
        <circle cx="256" cy="94" r="4" fill="var(--signal-blue)" />
      </motion.g>

      {/* the client on the other end of the call */}
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="52" cy="72" r="28" fill="#ffffff" opacity="0.95" />
        <circle cx="52" cy="62" r="10" fill="var(--ink-0)" opacity="0.7" />
        <path d="M34 88c2-12 8-18 18-18s16 6 18 18" fill="var(--ink-0)" opacity="0.7" />
      </motion.g>

      {/* dashed line connecting the two, drawn in */}
      <motion.path
        d="M74 84c30 18 46 34 62 46"
        stroke="#ffffff"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* live-call pulse */}
      <circle cx="136" cy="130" r="3" fill="var(--signal-amber)">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.8s"
          begin="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}