"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  getActiveSeasonalTheme,
  type SeasonalTheme,
} from "@/lib/seasonal-theme";

function SnowLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    const flakes = Array.from({ length: 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.5 + Math.random() * 2.2,
      vy: 0.06 + Math.random() * 0.08,
      vx: (Math.random() - 0.5) * 0.02,
      opacity: 0.4 + Math.random() * 0.5,
    }));

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "#ffffff";
      flakes.forEach((f) => {
        f.y += f.vy * 0.016;
        f.x += f.vx * 0.016;
        if (f.y > 1) f.y = -0.05;
        if (f.x > 1) f.x = 0;
        if (f.x < 0) f.x = 1;
        ctx!.globalAlpha = f.opacity;
        ctx!.beginPath();
        ctx!.arc(f.x * width, f.y * height, f.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-28 w-full"
    />
  );
}

export function NavSeasonalDecor() {
  const [theme, setTheme] = useState<SeasonalTheme | null>(null);

  useEffect(() => {
    setTheme(getActiveSeasonalTheme(new Date("2026-03-18")));
  }, []);

  if (!theme) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-28 overflow-hidden"
    >
      {theme.decoration === "lampion" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: [-4, 4, -4] }}
            transition={{
              opacity: { duration: 0.6 },
              y: { duration: 0.6 },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transformOrigin: "top center" }}
            className="absolute left-4 top-0 h-24 w-16 sm:left-8 sm:h-28 sm:w-20"
          >
            <Image
              src="/lampion.png"
              alt=""
              fill
              className="object-contain object-top"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: [4, -4, 4] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              y: { duration: 0.6, delay: 0.1 },
              rotate: {
                duration: 4.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              },
            }}
            style={{ transformOrigin: "top center" }}
            className="absolute right-4 top-0 h-24 w-16 sm:right-8 sm:h-28 sm:w-20"
          >
            <Image
              src="/lampion.png"
              alt=""
              fill
              className="object-contain object-top"
            />
          </motion.div>
        </>
      )}

      {theme.decoration === "ramadan" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: [0.75, 1, 0.75], y: 0 }}
            transition={{
              opacity: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 0.6 },
            }}
            className="absolute left-4 top-0 h-24 w-16 sm:left-10 sm:h-28 sm:w-20"
          >
            <Image
              src="/ramadan-lamp.png"
              alt=""
              fill
              className="object-contain object-top"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: [0.75, 1, 0.75], y: 0 }}
            transition={{
              opacity: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
              y: { duration: 0.6, delay: 0.1 },
            }}
            className="absolute right-4 top-0 h-24 w-16 sm:right-10 sm:h-28 sm:w-20"
          >
            <Image
              src="/ramadan-lamp.png"
              alt=""
              fill
              className="object-contain object-top"
            />
          </motion.div>
        </>
      )}

      {theme.decoration === "snow" && (
        <>
          <SnowLayer />
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: -10 }}
            animate={{ opacity: 1, rotate: -8, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-2 top-0 h-20 w-20 sm:h-24 sm:w-24"
          >
            <Image src="/holly.png" alt="" fill className="object-contain rotate-270" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: -10 }}
            animate={{ opacity: 1, rotate: -8, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-2 top-0 h-20 w-20 sm:h-24 sm:w-24"
          >
            <Image src="/holly.png" alt="" fill className="object-contain" />
          </motion.div>
        </>
      )}
    </div>
  );
}