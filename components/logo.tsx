// components/logo.tsx
export function Logo({ className = "h-9 w-32" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Intidata"
      className={`${className} object-contain`}
    />
  );
}