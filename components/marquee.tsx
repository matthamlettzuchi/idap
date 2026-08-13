import Image from "next/image";

type MarqueeItem = string | { name: string; logo: string };

export function Marquee({
  items,
  className,
  reverse = false,
  duration,
}: {
  items: MarqueeItem[];
  className?: string;
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className ?? ""}`}
    >
      <div
        className="flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: duration ? `${duration}s` : undefined,
        }}
      >
        {doubled.map((item, i) =>
          typeof item === "string" ? (
            <span
              key={i}
              className="font-display text-[17px] font-medium tracking-tight text-ink-2 transition-colors hover:text-ink-0"
            >
              {item}
            </span>
          ) : (
            // Fixed-size bounding box for every logo, regardless of its
            // native aspect ratio — wide text-wordmarks (e.g. "Moores
            // Rowland") and compact square marks (e.g. "Ventura") both
            // scale down to fit the same box via object-contain, so the
            // row reads as visually even instead of some logos looming
            // much larger than others.
            <div
              key={i}
              className="flex h-20 w-40 shrink-0 items-center justify-center"
            >
              <Image
                src={item.logo}
                alt={item.name}
                height={80}
                width={160}
                className="h-auto max-h-16 w-auto max-w-36 object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}