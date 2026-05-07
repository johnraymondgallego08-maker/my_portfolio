"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { GridIcon, LayersIcon, SearchIcon, TagIcon } from "@/components/atoms/Icons";
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
  const [search, setSearch] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeGallery = useCallback(() => setActiveProject(null), []);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return filterProjects(projects, { category, tech }).filter((project) => {
      if (!query) {
        return true;
      }

      return [
        project.title,
        project.description,
        project.category,
        ...project.techStack
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [category, projects, search, tech]);

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
        <h2 className="inline-flex items-center gap-3 text-2xl font-bold tracking-normal text-ink" id="work-gallery-title">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay/15 bg-clay/10 text-clay shadow-soft">
            <GridIcon className="h-5 w-5" />
          </span>
          Activity Gallery
        </h2>
        <label className="block max-w-xl space-y-2">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <SearchIcon className="h-4 w-4 text-clay" />
            Search projects
          </span>
          <input
            className="min-h-11 w-full rounded-md border border-clay/15 bg-white px-4 text-sm text-ink shadow-soft transition duration-300 placeholder:text-steel focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, description, category, or tech stack"
            type="search"
            value={search}
          />
        </label>
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
  const Icon = label === "Category" ? TagIcon : LayersIcon;

  return (
    <fieldset className="space-y-3">
      <legend className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
        <Icon className="h-4 w-4 text-clay" />
        {label}
      </legend>
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
