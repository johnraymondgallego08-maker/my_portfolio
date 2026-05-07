"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { LogCard } from "@/components/molecules/LogCard";
import { ModalShell } from "@/components/molecules/ModalShell";
import { MarkdownContent } from "@/lib/markdown";
import { formatDate } from "@/lib/format";
import { useModalLifecycle } from "@/lib/useModalLifecycle";
import type { LogEntry } from "@/lib/types";

export function LogModalList({ logs }: { logs: LogEntry[] }) {
  const [activeLog, setActiveLog] = useState<LogEntry | null>(null);
  const closeModal = useCallback(() => setActiveLog(null), []);

  useModalLifecycle(Boolean(activeLog), closeModal);

  return (
    <>
      <section className="grid gap-5 md:grid-cols-2" aria-label="Weekly logs">
        {logs.map((log, index) => (
          <div
            className="motion-safe:animate-scale-in"
            key={log.slug}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <LogCard log={log} onOpen={setActiveLog} />
          </div>
        ))}
      </section>

      {activeLog ? (
        <LogModal log={activeLog} onClose={closeModal} />
      ) : null}
    </>
  );
}

function LogModal({
  log,
  onClose
}: {
  log: LogEntry;
  onClose: () => void;
}) {
  return (
    <ModalShell labelledBy="log-modal-title" onClose={onClose}>
        <header className="relative flex shrink-0 items-start justify-between gap-3 overflow-hidden border-b border-clay/15 bg-night px-3 py-4 text-orange-200 sm:gap-4 sm:px-6">
          <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:36px_36px]" />
          <div className="relative min-w-0 space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              Build log
            </p>
            <h2 className="break-words text-xl font-bold tracking-normal text-orange-300 sm:text-2xl" id="log-modal-title">
              {log.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-orange-200">
              <time dateTime={log.date}>{formatDate(log.date)}</time>
              <span className="text-moss" aria-hidden="true">/</span>
              <span>{log.readingMinutes} min read</span>
            </div>
          </div>
          <button
            aria-label="Close log"
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/15 text-lg font-bold text-orange-200 transition duration-300 hover:-translate-y-0.5 hover:border-moss hover:text-orange-100"
            onClick={onClose}
            type="button"
          >
            X
          </button>
        </header>

        <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-3 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="min-w-0 rounded-lg border border-clay/10 bg-white/90 p-4 shadow-soft transition duration-300 hover:shadow-glow sm:p-5">
            <MarkdownContent source={log.body} />
          </div>
          <aside className="animated-border min-w-0 space-y-4 rounded-lg border border-clay/15 bg-gradient-to-br from-skywash/55 to-white/80 p-4 text-sm shadow-soft lg:self-start">
            <div>
              <h3 className="font-bold text-ink">Summary</h3>
              <p className="mt-2 leading-6 text-slate-600">{log.summary}</p>
            </div>
            <div>
              <h3 className="font-bold text-ink">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {log.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Link
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-navy px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-clay"
              href={`/logs/${log.slug}`}
            >
              Open full page
            </Link>
          </aside>
        </div>
    </ModalShell>
  );
}
