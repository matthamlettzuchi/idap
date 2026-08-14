import Image from "next/image";
import { storageUrl } from "@/lib/storage";

export function Logo({ className = "h-9 w-32" }: { className?: string }) {
  return (
    <Image
      src={storageUrl("images", "logo-light.png")}
      alt="Intidata"
      height={9}
      width={32}
      unoptimized
      className={`${className} object-contain`}
    />
  );
}