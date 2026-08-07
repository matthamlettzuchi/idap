"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { Rocket, Flag } from "lucide-react";

type Waypoint = { x: number; y: number };

function buildWaypoints(count: number): Waypoint[] {
  // ASIMETRIS: sisi kiri (x kecil) gak usah jauh-jauh dari tengah, sisi kanan
  // (x besar) didorong mepet ke 100 — hasilnya kurva condong & lebih banyak
  // "mengisi" area kanan section, bukan zigzag simetris di tengah kayak sebelumnya.
  return Array.from({ length: count }, (_, i) => ({
    x: i % 2 === 0 ? 22 : 98,
    y: (i / (count - 1)) * 100,
  }));
}

/** Catmull-Rom → cubic Bezier, biar jalur melengkung mulus, bukan patah tegas di tiap titik */
function buildSmoothPathD(points: Waypoint[]) {
  if (points.length < 2) return "";
  const p = points;
  let d = `M ${p[0].x} ${p[0].y}`;

  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

export function JourneyTrail({
  steps,
  className,
}: {
  steps: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // ref ke <path> asli yang dirender, dipakai buat baca geometri kurva
  // sesungguhnya lewat getPointAtLength — bukan interpolasi lurus antar titik.
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.4,
  });

  const points = buildWaypoints(steps + 1);
  const pathD = buildSmoothPathD(points);

  const dotOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  // posisi titik biru sekarang di-drive manual dari geometri path asli,
  // bukan dari useTransform(points) yang cuma interpolasi garis lurus
  // antar waypoint — itu penyebab titik "keluar jalur" di tikungan tajam.
  const dotLeft = useMotionValue("0%");
  const dotTop = useMotionValue("0%");

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    function updatePosition(p: number) {
      if (!path) return;
      const length = path.getTotalLength();
      if (!length) return;
      const clamped = Math.min(1, Math.max(0, p));
      const point = path.getPointAtLength(clamped * length);
      // viewBox 0 0 100 100 → koordinat path sudah dalam skala 0-100,
      // jadi bisa langsung dipakai sebagai persen posisi (left/top).
      dotLeft.set(`${point.x}%`);
      dotTop.set(`${point.y}%`);
    }

    updatePosition(progress.get());
    const unsubscribe = progress.on("change", updatePosition);
    return () => unsubscribe();
  }, [progress, dotLeft, dotTop]);

  const first = points[0];
  const last = points[points.length - 1];
  const middle = points.slice(1, -1);

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <path
          d={pathD}
          stroke="var(--panel-border-strong)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          ref={pathRef}
          d={pathD}
          stroke="var(--signal-teal)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
        />
      </svg>

      {middle.map((p, i) => (
        <span
          key={i}
          aria-hidden
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-teal bg-void"
        />
      ))}

      <div
        style={{ left: `${first.x}%`, top: `${first.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-signal-teal bg-void text-signal-teal shadow-[0_0_16px_-2px_var(--signal-teal)]">
          <Rocket size={15} strokeWidth={2} />
        </span>
        <span className="mono-label absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap !text-[9.5px]">
          Mulai
        </span>
      </div>

      <div
        style={{ left: `${last.x}%`, top: `${last.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-signal-teal bg-signal-teal text-white shadow-[0_0_18px_-2px_var(--signal-teal)]">
          <Flag size={15} strokeWidth={2} />
        </span>
        <span className="mono-label absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap !text-[9.5px] !text-signal-teal">
          Hari Ini
        </span>
      </div>

      <motion.span
        aria-hidden
        style={{ left: dotLeft, top: dotTop, opacity: dotOpacity }}
        className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-teal shadow-[0_0_18px_5px_rgba(111,141,255,0.55)]"
      />
    </div>
  );
}