import { clientLogos } from "@/lib/data";
import { Marquee } from "@/components/marquee";
import Image from "next/image";

export function TrustedBy() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--panel-border)] bg-void py-9">
      <div className="diagonal-lines-texture pointer-events-none absolute inset-0 opacity-50" />
      <Marquee items={clientLogos}></Marquee>
    </div>
  );
}
