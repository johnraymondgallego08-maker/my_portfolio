import type { Metadata } from "next";
import { NotebookIcon } from "@/components/atoms/Icons";
import { LogFilterList } from "@/components/molecules/LogFilterList";
import { getLogs } from "@/lib/logs";

export const metadata: Metadata = {
  title: "Logs",
  description:
    "Search and filter portfolio logs covering practice work, project development, and research entries."
};

export default async function LogsPage() {
  const logs = await getLogs();

  return (
    <div>
      <header className="hero-gradient relative overflow-hidden text-orange-200">
        <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-28 w-full animate-scan-line bg-gradient-to-b from-transparent via-moss/20 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 motion-safe:animate-fade-up">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-moss">
              <NotebookIcon className="h-4 w-4" />
              Portfolio Logs
            </p>
            <h1 className="text-3xl font-black tracking-normal text-white sm:text-5xl">
              Build logs and research notes in one timeline.
            </h1>
            <p className="text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Search by title or summary, then filter practice work, project updates, and research entries by tag.
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-12 motion-safe:animate-fade-up sm:px-6 lg:px-8">
        <LogFilterList logs={logs} />
      </div>
    </div>
  );
}
