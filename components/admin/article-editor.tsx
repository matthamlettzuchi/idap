// components/admin/article-editor.tsx
"use client";

import { useState, useTransition } from "react";
import type { JSONContent } from "@tiptap/react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { MediaPicker } from "@/components/admin/media-picker";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import type { ArticleRow, ArticleStatus } from "@/lib/admin/articles";
import { saveArticle } from "@/app/admin/(protected)/articles/actions";
import { slugify } from "@/lib/admin/slugify";
import { FIELD_LIMITS } from "@/lib/admin/field-limits";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { LimitedTextArea } from "@/components/admin/ui/limited-textarea";

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
  const [content, setContent] = useState<JSONContent>(
    article.content as JSONContent,
  );
  const [coverImage, setCoverImage] = useState(article.cover_image);
  const [category, setCategory] = useState(article.category ?? "");
  const [tagsInput, setTagsInput] = useState(article.tags.join(", "));
  const [seoTitle, setSeoTitle] = useState(article.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    article.seo_description ?? "",
  );
  const [status, setStatus] = useState<"draft" | "published">(
    article.status === "published" ? "published" : "draft",
  );
  const [mediaOpen, setMediaOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [pending, startTransition] = useTransition();
  const overLimit =
    title.length > FIELD_LIMITS.articleTitle ||
    excerpt.length > FIELD_LIMITS.articleExcerpt ||
    (slug || slugify(title)).length > FIELD_LIMITS.slug ||
    category.length > FIELD_LIMITS.articleCategory ||
    seoTitle.length > FIELD_LIMITS.seoTitle ||
    seoDescription.length > FIELD_LIMITS.seoDescription;

  function handleSave() {
    if (overLimit) return;
    startTransition(async () => {
      await saveArticle(article.id, {
        title,
        slug: slug || slugify(title),
        excerpt,
        content,
        coverImage,
        category,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        seoTitle,
        seoDescription,
        status: canPublish ? status : "draft",
      });
      setSavedAt(new Date());
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={status} />
          <div className="flex items-center gap-3">
            {savedAt && (
              <span className="text-[12px] text-ink-2">
                Saved {savedAt.toLocaleTimeString()}
              </span>
            )}
            {overLimit && (
              <span className="text-[12px] font-medium text-red-500">
                Fix fields over their character limit before saving.
              </span>
            )}
            {canPublish && (
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "draft" | "published")
                }
                className="rounded-full border border-(--panel-border) bg-panel px-3.5 py-2 text-[13px] font-medium text-ink-1 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            )}
            <button
              onClick={handleSave}
              disabled={pending || overLimit}
              className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
            >
              {pending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <LimitedInput
          maxLength={FIELD_LIMITS.articleTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          className="mt-6 font-display text-[28px] font-semibold placeholder:text-ink-3"
        />

        <LimitedTextArea
          maxLength={FIELD_LIMITS.articleExcerpt}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short excerpt shown on the blog list..."
          className="mt-3 text-[14px] text-ink-1"
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
              <img
                src={coverImage}
                alt=""
                className="aspect-video w-full rounded-lg object-cover"
              />
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
          <LimitedInput
            label="Slug"
            maxLength={FIELD_LIMITS.slug}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <LimitedInput
            label="Category"
            maxLength={FIELD_LIMITS.articleCategory}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Tags (comma separated)
            </label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13px] text-ink-0 outline-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-(--panel-border) bg-panel p-5 space-y-4">
          <div className="mono-label">SEO</div>
          <LimitedInput
            label="SEO Title"
            maxLength={FIELD_LIMITS.seoTitle}
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
          />
          <LimitedTextArea
            label="SEO Description"
            maxLength={FIELD_LIMITS.seoDescription}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={3}
          />
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
