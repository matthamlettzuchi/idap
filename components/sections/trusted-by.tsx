import { clientLogos } from "@/lib/data";
import { Marquee } from "@/components/marquee";
import Image from "next/image";

export function TrustedBy() {
  return (
    <div className="relative border-y border-[var(--panel-border)] bg-void py-9">
      <Marquee items={clientLogos}>
      </Marquee>
    </div>
  );
}
