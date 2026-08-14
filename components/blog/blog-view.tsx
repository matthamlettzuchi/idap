"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Search,
} from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { FloatingActions } from "@/components/floating-actions";
import { Reveal } from "@/components/ui/reveal";
import type { BlogPost } from "@/lib/blog";
const ALL = "All" as const;

// Same 4 placeholder patterns your static data used to assign per-post —
// now derived deterministically from the slug, used ONLY when a post has
// no featured image in WordPress, so the visual identity you already had
// (icon over a subtle pattern) is preserved instead of a broken <img>.
const patternStyles = [
  {
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
    backgroundSize: "26px 26px",
  },
  {
    backgroundImage:
      "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.4px)",
    backgroundSize: "15px 15px",
  },
  {
    backgroundImage:
      "repeating-linear-gradient(115deg, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 20px)",
  },
  {
    backgroundImage:
      "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 18px), repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 18px)",
  },
] as const;

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function ArticleThumb({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  if (post.image) {
    return (
      <div className={`relative overflow-hidden bg-panel-2 ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary WordPress-hosted path, not a configured next/image domain */}
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // No featured image set in WordPress — fall back to the original
  // icon+pattern placeholder look instead of a broken image.
  const pattern = patternStyles[hashSlug(post.slug) % patternStyles.length];

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(135deg, #0e1120 0%, #171d3a 55%, #232c5c 100%)",
      }}
    >
      <div className="absolute inset-0" style={pattern} />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 15%, rgba(111,141,255,0.35), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-sm">
          <Newspaper size={24} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}

function AuthorBadge({ author }: { author: BlogPost["author"] }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-signal)] font-display text-[11px] font-semibold text-white">
        {author.initials}
      </span>
      <div className="text-[12.5px] font-medium text-ink-0">{author.name}</div>
    </div>
  );
}

function FeaturedCarousel({ posts }: { posts: BlogPost[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (posts.length === 0) return null;
  const active = posts[index];

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + posts.length) % posts.length);
  };

  return (
    <div className="relative">
      <div className="relative aspect-[4/3.4] w-full sm:aspect-[16/11]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.slug}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <ArticleThumb post={active} className="h-full w-full rounded-3xl" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.slug + "-card"}
            custom={direction}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="absolute inset-x-4 -bottom-8 rounded-2xl border border-(--panel-border) bg-panel p-6 shadow-[0_30px_60px_-24px_rgba(17,24,39,0.35)] sm:inset-x-auto sm:-bottom-6 sm:left-8 sm:right-8 sm:p-7 lg:right-[-8%] lg:w-[68%]"
          >
            <div className="flex items-center gap-2.5 text-[11px] text-ink-2">
              <span className="mono-label !text-[10.5px] !text-signal-blue">
                {active.category}
              </span>
              <span aria-hidden>&middot;</span>
              <span>{active.readTime}</span>
            </div>
            <h3 className="mt-3 font-display text-[18px] font-semibold leading-snug text-ink-0 sm:text-[20px]">
              {active.title}
            </h3>
            <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-ink-2">
              {active.excerpt}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-(--panel-border) pt-4">
              <AuthorBadge author={active.author} />
              <Link
                href={`/blog/${active.slug}`}
                aria-label="Read article"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--panel-border) text-signal-blue transition-colors hover:border-signal-blue"
              >
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-between sm:mt-9 sm:justify-end sm:gap-3">
        <div className="flex items-center gap-1.5 sm:order-1 sm:mr-auto">
          {posts.map((p, i) => (
            <button
              key={p.slug}
              aria-label={`Ke artikel unggulan ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-signal-blue"
                  : "w-1.5 bg-(--panel-border-strong)"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Artikel unggulan sebelumnya"
            onClick={() => go(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-(--panel-border) text-ink-1 transition-colors hover:border-signal-blue hover:text-signal-blue"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Artikel unggulan berikutnya"
            onClick={() => go(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-(--panel-border) text-ink-1 transition-colors hover:border-signal-blue hover:text-signal-blue"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Reveal delay={Math.min(index, 5) * 0.05}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--panel-border) bg-panel transition-colors hover:border-(--panel-border-strong)"
      >
        <div className="relative aspect-video overflow-hidden">
          <ArticleThumb
            post={post}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="mono-label !text-[10.5px] !text-signal-blue">
            {post.category}
          </span>
          <h3 className="mt-3 font-display text-[16px] font-medium leading-snug text-ink-0">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-ink-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between border-t border-(--panel-border) pt-4 text-[11.5px] text-ink-2">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <span className="mt-4 flex items-center gap-1.5 text-[12.5px] font-medium text-signal-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Read Article
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function BlogView({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const featuredPosts = useMemo(() => posts.filter((p) => p.featured), [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === ALL || post.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-40 lg:pt-36">
        <section className="relative overflow-hidden pb-14 sm:pb-10">
          <div className="dot-grid-texture pointer-events-none absolute inset-0 opacity-70" />
          <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
            <Reveal>
              <span className="mono-label">Insights &amp; Resources</span>
              <h1 className="mt-6 text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.05]">
                Technology insights for a{" "}
                <span className="text-signal-blue">
                  smarter digital future.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-1">
                Perspectives from the Intidata team on software development,
                digital transformation, and the technology shaping multifinance,
                factoring, accounting, and plantation operations across
                Indonesia.
              </p>

              <div className="mt-8 flex items-center gap-2 rounded-full border border-(--panel-border) bg-panel p-1.5 pl-5 shadow-[0_16px_32px_-24px_rgba(17,24,39,0.25)]">
                <Search size={16} className="shrink-0 text-ink-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-transparent text-[14px] text-ink-0 placeholder:text-ink-3 focus:outline-none"
                />
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal-blue text-white">
                  <Search size={15} />
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <FeaturedCarousel posts={featuredPosts} />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-(--panel-border) bg-panel-2">
          <div className="container-x">
            <div
              className="flex items-center gap-2 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {[ALL, ...categories].map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "border-signal-blue bg-signal-blue text-white"
                        : "border-(--panel-border) bg-panel text-ink-1 hover:border-(--panel-border-strong) hover:text-ink-0"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="container-x">
            <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="mono-label">Articles</span>
                <h2 className="mt-3 text-[clamp(24px,2.8vw,34px)] font-semibold">
                  Latest Insights
                </h2>
              </div>
              <p className="text-[13px] text-ink-2">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
              </p>
            </Reveal>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, i) => (
                  <ArticleCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            ) : (
              <Reveal className="rounded-2xl border border-(--panel-border) bg-panel px-8 py-16 text-center">
                <p className="text-[14.5px] text-ink-2">
                  {posts.length === 0
                    ? "We couldn't reach the blog right now. Please check that intidata-blog.local is running and try again."
                    : `No articles match "${query}" in ${
                        activeCategory === ALL ? "any category" : activeCategory
                      }.`}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
      <FloatingActions />
    </div>
  );
}
