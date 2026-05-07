"use client";

import { useCallback, useMemo, useState } from "react";
import { ProjectGalleryModal } from "@/components/molecules/ProjectGalleryModal";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { getProjectGallery } from "@/lib/project-images";
import { useModalLifecycle } from "@/lib/useModalLifecycle";
import type { Project } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            className="motion-safe:animate-fade-up"
            key={`${project.title}-${project.completionDate}`}
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <ProjectCard
              galleryCount={getProjectGallery(project).length}
              onOpenGallery={() => openGallery(project)}
              onViewFull={() => openGallery(project)}
              project={project}
            />
          </div>
        ))}
      </div>

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
