import type { Project } from "@/lib/types";

export type ProjectFilter = {
  category: string;
  tech: string;
  time: string;
};

export const ALL_FILTER_VALUE = "all";

export function filterProjects(
  projects: Project[],
  { category, tech, time }: ProjectFilter
): Project[] {
  const selectedCategory = category.toLowerCase();
  const selectedTech = tech.toLowerCase();
  const selectedTime = time.toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === ALL_FILTER_VALUE ||
      project.category.toLowerCase() === selectedCategory;
    const matchesTech =
      selectedTech === ALL_FILTER_VALUE ||
      project.techStack.some((item) => item.toLowerCase() === selectedTech);
    const matchesTime =
      selectedTime === ALL_FILTER_VALUE ||
      project.completionDate.toLowerCase().startsWith(selectedTime);

    return matchesCategory && matchesTech && matchesTime;
  });
}
