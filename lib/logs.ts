import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { LogEntry, LogFrontmatter } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "content");

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
    body,
    readingMinutes: estimateReadingMinutes(body)
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
