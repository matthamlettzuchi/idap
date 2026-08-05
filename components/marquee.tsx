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
        className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]"
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
            <img
              key={i}
              src={item.logo}
              alt={item.name}
              className="h-16 w-auto shrink-0 object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          )
        )}
      </div>
    </div>
  );
}