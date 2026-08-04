export function Marquee({
  items,
  className,
  reverse = false,
  duration,
}: {
  items: string[];
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
        className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: duration ? `${duration}s` : undefined,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-[17px] font-medium tracking-tight text-ink-2 transition-colors hover:text-ink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
