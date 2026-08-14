import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";
import { FloatingActions } from "@/components/floating-actions";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300; // re-check Supabase every 5 minutes

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(decodeURIComponent(slug));
  if (!post) return {};
  return { title: `${post.title} — Intidata Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(decodeURIComponent(slug));

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
            // eslint-disable-next-line @next/next/no-img-element -- Supabase storage-hosted path
            <img
              src={post.image}
              alt={post.title}
              className="mt-8 aspect-video w-full rounded-2xl object-cover"
            />
          )}

          {/*
            contentHtml is generated from TipTap JSON authored by admins in
            the CMS editor (components/admin/rich-text-editor.tsx) — not
            user-submitted input, so dangerouslySetInnerHTML is appropriate
            here, same trust model as the old WordPress content.rendered.

            NOTE: this project does not have @tailwindcss/typography
            installed, so the "prose" classes below render as inert —
            they add no actual styling. Every element style (including
            list bullets/numbers, which were previously invisible) is
            therefore spelled out explicitly via arbitrary-variant
            selectors instead of relying on the typography plugin.
          */}
          <div
            className="prose prose-neutral mt-10 max-w-none text-[15.5px] leading-relaxed text-ink-1 [&_a]:text-signal-blue [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-ink-0 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-ink-0 [&_img]:rounded-xl [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:pl-1 [&_li>p]:mt-0 [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-signal-blue [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ink-2"
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