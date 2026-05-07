import projectsData from "@/data/projects.json";
import type { FilterOption, Project } from "@/lib/types";

function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const project = value as Record<string, unknown>;

  return (
    typeof project.title === "string" &&
    (project.brief === undefined || typeof project.brief === "string") &&
    typeof project.description === "string" &&
    (project.fullDetails === undefined ||
      (Array.isArray(project.fullDetails) &&
        project.fullDetails.every((detail) => typeof detail === "string"))) &&
    Array.isArray(project.techStack) &&
    project.techStack.every((tech) => typeof tech === "string") &&
    typeof project.completionDate === "string" &&
    typeof project.category === "string" &&
    (project.featured === undefined || typeof project.featured === "boolean") &&
    (project.repositoryUrl === undefined ||
      typeof project.repositoryUrl === "string") &&
    (project.image === undefined || typeof project.image === "string") &&
    (project.gallery === undefined ||
      (Array.isArray(project.gallery) &&
        project.gallery.every((image) => {
          if (typeof image !== "object" || image === null) {
            return false;
          }

          const galleryImage = image as Record<string, unknown>;

          return (
            typeof galleryImage.src === "string" &&
            typeof galleryImage.alt === "string" &&
            (galleryImage.group === undefined ||
              typeof galleryImage.group === "string") &&
            (galleryImage.caption === undefined ||
              typeof galleryImage.caption === "string")
          );
        })))
  );
}

export function getProjects(): Project[] {
  if (!Array.isArray(projectsData) || !projectsData.every(isProject)) {
    throw new Error("data/projects.json is missing required project fields.");
  }

  return [...projectsData].sort(
    (first, second) =>
      new Date(second.completionDate).getTime() -
      new Date(first.completionDate).getTime()
  );
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured).slice(0, 3);
}

export function getProjectCategories(projects: Project[]): FilterOption[] {
  return uniqueOptions(projects.map((project) => project.category));
}

export function getProjectTechOptions(projects: Project[]): FilterOption[] {
  return uniqueOptions(projects.flatMap((project) => project.techStack));
}

function uniqueOptions(values: string[]): FilterOption[] {
  return Array.from(new Set(values))
    .sort((first, second) => first.localeCompare(second))
    .map((value) => ({ label: value, value }));
}
