import type { Project, ProjectGalleryImage } from "@/lib/types";

const categoryImages: Record<string, string> = {
  "SEO Audit": "/images/audit-board.svg",
  Frontend: "/images/frontend-system.svg",
  Research: "/images/research-notes.svg",
  Documentation: "/images/research-notes.svg",
  "Technical Audit": "/images/audit-board.svg"
};

const defaultProjectImage = "/images/frontend-system.svg";
const h4mBase = "/images/real project admin panel of attendance monitoring app";
const h4mPreviewImage = `${h4mBase}/employee directory.png`;
const h4mGalleryFiles = [
  "project profile.png",
  "employee directory.png",
  "week 1 brainstorm.png",
  "week 1 brainstorm 2.png",
  "week 1  static dashboard.png",
  "week 1 static dashboard 2.png",
  "week 1 static page sample.png",
  "weel 1 static page lay out.png",
  "week 1 back end (1).png",
  "week 1 back end (2).png",
  "week 1 back end (3).png",
  "week 1 back end (4).png",
  "week 1 back end (5).png",
  "week 1 back end (6).png",
  "week 2 enhance log in page.png",
  "week 2 added log and holiday widgets in dashboard.png",
  "week 2 add employee feature enhancement.png",
  "week 2 announcement and event feature.png",
  "week 2 image recognition.png",
  "week 2 leave page enhancement.png",
  "week 2 monitor enhancement.png",
  "week 2 overtime page enhancement.png",
  "week 2 payroll enhancement.png",
  "week 3 dashbopard enhaancement.png",
  "week 3 attendance enhancement.png",
  "week 3 manage user.png",
  "week 3 payroll enhancement.png",
  "week 3 pop up invoice.png",
  "week 3 profile enhancement.png",
  "week 4 ui improvements.png",
  "week 4 announcement and event enhancement.png",
  "week 4 attendance summary.png",
  "week 4 device recognition.png",
  "week 4 invoice enhancement.png",
  "week 5 deployment in vercel.png",
  "week 5 finalization.png"
];

export function getProjectImage(project: Project): string {
  if (project.id === "h4m-workforce") {
    return h4mPreviewImage;
  }

  return project.image ?? categoryImages[project.category] ?? defaultProjectImage;
}

export function getProjectGallery(project: Project): ProjectGalleryImage[] {
  if (project.id === "h4m-workforce") {
    return h4mGalleryFiles.map((file) => ({
      src: `${h4mBase}/${file}`,
      alt: `${project.title}: ${formatH4mLabel(file)}`,
      group: inferH4mGroup(file),
      caption: formatH4mLabel(file)
    }));
  }

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

function inferH4mGroup(file: string): string {
  const match = file.match(/week\s+(\d)/i);

  if (match) {
    return `Week ${match[1]}`;
  }

  return "Project Overview";
}

function formatH4mLabel(file: string): string {
  return file
    .replace(/\.png$/i, "")
    .replace(/\bweel\b/i, "Week")
    .replace(/\bdashbopard\b/i, "dashboard")
    .replace(/\benhaancement\b/i, "enhancement")
    .replace(/\blog in\b/i, "login")
    .replace(/\bui\b/g, "UI")
    .replace(/\bvercel\b/g, "Vercel")
    .replace(/\bpop up\b/i, "pop-up")
    .replace(/\blay out\b/i, "layout")
    .replace(/\s+/g, " ")
    .trim();
}
