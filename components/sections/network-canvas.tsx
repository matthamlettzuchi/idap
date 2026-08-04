"use client";

import { useEffect, useRef } from "react";

type Anchor = { x: number; y: number; label: string };

const anchors: Anchor[] = [
  { x: 0.5, y: 0.5, label: "Core Ledger" },
  { x: 0.16, y: 0.22, label: "FISCUS Multifinance" },
  { x: 0.84, y: 0.2, label: "FISCUS Factoring" },
  { x: 0.14, y: 0.78, label: "Planta" },
  { x: 0.86, y: 0.8, label: "FISCUS Accounting" },
  { x: 0.5, y: 0.08, label: "SLIK — OJK" },
  { x: 0.5, y: 0.92, label: "SILARAS — OJK" },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
];

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const ambient = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      r: 0.6 + Math.random() * 1.1,
    }));

    const packets = edges.map((e, i) => ({
      edge: e,
      t: i / edges.length,
      speed: 0.09 + Math.random() * 0.05,
    }));

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      ctx!.fillStyle = "rgba(17,24,39,0.18)";
      ambient.forEach((p) => {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
        }
        ctx!.beginPath();
        ctx!.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });

      // edges
      edges.forEach(([a, b]) => {
        const pa = anchors[a];
        const pb = anchors[b];
        ctx!.beginPath();
        ctx!.moveTo(pa.x * width, pa.y * height);
        ctx!.lineTo(pb.x * width, pb.y * height);
        ctx!.strokeStyle = "rgba(75,100,255,0.22)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      });

      // anchors
      anchors.forEach((a, i) => {
        const r = i === 0 ? 5 : 3.4;
        ctx!.beginPath();
        ctx!.arc(a.x * width, a.y * height, r, 0, Math.PI * 2);
        ctx!.fillStyle = i === 0 ? "#2fe0c2" : "#4b64ff";
        ctx!.shadowColor = i === 0 ? "#2fe0c2" : "#4b64ff";
        ctx!.shadowBlur = i === 0 ? 16 : 8;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      });

      // traveling packets
      if (!reduced) {
        packets.forEach((p) => {
          p.t = (p.t + p.speed * 0.016) % 1;
          const pa = anchors[p.edge[0]];
          const pb = anchors[p.edge[1]];
          const x = pa.x + (pb.x - pa.x) * p.t;
          const y = pa.y + (pb.y - pa.y) * p.t;
          const glow = Math.sin(p.t * Math.PI);
          ctx!.beginPath();
          ctx!.arc(x * width, y * height, 2 + glow * 1.6, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(47,75,208,0.95)";
          ctx!.shadowColor = "#2fe0c2";
          ctx!.shadowBlur = 10;
          ctx!.fill();
          ctx!.shadowBlur = 0;
        });
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
      {anchors.map((a) => (
        <span
          key={a.label}
          className="pointer-events-none absolute -translate-x-1/2 translate-y-3 whitespace-nowrap font-mono text-[11px] tracking-wide text-ink-1"
          style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%` }}
        >
          {a.label}
        </span>
      ))}
    </div>
  );
}
