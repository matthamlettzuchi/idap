// components/admin/article-editor.tsx
"use client";

import { useState, useTransition } from "react";
import type { JSONContent } from "@tiptap/react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { MediaPicker } from "@/components/admin/media-picker";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import type { ArticleRow } from "@/lib/admin/articles";
import { saveArticle, setArticleStatus } from "@/app/admin/(protected)/articles/actions";
import { slugify } from "@/lib/admin/slugify";

export function ArticleEditor({
  article,
  canPublish,
}: {
  article: ArticleRow;
  canPublish: boolean;
}) {
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [content, setContent] = useState<JSONContent>(article.content as JSONContent);
  const [coverImage, setCoverImage] = useState(article.cover_image);
  const [category, setCategory] = useState(article.category ?? "");
  const [tagsInput, setTagsInput] = useState(article.tags.join(", "));
  const [seoTitle, setSeoTitle] = useState(article.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(article.seo_description ?? "");
  const [mediaOpen, setMediaOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveArticle(article.id, {
        title,
        slug: slug || slugify(title),
        excerpt,
        content,
        coverImage,
        category,
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
        seoTitle,
        seoDescription,
      });
      setSavedAt(new Date());
    });
  }

  function handlePublishToggle() {
    startTransition(async () => {
      await handleSave();
      await setArticleStatus(article.id, article.status === "published" ? "draft" : "published");
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="flex items-center justify-between">
          <StatusBadge status={article.status} />
          <div className="flex items-center gap-3">
            {savedAt && (
              <span className="text-[12px] text-ink-2">Saved {savedAt.toLocaleTimeString()}</span>
            )}
            <button
              onClick={handleSave}
              disabled={pending}
              className="rounded-full border border-(--panel-border) px-4 py-2 text-[13px] font-medium text-ink-1 hover:text-ink-0 disabled:opacity-60"
            >
              {pending ? "Saving..." : "Save Draft"}
            </button>
            {canPublish && (
              <button
                onClick={handlePublishToggle}
                disabled={pending}
                className="rounded-full bg-signal-blue px-4 py-2 text-[13px] font-medium text-white disabled:opacity-60"
              >
                {article.status === "published" ? "Unpublish" : "Publish"}
              </button>
            )}
          </div>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          className="mt-6 w-full bg-transparent font-display text-[28px] font-semibold text-ink-0 outline-none placeholder:text-ink-3"
        />

        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short excerpt shown on the blog list..."
          className="mt-3 w-full bg-transparent text-[14px] text-ink-1 outline-none placeholder:text-ink-3"
        />

        <div className="mt-6">
          <RichTextEditor content={content} onChange={setContent} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-(--panel-border) bg-panel p-5">
          <div className="mono-label mb-3">Cover Image</div>
          {coverImage ? (
            <div className="relative">
              <img src={coverImage} alt="" className="aspect-video w-full rounded-lg object-cover" />
              <button
                onClick={() => setCoverImage(null)}
                className="mt-2 text-[12px] text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => setMediaOpen(true)}
              className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-(--panel-border-strong) text-[12.5px] text-ink-2 hover:border-signal-teal hover:text-signal-teal"
            >
              Choose image
            </button>
          )}
        </div>

        <div className="rounded-xl border border-(--panel-border) bg-panel p-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Tags (comma separated)</label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-(--panel-border) bg-panel p-5 space-y-4">
          <div className="mono-label">SEO</div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">SEO Title</label>
            <input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">SEO Description</label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
            />
          </div>
        </div>
      </div>

      {mediaOpen && (
        <MediaPicker
          onSelect={(url) => {
            setCoverImage(url);
            setMediaOpen(false);
          }}
          onClose={() => setMediaOpen(false)}
        />
      )}
    </div>
  );
}