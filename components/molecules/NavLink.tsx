"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={`group relative inline-flex min-h-11 items-center overflow-hidden rounded-full px-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
        isActive
          ? "bg-moss text-ink shadow-[0_12px_32px_rgba(255,208,47,0.24)]"
          : "text-slate-200 hover:bg-white/10 hover:text-white"
      }`}
      href={href}
    >
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
