import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { formatDate } from "@/lib/format";
import type { LogEntry } from "@/lib/types";

export function LogCard({
  log,
  onOpen
}: {
  log: LogEntry;
  onOpen?: (log: LogEntry) => void;
}) {
  const titleContent = onOpen ? (
    <button
      className="inline-flex min-h-11 min-w-0 items-center rounded-sm text-left transition duration-300 hover:translate-x-1 hover:text-clay"
      onClick={() => onOpen(log)}
      type="button"
    >
      <span className="min-w-0 break-words">{log.title}</span>
    </button>
  ) : (
    <Link className="inline-flex min-h-11 min-w-0 items-center rounded-sm transition duration-300 hover:translate-x-1 hover:text-clay" href={`/logs/${log.slug}`}>
      <span className="min-w-0 break-words">{log.title}</span>
    </Link>
  );

  return (
    <article className="interactive-card panel-gradient group rounded-md border border-clay/15 p-5 shadow-soft transition duration-500 hover:-translate-y-2 hover:border-clay/35 hover:shadow-lift">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-steel">
        <time dateTime={log.date}>{formatDate(log.date)}</time>
        <span className="text-moss" aria-hidden="true">/</span>
        <span>{log.readingMinutes} min read</span>
      </div>
      <h2 className="break-words text-xl font-bold tracking-normal text-ink transition duration-300 group-hover:text-navy">
        {titleContent}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{log.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2" aria-label={`${log.title} tags`}>
        {log.tags.map((tag) => (
          <Badge key={tag} variant="accent">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}
