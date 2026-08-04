import { clientLogos } from "@/lib/data";
import { Marquee } from "@/components/marquee";

export function TrustedBy() {
  return (
    <div className="relative border-y border-[var(--panel-border)] bg-void py-9">
      <div className="container-x mb-6">
        <span className="mono-label">Dipercaya oleh perusahaan terkemuka</span>
      </div>
      <Marquee items={clientLogos} />
    </div>
  );
}
