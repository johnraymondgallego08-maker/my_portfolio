import type { Metadata } from "next";
import { LogModalList } from "@/components/molecules/LogModalList";
import { getLogs } from "@/lib/logs";

export const metadata: Metadata = {
  title: "Logs",
  description:
    "Weekly notes about Node.js, EJS, Tailwind CSS, and the H4M WORKFORCE ACCOUNTABILITY ATTENDANCE AND PAYROLL project."
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Build Logs
            </p>
            <h1 className="text-3xl font-black tracking-normal text-orange-300 sm:text-5xl">
              Weekly notes from practice to real project deployment.
            </h1>
            <p className="text-base leading-7 text-orange-200 sm:text-lg sm:leading-8">
              Notes from learning Node.js and building the H4M WORKFORCE ACCOUNTABILITY ATTENDANCE AND PAYROLL system.
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-12 motion-safe:animate-fade-up sm:px-6 lg:px-8">
        <LogModalList logs={logs} />
      </div>
    </div>
  );
}
