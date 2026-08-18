"use client";

import { useRef, useState } from "react";
import { Upload, Link2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { storageUrl } from "@/lib/storage";

export function ImageField({
  label,
  value,
  onChange,
  folder = "products",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    setUploading(false);

    if (error) {
      alert(`Upload failed: ${error.message}`);
      return;
    }

    onChange(storageUrl("images", path));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-ink-2">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary/external preview
          <img
            src={value}
            alt=""
            className="h-14 w-14 shrink-0 rounded-lg border border-(--panel-border) bg-panel-2 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-(--panel-border-strong) text-ink-3">
            <Link2 size={16} />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload below"
            className="w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[12.5px] text-ink-0 outline-none focus:border-signal-teal"
          />
          <label className="inline-flex cursor-pointer items-center gap-1.5 text-[11.5px] font-medium text-signal-teal hover:underline">
            <Upload size={12} />
            {uploading ? "Uploading..." : "Upload image"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}