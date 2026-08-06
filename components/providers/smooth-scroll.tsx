"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // sambungin klik ke semua link "#anchor" (nav, footer, hero CTA, dll)
    // biar scroll-nya pakai animasi Lenis, bukan teleport bawaan browser
    function handleAnchorClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -80, // biar ga ketutup navbar fixed
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}