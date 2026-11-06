import { ArrowUpRight, Asterisk, Hash } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M24 4a20 20 0 1 0 19.6 24" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M24 12.5A11.5 11.5 0 1 0 35.5 24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M30 6.5c6 2.5 10.5 8 11.5 14.5" className="stroke-primary" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.6" className="fill-primary" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <span className="text-xl leading-none tracking-tight">
        <span className="font-semibold">TAIBA</span>
        <span className="font-normal">Creations</span>
      </span>
    </span>
  );
}

/* Brand "# * #" glyph cluster */
export function StarGlyph({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center text-primary", className)}>
      <Hash className="h-[1em] w-[1em] -skew-x-12" strokeWidth={3.4} />
      <Asterisk className="-mx-[0.08em] h-[1em] w-[1em]" strokeWidth={3.6} />
      <Hash className="h-[1em] w-[1em] -skew-x-12" strokeWidth={3.4} />
    </span>
  );
}

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ink" | "light" | "ghost" | "ghost-light";
  className?: string;
  bubble?: boolean;
};

const variants: Record<NonNullable<CtaProps["variant"]>, string> = {
  primary: "bg-primary text-primary-foreground hover:shadow-glow",
  ink: "bg-ink text-ink-foreground hover:bg-primary",
  light: "bg-background text-primary hover:text-primary-deep",
  ghost: "border border-foreground/20 text-foreground hover:border-primary hover:text-primary",
  "ghost-light": "border border-ink-foreground/30 text-ink-foreground hover:border-ink-foreground",
};

export function CtaButton({ href, children, variant = "primary", className, bubble }: CtaProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-base font-medium transition-all duration-500 ease-expo md:text-lg",
        variants[variant],
        bubble && "bubble-tail",
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-current/15">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-5 group-hover:-translate-y-5" />
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </a>
  );
}

/* Pure CSS/SVG glowing AI core used on dark backgrounds */
export function AiCore({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative aspect-square", className)}>
      <div className="absolute inset-[18%] rounded-full bg-primary/40 blur-3xl" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <circle cx="100" cy="100" r="96" fill="none" className="stroke-ink-foreground/15" strokeDasharray="2 6" />
        <circle cx="100" cy="4" r="3" className="fill-primary-glow" />
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-[10%] h-[80%] w-[80%] animate-spin-slower">
        <circle cx="100" cy="100" r="96" fill="none" className="stroke-primary/50" strokeWidth="1" strokeDasharray="40 14" />
        <circle cx="196" cy="100" r="4" className="fill-spark" />
      </svg>
      <div className="absolute inset-[30%] rounded-full bg-gradient-primary shadow-glow">
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_30%_25%,var(--primary-foreground),transparent_45%)] opacity-60" />
      </div>
    </div>
  );
}
