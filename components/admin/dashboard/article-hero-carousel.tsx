"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import type { ArticleHeroItem } from "@/lib/admin/articles";

const AUTOPLAY_DELAY = 5000;

export function ArticleHeroCarousel({ articles }: { articles: ArticleHeroItem[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || articles.length <= 1) return;
    const timer = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % articles.length);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [index, paused, articles.length]);

  if (articles.length === 0) return null;
  const active = articles[index];

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex((prev) => (prev + dir + articles.length) % articles.length);
  }

  return (
    <div
      className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl border border-(--panel-border) sm:h-72"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {active.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- Supabase storage-hosted path
            <img
              src={active.coverImage}
              alt={active.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0e1120 0%, #171d3a 55%, #232c5c 100%)",
              }}
            >
              <Newspaper size={36} className="text-white/40" strokeWidth={1.5} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span className="mono-label !text-[10.5px] !text-white/70">Latest Article</span>
            <Link
              href={`/admin/articles/${active.id}`}
              className="mt-2 block max-w-2xl font-display text-[20px] font-semibold leading-snug text-white hover:underline sm:text-[26px]"
            >
              {active.title}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {articles.length > 1 && (
        <>
          <button
            aria-label="Previous article"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next article"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute right-6 top-6 flex items-center gap-1.5">
            {articles.map((a, i) => (
              <button
                key={a.id}
                aria-label={`Go to article ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}