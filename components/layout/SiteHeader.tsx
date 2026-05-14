import Link from "next/link";
import { NavLink } from "@/components/molecules/NavLink";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-night/[0.92] shadow-[0_18px_45px_rgba(5,9,20,0.22)] backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <span className="block h-full w-1/2 animate-line-sweep bg-gradient-to-r from-transparent via-moss to-transparent" />
      </div>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <Link
          className="group inline-flex min-h-11 min-w-0 items-center text-lg font-black tracking-normal text-white transition duration-300 hover:text-slate-100"
          href="/"
        >
          <span className="mr-3 h-3 w-3 rounded-full bg-moss shadow-[0_0_24px_rgba(255,208,47,0.8)] transition duration-300 group-hover:scale-125" />
          <span className="min-w-0 break-words">John Raymond Gallego</span>
        </Link>
        <div className="flex min-w-0 flex-wrap gap-2">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/work" label="Work" />
          <NavLink href="/logs" label="Logs" />
        </div>
      </nav>
    </header>
  );
}
