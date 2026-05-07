import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/atoms/Badge";
import { Breadcrumbs } from "@/app/Breadcrumbs";
import { ImageGallery } from "@/app/ImageGallery";
import { formatDateRange } from "@/lib/format";
import { MarkdownContent } from "@/lib/markdown";
import { getProjectById, getProjectIds } from "@/lib/projects";
import { getProjectGallery } from "@/lib/project-images";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProjectIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  const gallery = getProjectGallery(project);

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/work/${project.id}`
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      publishedTime: project.completionDate,
      images: gallery.length ? [gallery[0].src] : undefined
    }
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  const gallery = getProjectGallery(project);
  const markdown = project.markdown ?? buildProjectMarkdown(project);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 motion-safe:animate-fade-up sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: project.title }]} />

      <header className="animated-border panel-gradient relative mb-8 space-y-5 overflow-hidden rounded-md border border-clay/15 p-4 shadow-soft sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-line-sweep bg-gradient-to-r from-transparent via-moss to-transparent" />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">{project.category}</Badge>
          <time className="text-sm font-medium text-steel" dateTime={project.startDate ?? project.completionDate}>
            {formatDateRange(project.startDate, project.completionDate)}
          </time>
        </div>
        <h1 className="break-words text-3xl font-black tracking-normal text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="panel-gradient rounded-md border border-clay/10 p-4 shadow-soft sm:p-6">
          <MarkdownContent source={markdown} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {project.liveUrl ? (
            <Link
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-moss px-4 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffdc5e]"
              href={project.liveUrl}
              target="_blank"
            >
              Open live project
            </Link>
          ) : null}
          {project.repositoryUrl ? (
            <Link
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-navy px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-clay"
              href={project.repositoryUrl}
              target="_blank"
            >
              Open repository
            </Link>
          ) : null}
          <div className="rounded-md border border-clay/15 bg-white/80 p-4 text-sm leading-6 text-slate-600 shadow-soft">
            <p className="font-bold text-ink">Gallery</p>
            <p className="mt-1">{gallery.length} project screenshots available.</p>
          </div>
        </aside>
      </div>

      <section className="mt-10 rounded-md border border-clay/10 bg-night p-4 shadow-soft sm:p-6">
        <ImageGallery images={gallery.map((image) => image.src)} />
      </section>
    </article>
  );
}

function buildProjectMarkdown(project: NonNullable<ReturnType<typeof getProjectById>>): string {
  const details = project.fullDetails?.length
    ? project.fullDetails
    : [project.description];

  return [
    "## Project Overview",
    project.description,
    "",
    "## Details",
    ...details.map((detail) => `- ${detail}`)
  ].join("\n");
}
