"use client";

import { useMemo, useState } from "react";
import { GridIcon, SearchIcon, TagIcon } from "@/components/atoms/Icons";
import { LogModalList } from "@/components/molecules/LogModalList";
import type { LogEntry } from "@/lib/types";

export function LogFilterList({ logs }: { logs: LogEntry[] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(logs.flatMap((log) => log.tags))).sort()],
    [logs]
  );

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        !query ||
        [log.title, log.summary, ...log.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesTag = activeTag === "All" || log.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [activeTag, logs, search]);

  return (
    <section className="space-y-8" aria-labelledby="log-filter-title">
      <div className="animated-border panel-gradient space-y-4 rounded-md border border-clay/15 p-5 shadow-soft transition duration-300 hover:shadow-glow">
        <h2 className="inline-flex items-center gap-3 text-2xl font-bold tracking-normal text-ink" id="log-filter-title">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay/15 bg-clay/10 text-clay shadow-soft">
            <GridIcon className="h-5 w-5" />
          </span>
          Activity logs
        </h2>
        <label className="block max-w-xl space-y-2">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <SearchIcon className="h-4 w-4 text-clay" />
            Search logs
          </span>
          <input
            className="min-h-11 w-full rounded-md border border-clay/15 bg-white px-4 text-sm text-ink shadow-soft transition duration-300 placeholder:text-steel focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, summary, or tag"
            type="search"
            value={search}
          />
        </label>
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <TagIcon className="h-4 w-4 text-clay" />
            Filter by tag
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                aria-pressed={activeTag === tag}
                className={`inline-flex min-h-11 max-w-full items-center justify-center rounded-full px-4 py-2 text-center text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
                  activeTag === tag
                    ? "bg-clay text-white shadow-[0_12px_30px_rgba(47,109,246,0.2)]"
                    : "border border-clay/15 bg-white/90 text-navy hover:border-clay hover:bg-skywash/45 hover:text-clay"
                }`}
                key={tag}
                onClick={() => setActiveTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="text-sm font-semibold text-navy">
        Showing {filteredLogs.length} of {logs.length} logs.
      </p>

      <LogModalList logs={filteredLogs} />
    </section>
  );
}
