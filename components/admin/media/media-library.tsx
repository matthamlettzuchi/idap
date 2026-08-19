"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  Copy,
  RefreshCw,
  Search,
  Check,
  FolderOpen,
  ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";

type BucketKey = "media" | "images";

type FileItem = {
  path: string;
  name: string;
  url: string;
  size: number | null;
  updatedAt: string | null;
};

const BUCKET_INFO: Record<
  BucketKey,
  { label: string; desc: string; defaultFolder: string; accent: string }
> = {
  media: {
    label: "Media",
    desc: "Images used inside article content — inserted via the rich text editor's Image tool.",
    defaultFolder: "articles",
    accent: "#0e9488",
  },
  images: {
    label: "Images",
    desc: "Website illustration & general site imagery — hero art, product shots, logos, etc.",
    defaultFolder: "folder",
    accent: "#2f4bd0",
  },
};

const MAX_UPLOAD_BYTES = 1 * 1024 * 1024; // 1 MB

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

function formatBytes(bytes: number | null) {
  if (bytes === null) return "—";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function MediaLibrary() {
  const supabase = createClient();
  const [activeBucket, setActiveBucket] = useState<BucketKey>("media");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [uploadFolder, setUploadFolder] = useState(
    BUCKET_INFO.media.defaultFolder,
  );
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Storage list() only returns one level, and folders come back as entries
  // with id: null and no metadata — so we recurse into those to flatten the
  // whole bucket (capped at depth 3 to stay safe against runaway nesting).
  const listRecursive = useCallback(
    async (
      bucket: BucketKey,
      prefix = "",
      depth = 0,
    ): Promise<{ items: FileItem[]; error: string | null }> => {
      if (depth > 3) return { items: [], error: null };
      const { data, error } = await supabase.storage.from(bucket).list(prefix, {
        limit: 200,
        sortBy: { column: "created_at", order: "desc" },
      });
      if (error) return { items: [], error: error.message };
      if (!data) return { items: [], error: null };

      let result: FileItem[] = [];
      for (const entry of data) {
        if (entry.name === ".emptyFolderPlaceholder") continue;
        const fullPath = prefix ? `${prefix}/${entry.name}` : entry.name;
        const isFolder = entry.id === null;

        if (isFolder) {
          const nested = await listRecursive(bucket, fullPath, depth + 1);
          if (nested.error) return { items: result, error: nested.error };
          result = result.concat(nested.items);
        } else {
          const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(fullPath);
          result.push({
            path: fullPath,
            name: entry.name,
            url: urlData.publicUrl,
            size: (entry.metadata?.size as number) ?? null,
            updatedAt: entry.updated_at ?? null,
          });
        }
      }
      return { items: result, error: null };
    },
    [supabase],
  );

  const [loadError, setLoadError] = useState<string | null>(null);

  const loadFiles = useCallback(
    async (bucket: BucketKey) => {
      setLoading(true);
      setLoadError(null);
      const { items, error } = await listRecursive(bucket);
      if (error) setLoadError(error);
      items.sort((a, b) =>
        (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
      );
      setFiles(items);
      setLoading(false);
    },
    [listRecursive],
  );

  useEffect(() => {
    loadFiles(activeBucket);
    setUploadFolder(BUCKET_INFO[activeBucket].defaultFolder);
  }, [activeBucket, loadFiles]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const oversized = files.filter((f) => f.size > MAX_UPLOAD_BYTES);
    const uploadable = files.filter((f) => f.size <= MAX_UPLOAD_BYTES);

    if (oversized.length > 0) {
      alert(
        `${oversized.length} file${oversized.length > 1 ? "s" : ""} over the 1 MB limit ` +
          `and ${oversized.length > 1 ? "were" : "was"} not uploaded:\n` +
          oversized
            .map((f) => `• ${f.name} (${formatBytes(f.size)})`)
            .join("\n"),
      );
    }

    if (uploadable.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    const folder = uploadFolder.trim().replace(/^\/+|\/+$/g, "");

    let successCount = 0;
    for (const file of uploadable) {
      const cleanName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const path = folder ? `${folder}/${cleanName}` : cleanName;
      const { error } = await supabase.storage
        .from(activeBucket)
        .upload(path, file);
      if (error) {
        alert(`Failed to upload ${file.name}: ${error.message}`);
      } else {
        successCount += 1;
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await loadFiles(activeBucket);

    if (successCount > 0) {
      alert(
        `${successCount} file${successCount > 1 ? "s" : ""} uploaded successfully to "${activeBucket}".`,
      );
    }
  }

  async function handleDelete(path: string) {
    setFiles((prev) => prev.filter((f) => f.path !== path));
    const { error } = await supabase.storage.from(activeBucket).remove([path]);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      loadFiles(activeBucket);
    }
  }

  function handleCopy(url: string, path: string) {
    navigator.clipboard.writeText(url);
    setCopiedPath(path);
    setTimeout(
      () => setCopiedPath((prev) => (prev === path ? null : prev)),
      1500,
    );
  }

  const filteredFiles = files.filter((f) =>
    f.path.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const info = BUCKET_INFO[activeBucket];

  return (
    <div className="space-y-5">
      {/* Bucket tabs */}
      <div className="flex flex-wrap gap-3">
        {(Object.keys(BUCKET_INFO) as BucketKey[]).map((key) => {
          const b = BUCKET_INFO[key];
          const active = activeBucket === key;
          return (
            <button
              key={key}
              onClick={() => setActiveBucket(key)}
              className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors"
              style={{
                borderColor: active ? b.accent : "var(--panel-border)",
                background: active ? `${b.accent}14` : "var(--panel)",
              }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${b.accent}22`, color: b.accent }}
              >
                <FolderOpen size={16} />
              </span>
              <div>
                <div
                  className="text-[13.5px] font-semibold"
                  style={{ color: active ? b.accent : "var(--ink-0)" }}
                >
                  {b.label}
                </div>
                <div className="text-[11px] text-ink-2">bucket: {key}</div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[12.5px] leading-relaxed text-ink-2">{info.desc}</p>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-(--panel-border) bg-panel p-4">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2">
          <Search size={14} className="shrink-0 text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-transparent text-[13px] text-ink-0 outline-none placeholder:text-ink-3"
          />
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2">
          <span className="shrink-0 text-[11.5px] text-ink-2">Folder:</span>
          <input
            value={uploadFolder}
            onChange={(e) => setUploadFolder(e.target.value)}
            placeholder="e.g. articles, products"
            className="w-36 bg-transparent text-[13px] text-ink-0 outline-none placeholder:text-ink-3"
          />
        </div>

        <label
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
          style={{ background: info.accent }}
          title="Max file size: 1 MB"
        >
          <Upload size={14} />
          {uploading ? "Uploading..." : "Upload (max 1 MB)"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <button
          onClick={() => loadFiles(activeBucket)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-(--panel-border) px-3 py-2 text-[13px] text-ink-1 hover:text-ink-0"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loadError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          Couldn't load files from the &quot;{activeBucket}&quot; bucket:{" "}
          {loadError}
        </div>
      )}
      {/* File grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-xl bg-panel-2"
            />
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-(--panel-border-strong) py-16 text-center text-[13px] text-ink-2">
          {files.length === 0
            ? `No files in the "${activeBucket}" bucket yet. Upload one above.`
            : `No files match "${query}".`}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredFiles.map((file) => (
            <div
              key={file.path}
              className="group relative overflow-hidden rounded-xl border border-(--panel-border) bg-panel-2"
            >
              <div className="relative aspect-square bg-panel">
                {IMAGE_EXT.test(file.name) ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Supabase storage-hosted path
                  <img
                    src={file.url}
                    alt={file.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-3">
                    <ImageIcon size={28} />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/55 group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(file.url, file.path)}
                    aria-label="Copy URL"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                  >
                    {copiedPath === file.path ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <ConfirmButton
                    label="Delete"
                    confirmLabel="Delete this file?"
                    onConfirm={() => handleDelete(file.path)}
                    className="flex h-8 items-center justify-center gap-1 rounded-full bg-red-500/85 px-3 text-[11.5px] font-medium text-white hover:bg-red-500"
                  />
                </div>
              </div>

              <div className="p-2.5">
                <div
                  className="truncate text-[11.5px] font-medium text-ink-0"
                  title={file.path}
                >
                  {file.name}
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[10.5px] text-ink-2">
                  <span>{formatBytes(file.size)}</span>
                  {file.updatedAt && (
                    <span>{new Date(file.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
