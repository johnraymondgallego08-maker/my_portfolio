import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "accent" | "success";

const variants: Record<BadgeVariant, string> = {
  neutral: "border-clay/15 bg-white/90 text-navy",
  accent: "border-clay/25 bg-clay/10 text-clay",
  success: "border-moss/40 bg-moss/20 text-ink"
};

export function Badge({
  children,
  variant = "neutral"
}: {
  children: ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-medium shadow-[0_8px_24px_rgba(47,109,246,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(47,109,246,0.16)] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
