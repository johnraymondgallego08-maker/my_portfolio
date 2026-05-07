import type { Project, ProjectGalleryImage } from "@/lib/types";

const categoryImages: Record<string, string> = {
  "SEO Audit": "/images/audit-board.svg",
  Frontend: "/images/frontend-system.svg",
  Research: "/images/research-notes.svg",
  Documentation: "/images/research-notes.svg",
  "Technical Audit": "/images/audit-board.svg"
};

const defaultProjectImage = "/images/frontend-system.svg";

export function getProjectImage(project: Project): string {
  return project.image ?? categoryImages[project.category] ?? defaultProjectImage;
}

export function getProjectGallery(project: Project): ProjectGalleryImage[] {
  if (project.gallery?.length) {
    return project.gallery;
  }

  return [
    {
      alt: `${project.title} preview`,
      caption: project.description,
      src: getProjectImage(project)
    }
  ];
}
