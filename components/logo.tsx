import Image from "next/image";

export function Logo({ className = "h-9 w-32" }: { className?: string }) {
  return (
    <Image
      src="/logo-light.png"
      alt="Intidata"
      height={9}
      width={32}
      className={`${className} object-contain`}
    />
  );
}