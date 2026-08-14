// components/admin/media-picker.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { X, Upload, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type MediaItem = { name: string; url: string };

export function MediaPicker({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function loadMedia() {
    setLoading(true);
    const { data, error } = await supabase.storage.from("media").list("articles", {
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!error && data) {
      setItems(
        data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => ({
            name: f.name,
            url: supabase.storage.from("media").getPublicUrl(`articles/${f.name}`).data.publicUrl,
          }))
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("media").upload(`articles/${fileName}`, file);
    setUploading(false);

    if (!error) {
      await loadMedia();
    } else {
      alert(`Upload failed: ${error.message}`);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-6">
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-panel">
        <div className="flex items-center justify-between border-b border-(--panel-border) px-6 py-4">
          <h2 className="font-display text-[16px] font-semibold text-ink-0">Media Library</h2>
          <button onClick={onClose} className="text-ink-2 hover:text-ink-0">
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-(--panel-border) px-6 py-4">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-(--panel-border-strong) py-4 text-[13px] text-ink-2 hover:border-signal-teal hover:text-signal-teal">
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload image"}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-[13px] text-ink-2">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-[13px] text-ink-2">No media uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onSelect(item.url)}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-(--panel-border) bg-panel-2"
                >
                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                    <Check size={20} className="text-white" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}