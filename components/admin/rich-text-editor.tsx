// components/admin/rich-text-editor.tsx
"use client";

import { useEditor, EditorContent, type Editor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { MediaPicker } from "@/components/admin/media-picker";
import { useEffect, useState } from "react";

function ToolbarButton({
  active,
  onClick,
  children,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
        active ? "bg-signal-blue text-white" : "text-ink-1 hover:bg-panel-2"
      }`}
    >
      {children}
    </button>
  );
}

// Normalizes whatever the user typed into either a root-relative internal
// path ("/blog/my-post") or a proper absolute external URL. Without this,
// a bare "blog/my-post" gets resolved by the browser relative to whatever
// page it's rendered on — which inside the admin editor is
// /admin/articles/[id], producing the "ngarahin ke admin/articles/..." bug.
function normalizeHref(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:|#)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  // looks like a bare domain (e.g. "example.com/page") → treat as external
  if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/i.test(trimmed)) return `https://${trimmed}`;
  // otherwise assume it's an internal path they forgot the leading slash on
  return `/${trimmed.replace(/^\/+/, "")}`;
}

function LinkPopover({
  editor,
  open,
  onClose,
}: {
  editor: Editor;
  open: boolean;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) setValue(editor.getAttributes("link").href ?? "");
  }, [open, editor]);

  if (!open) return null;

  function apply() {
    const href = normalizeHref(value);
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    onClose();
  }

  function remove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }

  return (
    <div className="absolute left-0 top-full z-30 mt-1 w-80 rounded-lg border border-(--panel-border) bg-panel p-3 shadow-lg">
      <label className="mb-1.5 block text-[11.5px] font-medium text-ink-2">
        Link URL
      </label>
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            apply();
          }
          if (e.key === "Escape") onClose();
        }}
        placeholder="/blog/judul-artikel or https://example.com"
        className="w-full rounded-md border border-(--panel-border) bg-panel-2 px-2.5 py-1.5 text-[13px] text-ink-0 outline-none focus:border-signal-teal"
      />
      <p className="mt-1.5 text-[11px] leading-snug text-ink-2">
        Internal link → start with <code>/</code> (e.g.{" "}
        <code>/blog/judul-artikel</code>). External link → start with{" "}
        <code>https://</code>.
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={remove}
          className="text-[12px] text-red-500 hover:underline"
        >
          Remove
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-3 py-1.5 text-[12px] text-ink-2 hover:text-ink-0"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={apply}
          className="rounded-md bg-signal-blue px-3 py-1.5 text-[12px] font-medium text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export function RichTextEditor({
  content,
  onChange,
}: {
  content: JSONContent;
  onChange: (json: JSONContent) => void;
}) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start writing the article..." }),
    ],
    content: content && Object.keys(content).length ? content : "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[400px] px-5 py-4 text-ink-0 focus:outline-none " +
          "[&_h1]:text-[26px] [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-3 " +
          "[&_h2]:text-[21px] [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 " +
          "[&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 " +
          "[&_p]:mb-3 [&_p]:leading-relaxed " +
          "[&_a]:text-signal-blue [&_a]:underline [&_a]:underline-offset-2 " +
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1 " +
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:space-y-1 " +
          "[&_li]:pl-1 " +
          "[&_blockquote]:border-l-2 [&_blockquote]:border-signal-teal [&_blockquote]:pl-4 [&_blockquote]:my-3 [&_blockquote]:text-ink-1 " +
          "[&_img]:my-4 [&_img]:rounded-lg",
      },
      // Auto-converts pasted plain text where every line starts with a
      // bullet symbol (•, -, *) or a number ("1.", "2.") into a real
      // bullet/ordered list, instead of dumping it in as literal text.
      // This only kicks in when there's no HTML on the clipboard — real
      // HTML paste (e.g. from Word/Google Docs with actual <ul><li>) is
      // left alone since ProseMirror already converts that correctly.
      handlePaste: (view, event) => {
        const html = event.clipboardData?.getData("text/html");
        const text = event.clipboardData?.getData("text/plain");
        if (html || !text) return false;

        const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
        const bulletRegex = /^[•\u2022\-\*]\s+/;
        const orderedRegex = /^\d+[.)]\s+/;
        const isBullet = lines.length > 1 && lines.every((l) => bulletRegex.test(l.trim()));
        const isOrdered =
          !isBullet && lines.length > 1 && lines.every((l) => orderedRegex.test(l.trim()));
        if (!isBullet && !isOrdered) return false;

        event.preventDefault();
        const { state, dispatch } = view;
        const schema = state.schema;
        const listItemType = schema.nodes.listItem;
        const listType = isBullet ? schema.nodes.bulletList : schema.nodes.orderedList;
        const paragraphType = schema.nodes.paragraph;
        if (!listItemType || !listType || !paragraphType) return false;

        const items = lines.map((line) => {
          const clean = line.trim().replace(bulletRegex, "").replace(orderedRegex, "");
          return listItemType.create(null, paragraphType.create(null, schema.text(clean)));
        });
        const list = listType.create(null, items);
        dispatch(state.tr.replaceSelectionWith(list));
        return true;
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-(--panel-border) bg-panel">
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 rounded-t-xl border-b border-(--panel-border) bg-panel-2 p-2">
        <ToolbarButton label="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={16} />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-(--panel-border)" />
        <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-(--panel-border)" />
        <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton label="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-(--panel-border)" />
        <div className="relative">
          <ToolbarButton label="Link" active={editor.isActive("link")} onClick={() => setLinkOpen((v) => !v)}>
            <LinkIcon size={16} />
          </ToolbarButton>
          <LinkPopover editor={editor} open={linkOpen} onClose={() => setLinkOpen(false)} />
        </div>
        <ToolbarButton label="Image" onClick={() => setMediaOpen(true)}>
          <ImageIcon size={16} />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-(--panel-border)" />
        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />

      {mediaOpen && (
        <MediaPicker
          onSelect={(url) => {
            editor.chain().focus().setImage({ src: url }).run();
            setMediaOpen(false);
          }}
          onClose={() => setMediaOpen(false)}
        />
      )}
    </div>
  );
}