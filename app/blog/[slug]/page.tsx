import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { FloatingActions } from "@/components/floating-actions";
import { getBlogPostBySlug, getPosts } from "@/lib/wordpress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300; // re-check WordPress every 5 minutes

export async function generateStaticParams() {
  try {
    const rows = await getPosts();
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    // WordPress unreachable at build time — fall back to on-demand rendering.
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Intidata Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-40 pb-24 lg:pt-36">
        <article className="container-x max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-signal-blue"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <div className="mt-6 flex items-center gap-2.5 text-[11px] text-ink-2">
            <span className="mono-label !text-[10.5px] !text-signal-blue">
              {post.category}
            </span>
            <span aria-hidden>&middot;</span>
            <span>{post.date}</span>
            <span aria-hidden>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.1] text-ink-0">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-2.5 border-b border-(--panel-border) pb-8">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-signal)] font-display text-[12px] font-semibold text-white">
              {post.author.initials}
            </span>
            <div className="text-[13.5px] font-medium text-ink-0">
              {post.author.name}
            </div>
          </div>

          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary WordPress-hosted path
            <img
              src={post.image}
              alt={post.title}
              className="mt-8 aspect-video w-full rounded-2xl object-cover"
            />
          )}

          {/*
            content.rendered is trusted HTML authored by you in wp-admin —
            same trust model as any headless WordPress setup. Not user-
            submitted input, so dangerouslySetInnerHTML is appropriate here.
          */}
          <div
            className="prose prose-neutral mt-10 max-w-none text-[15.5px] leading-relaxed text-ink-1 [&_a]:text-signal-blue [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-ink-0 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-ink-0 [&_img]:rounded-xl [&_p]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>

      <Contact />
      <Footer />
      <FloatingActions />
    </div>
  );
}