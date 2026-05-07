export interface Project {
  id: string;
  title: string;
  brief?: string;
  description: string;
  fullDetails?: string[];
  techStack: string[];
  startDate?: string;
  completionDate: string;
  category: string;
  featured?: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
  image?: string;
  gallery?: ProjectGalleryImage[];
  markdown?: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  group?: string;
  caption?: string;
}

export interface LogFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface LogEntry extends LogFrontmatter {
  slug: string;
  body: string;
  readingMinutes: number;
}

export interface FilterOption {
  label: string;
  value: string;
}
