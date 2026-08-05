"use client";

import { motion } from "framer-motion";

// pusat "bola" ada tepat di garis bawah frame → yang keliatan
// persis kubah/dome atas sampai ke garis khatulistiwa
const CX = 380;
const CY = 380;
const R = 380;

const LATITUDES = [90, 165, 240, 315]; // ry makin besar = makin dekat ke pinggir
const LONGITUDES = [55, 130, 205, 280, 345]; // rx makin besar = makin dekat ke pinggir

export function GridGlobe() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[-48px] z-10 h-[260px] w-[640px] -translate-x-1/2 sm:h-[340px] sm:w-[820px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
      }}
    >
      <motion.svg
        viewBox="0 0 760 400"
        className="h-full w-full"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <radialGradient id="globeGlow" cx="10%" cy="100%" r="85%">
            <stop offset="0%" stopColor="var(--signal-teal)" stopOpacity="0.22" />
            <stop offset="55%" stopColor="var(--signal-teal)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--signal-teal)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="globeLine" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--panel-border-strong)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--panel-border-strong)" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* halo lembut, kesan cahaya */}
        <circle cx={CX} cy={CY} r={R} fill="url(#globeGlow)" />

        {/* garis lintang: ellipse konsentris, makin pipih makin dekat kutub */}
        {LATITUDES.map((ry, i) => (
          <ellipse
            key={`lat-${i}`}
            cx={CX}
            cy={CY}
            rx={R}
            ry={ry}
            stroke="url(#globeLine)"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* garis bujur: ellipse konsentris, makin ramping mendekati tengah */}
        {LONGITUDES.map((rx, i) => (
          <ellipse
            key={`lon-${i}`}
            cx={CX}
            cy={CY}
            rx={rx}
            ry={R}
            stroke="url(#globeLine)"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* garis pinggir / silhouette bola */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          stroke="url(#globeLine)"
          strokeWidth="1.4"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}