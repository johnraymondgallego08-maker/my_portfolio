import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/atoms/Badge";
import { formatDate } from "@/lib/format";
import { getLogBySlug, getLogSlugs } from "@/lib/logs";
import { MarkdownContent } from "@/lib/markdown";

type LogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getLogSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: LogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const log = await getLogBySlug(slug);

    return {
      title: log.title,
      description: log.summary,
      openGraph: {
        title: log.title,
        description: log.summary,
        type: "article",
        publishedTime: log.date
      }
    };
  } catch {
    return {
      title: "Log Not Found"
    };
  }
}

export default async function LogPage({ params }: LogPageProps) {
  const { slug } = await params;

  try {
    const log = await getLogBySlug(slug);

    return (
      <article className="mx-auto max-w-3xl px-4 py-12 motion-safe:animate-fade-up sm:px-6 lg:px-8">
        <Link className="group mb-8 inline-flex min-h-11 items-center rounded-full border border-clay/15 bg-white/90 px-4 text-sm font-semibold text-navy shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-clay hover:bg-skywash/45 hover:text-clay hover:shadow-glow" href="/logs">
          <span className="mr-2 transition duration-300 group-hover:-translate-x-1" aria-hidden="true">
            &lt;-
          </span>
          Back to logs
        </Link>
        <header className="animated-border panel-gradient relative overflow-hidden space-y-5 rounded-md border border-clay/15 p-6 shadow-soft transition duration-300 hover:shadow-glow">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-line-sweep bg-gradient-to-r from-transparent via-moss to-transparent" />
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-steel">
            <time dateTime={log.date}>{formatDate(log.date)}</time>
            <span className="text-moss" aria-hidden="true">/</span>
            <span>{log.readingMinutes} min read</span>
          </div>
          <h1 className="break-words text-3xl font-black tracking-normal text-ink sm:text-5xl">
            {log.title}
          </h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{log.summary}</p>
          <div className="flex flex-wrap gap-2" aria-label={`${log.title} tags`}>
            {log.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <div className="panel-gradient mt-8 rounded-md border border-clay/10 p-6 shadow-soft transition duration-300 hover:shadow-glow motion-safe:animate-scale-in">
          <MarkdownContent source={log.body} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
