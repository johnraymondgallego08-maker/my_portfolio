import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { LogEntry, LogFrontmatter } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "content");
const h4mBase = "/images/real project admin panel of attendance monitoring app";
const practiceBase = "/images/practiced node.js (web)";
const logImageMap: Record<string, { src: string; alt: string }[]> = {
  "hack-4-mapandan-week-01-foundation": [
    {
      src: `${h4mBase}/week 1 brainstorm.png`,
      alt: "Week 1 brainstorm flow for the H4M admin panel"
    },
    {
      src: `${h4mBase}/week 1 static dashboard 2.png`,
      alt: "Week 1 static dashboard layout"
    },
    {
      src: `${h4mBase}/week 1 back end (1).png`,
      alt: "Week 1 backend setup progress"
    }
  ],
  "hack-4-mapandan-week-02-core-features": [
    {
      src: `${h4mBase}/week 2 enhance log in page.png`,
      alt: "Week 2 login page enhancement"
    },
    {
      src: `${h4mBase}/week 2 added log and holiday widgets in dashboard.png`,
      alt: "Week 2 dashboard widgets for logs and holidays"
    },
    {
      src: `${h4mBase}/week 2 add employee feature enhancement.png`,
      alt: "Week 2 employee feature enhancement"
    },
    {
      src: `${h4mBase}/week 2 image recognition.png`,
      alt: "Week 2 image recognition progress"
    }
  ],
  "hack-4-mapandan-week-03-admin-workflows": [
    {
      src: `${h4mBase}/week 3 dashbopard enhaancement.png`,
      alt: "Week 3 dashboard enhancement"
    },
    {
      src: `${h4mBase}/week 3 attendance enhancement.png`,
      alt: "Week 3 attendance workflow enhancement"
    },
    {
      src: `${h4mBase}/week 3 manage user.png`,
      alt: "Week 3 manage user workflow"
    },
    {
      src: `${h4mBase}/week 3 pop up invoice.png`,
      alt: "Week 3 invoice pop-up workflow"
    }
  ],
  "hack-4-mapandan-week-04-polish-recognition": [
    {
      src: `${h4mBase}/week 4 ui improvements.png`,
      alt: "Week 4 UI improvements"
    },
    {
      src: `${h4mBase}/week 4 announcement and event enhancement.png`,
      alt: "Week 4 announcement and event enhancement"
    },
    {
      src: `${h4mBase}/week 4 attendance summary.png`,
      alt: "Week 4 attendance summary screen"
    },
    {
      src: `${h4mBase}/week 4 device recognition.png`,
      alt: "Week 4 device recognition improvement"
    }
  ],
  "hack-4-mapandan-week-05-deployment-finalization": [
    {
      src: `${h4mBase}/employee directory.png`,
      alt: "Final employee directory screen"
    },
    {
      src: `${h4mBase}/week 5 finalization.png`,
      alt: "Week 5 finalization review"
    },
    {
      src: `${h4mBase}/week 5 deployment in vercel.png`,
      alt: "Week 5 Vercel deployment"
    }
  ],
  "practice-web-week-01-node-ejs-foundation": [
    {
      src: `${practiceBase}/login.png`,
      alt: "Practice Web login screen"
    },
    {
      src: `${practiceBase}/dashboard.png`,
      alt: "Practice Web dashboard screen"
    },
    {
      src: `${practiceBase}/employee logs.png`,
      alt: "Practice Web employee logs screen"
    }
  ],
  "practice-web-week-02-dashboard-layout": [
    {
      src: `${practiceBase}/payroll.png`,
      alt: "Practice Web payroll screen"
    },
    {
      src: `${practiceBase}/profile.png`,
      alt: "Practice Web profile screen"
    },
    {
      src: `${practiceBase}/user management.png`,
      alt: "Practice Web user management screen"
    }
  ]
};

export async function getLogs(): Promise<LogEntry[]> {
  const files = await readdir(contentDirectory);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));
  const logs = await Promise.all(
    markdownFiles.map(async (file) => getLogBySlug(file.replace(/\.md$/, "")))
  );

  return logs.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );
}

export async function getLogBySlug(slug: string): Promise<LogEntry> {
  const filePath = path.join(contentDirectory, `${slug}.md`);
  const source = await readFile(filePath, "utf8");
  const { frontmatter, body } = parseMarkdownFile(source);

  return {
    slug,
    ...frontmatter,
    body: appendLogImages(slug, body),
    readingMinutes: estimateReadingMinutes(appendLogImages(slug, body))
  };
}

export async function getLogSlugs(): Promise<string[]> {
  const files = await readdir(contentDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function parseMarkdownFile(source: string): {
  frontmatter: LogFrontmatter;
  body: string;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Markdown logs must include frontmatter.");
  }

  const frontmatter = parseFrontmatter(match[1]);

  return {
    frontmatter,
    body: match[2].trim()
  };
}

function parseFrontmatter(source: string): LogFrontmatter {
  const values = Object.fromEntries(
    source.split(/\r?\n/).map((line) => {
      const separatorIndex = line.indexOf(":");
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      return [key, value];
    })
  );

  const tags = String(values.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const frontmatter = {
    title: values.title,
    date: values.date,
    summary: values.summary,
    tags
  };

  if (!isLogFrontmatter(frontmatter)) {
    throw new Error("A Markdown log is missing title, date, summary, or tags.");
  }

  return frontmatter;
}

function isLogFrontmatter(value: unknown): value is LogFrontmatter {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const frontmatter = value as Record<string, unknown>;

  return (
    typeof frontmatter.title === "string" &&
    typeof frontmatter.date === "string" &&
    typeof frontmatter.summary === "string" &&
    Array.isArray(frontmatter.tags) &&
    frontmatter.tags.every((tag) => typeof tag === "string")
  );
}

function estimateReadingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function appendLogImages(slug: string, body: string): string {
  const images = logImageMap[slug];

  if (!images?.length || /!\[.*\]\(.+\)/.test(body)) {
    return body;
  }

  const gallerySection = [
    "## Screenshots",
    ...images.flatMap((image) => [`![${image.alt}](${image.src})`, ""])
  ]
    .join("\n")
    .trim();

  return `${body.trim()}\n\n${gallerySection}`;
}
