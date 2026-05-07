"use client";

import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { ProjectGalleryModal } from "@/components/molecules/ProjectGalleryModal";
import { formatDate } from "@/lib/format";
import { getProjectGallery } from "@/lib/project-images";
import { useModalLifecycle } from "@/lib/useModalLifecycle";
import type { Project } from "@/lib/types";

export function Timeline({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeGallery = useCallback(() => setActiveProject(null), []);

  const activeGallery = useMemo(
    () => (activeProject ? getProjectGallery(activeProject) : []),
    [activeProject]
  );

  useModalLifecycle(Boolean(activeProject), closeGallery);

  const openGallery = (project: Project) => {
    setActiveImageIndex(0);
    setActiveProject(project);
  };

  return (
    <>
      <section aria-labelledby="timeline-title" className="space-y-6">
        <div>
          <Badge variant="accent">Project Timeline</Badge>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink" id="timeline-title">
            Build progress and project milestones
          </h2>
        </div>
        <ol className="relative space-y-4 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-clay/20 sm:before:left-[10.85rem]">
          {projects.map((project, index) => (
            <li
              className="motion-safe:animate-fade-up"
              key={`${project.title}-${project.completionDate}`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <button
                aria-label={`Open ${project.title} project details`}
                className="animated-border panel-gradient group relative grid w-full gap-3 rounded-md border border-clay/15 p-5 pl-10 text-left shadow-soft transition duration-500 hover:-translate-y-1 hover:border-clay/35 hover:shadow-glow sm:grid-cols-[10rem_1fr] sm:pl-5"
                onClick={() => openGallery(project)}
                type="button"
              >
                <span className="absolute left-[0.78rem] top-6 h-3 w-3 rounded-full border-2 border-white bg-moss shadow-[0_0_0_5px_rgba(47,109,246,0.14)] transition duration-300 group-hover:scale-125 sm:left-[10.52rem]" />
                <time className="text-sm font-semibold text-clay" dateTime={project.completionDate}>
                  {formatDate(project.completionDate)}
                </time>
                <div>
                  <h3 className="break-words font-bold text-ink transition duration-300 group-hover:text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{project.description}</p>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {activeProject ? (
        <ProjectGalleryModal
          activeImageIndex={activeImageIndex}
          images={activeGallery}
          onClose={closeGallery}
          onSelectImage={setActiveImageIndex}
          project={activeProject}
        />
      ) : null}
    </>
  );
}
