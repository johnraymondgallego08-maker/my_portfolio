"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-clay text-white shadow-[0_12px_30px_rgba(47,109,246,0.2)] hover:bg-navy",
  secondary:
    "border border-clay/15 bg-white/90 text-navy hover:border-clay hover:bg-skywash/45 hover:text-clay"
};

export function Button({
  children,
  className = "",
  variant = "secondary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`inline-flex min-h-11 max-w-full items-center justify-center rounded-full px-4 py-2 text-center text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
