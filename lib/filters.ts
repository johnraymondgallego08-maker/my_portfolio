import type { Project } from "@/lib/types";

export type ProjectFilter = {
  category: string;
  tech: string;
};

export const ALL_FILTER_VALUE = "all";

export function filterProjects(
  projects: Project[],
  { category, tech }: ProjectFilter
): Project[] {
  return projects.filter((project) => {
    const matchesCategory =
      category === ALL_FILTER_VALUE || project.category === category;
    const matchesTech =
      tech === ALL_FILTER_VALUE || project.techStack.includes(tech);

    return matchesCategory && matchesTech;
  });
}
