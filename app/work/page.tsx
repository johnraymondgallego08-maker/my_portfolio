import type { Metadata } from "next";
import { LayersIcon } from "@/components/atoms/Icons";
import { WorkGallery } from "@/components/molecules/WorkGallery";
import {
  getProjectCategories,
  getProjects,
  getProjectTechOptions
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Search and filter frontend, backend, research, attendance, and payroll projects by category or tech stack."
};

export default function WorkPage() {
  const projects = getProjects();
  const categories = getProjectCategories(projects);
  const techOptions = getProjectTechOptions(projects);

  return (
    <div>
      <header className="hero-gradient relative overflow-hidden text-orange-200">
        <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-28 w-full animate-scan-line bg-gradient-to-b from-transparent via-moss/20 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 motion-safe:animate-fade-up">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              <LayersIcon className="h-4 w-4" />
              Project Work
            </p>
            <h1 className="text-3xl font-black tracking-normal text-orange-300 sm:text-5xl">
              Frontend, backend, attendance, and payroll systems.
            </h1>
            <p className="text-base leading-7 text-orange-200 sm:text-lg sm:leading-8">
              Search by title or description, then filter by category and tech stack.
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-12 motion-safe:animate-fade-up sm:px-6 lg:px-8">
        <WorkGallery
          categories={categories}
          projects={projects}
          techOptions={techOptions}
        />
      </div>
    </div>
  );
}
