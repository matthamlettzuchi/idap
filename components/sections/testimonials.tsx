"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  testimonials as staticTestimonials,
  type Testimonial,
} from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { GridGlobe } from "../ui/grid-globe";
import { ClusterPin, ClusterPerson } from "@/components/ui/doodle";
import { supabase } from "@/lib/supabase";

const AUTOPLAY_DELAY = 6000;

function TestimonialSkeleton() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
      <div className="aspect-[4/3] w-full animate-pulse rounded-[var(--radius-lg)] bg-panel-2" />
      <div className="relative flex min-h-[480px] flex-col sm:min-h-[440px]">
        <div className="mt-6 h-7 w-7 animate-pulse rounded bg-panel-2" />
        <div className="mt-4 space-y-3">
          <div className="h-5 w-full animate-pulse rounded bg-panel-2" />
          <div className="h-5 w-11/12 animate-pulse rounded bg-panel-2" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-panel-2" />
        </div>
        <div className="absolute inset-x-0 bottom-20 flex items-center gap-3 sm:bottom-24">
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-panel-2" />
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-panel-2" />
            <div className="h-3 w-36 animate-pulse rounded bg-panel-2" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-panel-2" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-panel-2" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = dotsContainerRef.current;
    const dot = dotRefs.current[index];
    if (!container || !dot) return;

    const targetScroll =
      dot.offsetLeft - container.clientWidth / 2 + dot.clientWidth / 2;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, [index]);
  useEffect(() => {
    let cancelled = false;
    async function loadTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, category, quote, name, role, company, initials, video_id")
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      if (!error && data && data.length > 0) {
        setTestimonials(
          data.map((t) => ({
            id: t.id,
            category: t.category,
            quote: t.quote,
            name: t.name,
            role: t.role,
            company: t.company,
            initials: t.initials,
            videoId: t.video_id,
          })),
        );
      } else {
        setTestimonials(staticTestimonials);
      }
    }
    loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  const active = testimonials ? testimonials[index] : null;

  const go = (dir: 1 | -1) => {
    if (!testimonials) return;
    setDirection(dir);
    setIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length,
    );
  };

  // autoplay: restarts whenever the slide changes or pause state toggles,
  // so any manual interaction naturally resets the countdown.
  useEffect(() => {
    if (isPaused || !testimonials) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_DELAY);

    return () => clearTimeout(timer);
  }, [index, isPaused, testimonials]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return (
    <section
      id="testimoni"
      className="relative overflow-hidden bg-void py-32"
      onFocusCapture={pause}
      onBlurCapture={resume}
      onTouchStart={pause}
    >
      <div className="grid-texture pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <Reveal className="relative mx-auto max-w-xl text-center">
          <span className="mono-label">Testimonials</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            What they said about Intidata.
          </h2>
          <p className="mt-6 text-[15.5px] leading-relaxed text-ink-1">
            Listen directly from our clients on how our system helped their
            operationals.
          </p>
          <GridGlobe />
          <ClusterPin className="pointer-events-none absolute -left-[260px] top-4 hidden h-[150px] w-[230px] opacity-70 lg:block" />
          <div className="pointer-events-none absolute -right-[260px] top-4 hidden h-[150px] w-[230px] scale-x-[-1] opacity-70 lg:block">
            <ClusterPerson className="h-full w-full" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          {!testimonials || !active ? (
            <TestimonialSkeleton />
          ) : (
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
              {/* visual card — video YouTube asli */}
              <div className="relative aspect-[4/3] w-full">
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.25, 0.4, 0.25] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -left-10 -top-10 h-[220px] w-[220px] rounded-full blur-[90px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(47,75,208,.35), transparent 65%)",
                  }}
                />
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="pointer-events-none absolute -bottom-8 -right-8 h-[200px] w-[200px] rounded-full blur-[80px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(111,141,255,.3), transparent 65%)",
                  }}
                />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 24 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] p-1.5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(47,75,208,0.12), rgba(111,141,255,0.12))",
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-lg)-6px)] bg-panel-2">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${active.videoId}`}
                        title={active.company}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* content */}
              <div className="relative flex min-h-[480px] flex-col sm:min-h-[440px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.id + "-content"}
                    custom={direction}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Quote
                      size={28}
                      className="mt-6 text-ink-3"
                      strokeWidth={1.5}
                    />
                    <p className="mt-4 text-[19px] font-medium leading-relaxed text-ink-0 sm:text-[21px]">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* nama + role — posisi FIXED, nempel dekat nav controls */}
                <div className="absolute inset-x-0 bottom-20 flex items-center gap-3 sm:bottom-24">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id + "-author"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-signal)] font-display text-[14px] font-semibold text-white">
                        {active.initials}
                      </span>
                      <div>
                        <div className="font-display text-[15px] font-medium text-ink-0">
                          {active.name}
                        </div>
                        <div className="text-[13px] text-ink-2">
                          {active.role}, {active.company}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* nav controls */}
                <div
                  className="absolute inset-x-0 bottom-0 flex items-center gap-4"
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                >
                  <button
                    aria-label="Testimoni sebelumnya"
                    onClick={() => go(-1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--panel-border)] text-ink-1 transition-colors hover:border-signal-blue hover:text-signal-blue"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    aria-label="Testimoni selanjutnya"
                    onClick={() => go(1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--panel-border)] text-ink-1 transition-colors hover:border-signal-blue hover:text-signal-blue"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div
                    ref={dotsContainerRef}
                    className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {testimonials.map((t, i) => (
                      <button
                        key={t.id}
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        aria-label={`Ke testimoni ${i + 1}`}
                        onClick={() => {
                          setDirection(i > index ? 1 : -1);
                          setIndex(i);
                        }}
                        className="relative h-1.5 w-6 shrink-0 overflow-hidden rounded-full bg-[var(--panel-border-strong)]"
                      >
                        {i === index && (
                          <motion.span
                            key={isPaused ? `${i}-paused` : `${i}-playing`}
                            className="absolute inset-y-0 left-0 rounded-full bg-signal-blue"
                            initial={{ width: "0%" }}
                            animate={{ width: isPaused ? "100%" : "100%" }}
                            transition={
                              isPaused
                                ? { duration: 0 }
                                : {
                                    duration: AUTOPLAY_DELAY / 1000,
                                    ease: "linear",
                                  }
                            }
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
