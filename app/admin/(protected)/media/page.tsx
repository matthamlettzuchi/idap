import { MediaLibrary } from "@/components/admin/media/media-library";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">Media Library</h1>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Manage both storage buckets from one place —{" "}
        <span className="font-medium text-signal-teal">media</span> for article images (inserted
        via the article editor) and{" "}
        <span className="font-medium" style={{ color: "#2f4bd0" }}>
          images
        </span>{" "}
        for website illustration content (hero art, product/service imagery, logos, etc).
      </p>
      <div className="mt-6">
        <MediaLibrary />
      </div>
    </div>
  );
}