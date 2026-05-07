"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ProjectGalleryModal } from "@/components/molecules/ProjectGalleryModal";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ALL_FILTER_VALUE, filterProjects } from "@/lib/filters";
import { getProjectGallery } from "@/lib/project-images";
import { useModalLifecycle } from "@/lib/useModalLifecycle";
import type { FilterOption, Project } from "@/lib/types";

export function WorkGallery({
  projects,
  categories,
  techOptions
}: {
  projects: Project[];
  categories: FilterOption[];
  techOptions: FilterOption[];
}) {
  const [category, setCategory] = useState(ALL_FILTER_VALUE);
  const [tech, setTech] = useState(ALL_FILTER_VALUE);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeGallery = useCallback(() => setActiveProject(null), []);

  const filteredProjects = useMemo(
    () => filterProjects(projects, { category, tech }),
    [category, projects, tech]
  );

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
    <section aria-labelledby="work-gallery-title" className="space-y-8">
      <div className="animated-border panel-gradient space-y-4 rounded-md border border-clay/15 p-5 shadow-soft transition duration-300 hover:shadow-glow">
        <h2 className="text-2xl font-bold tracking-normal text-ink" id="work-gallery-title">
          Activity Gallery
        </h2>
        <FilterGroup
          label="Category"
          options={categories}
          selected={category}
          onSelect={setCategory}
        />
        <FilterGroup
          label="Tech stack"
          options={techOptions}
          selected={tech}
          onSelect={setTech}
        />
      </div>

      <p aria-live="polite" className="text-sm font-semibold text-navy">
        Showing {filteredProjects.length} of {projects.length} activities.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <div
            className="motion-safe:animate-scale-in"
            key={`${project.title}-${project.completionDate}`}
            style={{ animationDelay: `${index * 85}ms` }}
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
    </section>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect
}: {
  label: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-navy">{label}</legend>
      <div className="flex flex-wrap gap-2">
        <Button
          aria-pressed={selected === ALL_FILTER_VALUE}
          onClick={() => onSelect(ALL_FILTER_VALUE)}
          variant={selected === ALL_FILTER_VALUE ? "primary" : "secondary"}
        >
          All
        </Button>
        {options.map((option) => (
          <Button
            aria-pressed={selected === option.value}
            key={option.value}
            onClick={() => onSelect(option.value)}
            variant={selected === option.value ? "primary" : "secondary"}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}
