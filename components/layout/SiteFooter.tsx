export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night">
      <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:54px_54px]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-orange-200 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Internship portfolio for Johnraymond Gallego at Makerspace InnovHub.</p>
        <p className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-orange-300 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-moss/50">
          Node.js, EJS, Tailwind CSS, Vercel
        </p>
      </div>
    </footer>
  );
}
