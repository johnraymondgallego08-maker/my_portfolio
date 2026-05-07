import projectsData from "@/data/projects.json";
import type { FilterOption, Project, ProjectGalleryImage } from "@/lib/types";

type RawProject = Record<string, unknown>;

function isRawProject(value: unknown): value is RawProject {
  return typeof value === "object" && value !== null;
}

export function getProjects(): Project[] {
  if (!Array.isArray(projectsData) || !projectsData.every(isRawProject)) {
    throw new Error("data/projects.json must contain an array of projects.");
  }

  return projectsData.map(normalizeProject).sort(
    (first, second) =>
      parseProjectDate(second.completionDate).getTime() -
      parseProjectDate(first.completionDate).getTime()
  );
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}

export function getProjectIds(): string[] {
  return getProjects().map((project) => project.id);
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

function normalizeProject(raw: RawProject): Project {
  const title = requireString(raw.title, "title");
  const description = requireString(raw.description, "description");
  const techStack = stringArray(raw.techStack ?? raw.tags);
  const gallery = normalizeGallery(raw.gallery ?? raw.images);
  const completionDate = optionalString(raw.completionDate) ?? "2026-01-01";
  const category =
    optionalString(raw.category) ?? inferCategory(techStack, title);

  return {
    id: optionalString(raw.id) ?? slugify(title),
    title,
    brief: optionalString(raw.brief),
    description,
    fullDetails: stringArray(raw.fullDetails),
    techStack,
    startDate: optionalString(raw.startDate),
    completionDate,
    category,
    featured: typeof raw.featured === "boolean" ? raw.featured : true,
    repositoryUrl:
      optionalString(raw.repositoryUrl) ?? validExternalUrl(raw.github),
    liveUrl: validExternalUrl(raw.link),
    image: optionalString(raw.image) ?? gallery[0]?.src,
    gallery,
    markdown: optionalString(raw.markdown) ?? optionalString(raw.content)
  };
}

function normalizeGallery(value: unknown): ProjectGalleryImage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index): ProjectGalleryImage | null => {
      if (typeof item === "string") {
        return {
          src: item,
          alt: `Project screenshot ${index + 1}`,
          caption: `Project screenshot ${index + 1}`
        };
      }

      if (!isRawProject(item) || typeof item.src !== "string") {
        return null;
      }

      return {
        src: item.src,
        alt: optionalString(item.alt) ?? `Project screenshot ${index + 1}`,
        group: optionalString(item.group),
        caption: optionalString(item.caption)
      };
    })
    .filter((image): image is ProjectGalleryImage => Boolean(image));
}

function inferCategory(techStack: string[], title: string): string {
  if (techStack.some((tech) => tech.toLowerCase().includes("research"))) {
    return "Research";
  }

  if (title.toLowerCase().includes("practice")) {
    return "Practice Project";
  }

  return "Real Project";
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`data/projects.json is missing ${field}.`);
  }

  return value;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function validExternalUrl(value: unknown): string | undefined {
  const url = optionalString(value);

  return url && url !== "#" ? url : undefined;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()))
    : [];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueOptions(values: string[]): FilterOption[] {
  return Array.from(new Set(values))
    .sort((first, second) => first.localeCompare(second))
    .map((value) => ({ label: value, value }));
}

function parseProjectDate(value: string): Date {
  const normalized = /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
  return new Date(`${normalized}T00:00:00`);
}
