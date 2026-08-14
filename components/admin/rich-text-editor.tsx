// components/admin/rich-text-editor.tsx
"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
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
import { useState } from "react";

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

export function RichTextEditor({
  content,
  onChange,
}: {
  content: JSONContent;
  onChange: (json: JSONContent) => void;
}) {
  const [mediaOpen, setMediaOpen] = useState(false);

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
          "prose prose-sm max-w-none min-h-[400px] px-5 py-4 text-ink-0 focus:outline-none [&_h1]:text-[26px] [&_h2]:text-[21px] [&_h3]:text-[17px] [&_a]:text-signal-blue [&_blockquote]:border-l-2 [&_blockquote]:border-signal-teal [&_blockquote]:pl-4 [&_blockquote]:text-ink-1",
      },
    },
  });

  if (!editor) return null;

  function setLink() {
    const previousUrl = editor!.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-(--panel-border) bg-panel">
      <div className="flex flex-wrap items-center gap-1 border-b border-(--panel-border) bg-panel-2 p-2">
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
        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon size={16} />
        </ToolbarButton>
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