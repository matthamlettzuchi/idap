import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[14.5px] font-medium tracking-tight transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--grad-signal)] text-[#04101f] hover:brightness-110 hover:-translate-y-px shadow-[0_0_0_0_rgba(75,100,255,0)] hover:shadow-[0_10px_30px_-10px_rgba(47,224,194,0.55)]",
        ghost:
          "bg-transparent text-ink-0 border border-[var(--panel-border)] hover:border-[var(--panel-border-strong)] hover:bg-white/[0.04]",
        subtle:
          "bg-panel-2 text-ink-0 border border-[var(--panel-border)] hover:border-[var(--panel-border-strong)]",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[13.5px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
