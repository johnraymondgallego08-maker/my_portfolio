import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { formatDate } from "@/lib/format";
import { getProjectImage } from "@/lib/project-images";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  galleryCount,
  onOpenGallery,
  onViewFull
}: {
  project: Project;
  galleryCount?: number;
  onOpenGallery?: () => void;
  onViewFull?: () => void;
}) {
  const image = getProjectImage(project);
  const brief = project.brief ?? project.description;
  const imageContent = (
    <Image
      alt=""
      className="object-contain transition duration-700 group-hover:scale-[1.03]"
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      src={image}
    />
  );
  const resolvedGalleryCount = galleryCount ?? project.gallery?.length ?? 1;

  return (
    <article className="interactive-card panel-gradient group flex h-full flex-col overflow-hidden rounded-md border border-clay/15 shadow-soft transition duration-500 hover:-translate-y-2 hover:border-clay/35 hover:shadow-lift">
      {onOpenGallery ? (
        <button
          aria-label={`Open ${project.title} gallery`}
          className="group relative aspect-[16/10] w-full overflow-hidden bg-white text-left"
          onClick={onOpenGallery}
          type="button"
        >
          {imageContent}
          <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night/70 to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-night/80 px-3 py-1.5 text-xs font-bold text-white shadow-soft backdrop-blur transition duration-300 group-hover:translate-x-1">
            {resolvedGalleryCount === 1
              ? "View image"
              : `View ${resolvedGalleryCount} images`}
          </span>
        </button>
      ) : (
        <div className="relative aspect-[16/10] bg-white">{imageContent}</div>
      )}
      <div className="flex flex-1 flex-col gap-5 border-t border-clay/10 p-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">{project.category}</Badge>
            <time className="text-sm font-medium text-steel" dateTime={project.completionDate}>
              {formatDate(project.completionDate)}
            </time>
          </div>
          <h3 className="break-words text-xl font-bold tracking-normal text-ink transition duration-300 group-hover:text-navy">{project.title}</h3>
          <p className="text-sm leading-6 text-slate-600">{brief}</p>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {onViewFull ? (
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-clay"
                onClick={onViewFull}
                type="button"
              >
                View full
              </button>
            ) : null}
            {project.repositoryUrl ? (
              <details className="w-full rounded-md border border-clay/15 bg-gradient-to-br from-skywash/60 to-white/80 px-4 py-2 text-sm text-slate-700">
                <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-navy transition hover:text-clay">
                  Repository
                </summary>
                <p className="mt-2 break-all text-xs leading-5 text-steel">
                  {project.repositoryUrl}
                </p>
              </details>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
