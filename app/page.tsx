import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Badge } from "@/components/atoms/Badge";
import {
  ArrowRightIcon,
  CloudLaunchIcon,
  CodeIcon,
  DatabaseIcon,
  LayersIcon,
  NotebookIcon,
  RouteIcon,
  SearchIcon,
  SparkIcon,
  UserBadgeIcon,
  WindIcon
} from "@/components/atoms/Icons";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Timeline } from "@/components/sections/Timeline";
import { getFeaturedProjects, getProjects } from "@/lib/projects";

const heroFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap"
});

const highlightCards = [
  { label: "Role", value: "4th Year Intern", Icon: UserBadgeIcon },
  { label: "Focus", value: "Systems and UX flow", Icon: SparkIcon },
  { label: "Stack", value: "Node.js, EJS, Tailwind, Vercel", Icon: LayersIcon }
];

const movingTech = [
  { label: "Next.js", Icon: CodeIcon },
  { label: "TypeScript", Icon: CodeIcon },
  { label: "Tailwind CSS", Icon: WindIcon },
  { label: "Markdown Logs", Icon: NotebookIcon },
  { label: "Local JSON", Icon: DatabaseIcon },
  { label: "Static Routes", Icon: RouteIcon },
  { label: "SEO Metadata", Icon: SearchIcon },
  { label: "Vercel", Icon: CloudLaunchIcon }
];

export default function HomePage() {
  const projects = getProjects();
  const featuredProjects = getFeaturedProjects();

  return (
    <div>
      <section className="hero-gradient relative overflow-hidden text-orange-200">
        <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-full animate-scan-line bg-gradient-to-b from-transparent via-moss/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-moss/70 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1.08fr)_minmax(16rem,0.92fr)] md:items-center lg:px-8 lg:py-20">
          <div className="min-w-0 space-y-7 motion-safe:animate-fade-up">
            <span className="inline-flex min-h-8 items-center rounded-full border border-moss/40 bg-moss/20 px-3 py-1 text-sm font-medium text-white shadow-[0_0_34px_rgba(255,208,47,0.12)]">
              Makerspace InnovHub Internship Portfolio
            </span>
            <div className="space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-300">
                UEP INTERN / 2026
              </p>
              <h1 className={`${heroFont.className} max-w-3xl text-2xl font-bold leading-tight tracking-[0.035em] text-orange-300 sm:text-4xl lg:text-5xl`}>
                <span className="block">
                  John Raymond Gallego builds polished, practical systems.
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-orange-200 sm:text-lg sm:leading-8">
                This portfolio brings together my internship work, practice builds, and a full admin platform for attendance, workforce records, and payroll.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlightCards.map(({ label, value, Icon }) => (
                <div className="animated-border rounded-md border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.04] p-4 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14]" key={label}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-orange-100 shadow-[0_10px_22px_rgba(10,18,38,0.22)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-orange-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="group inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-moss px-5 py-2 text-sm font-semibold text-ink shadow-[0_16px_40px_rgba(255,208,47,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffdc5e] hover:shadow-[0_20px_52px_rgba(255,208,47,0.35)]" href="/work">
                <LayersIcon className="mr-2 h-4 w-4" />
                View Work
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link className="group inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-orange-200 transition duration-300 hover:-translate-y-0.5 hover:border-moss/70 hover:bg-white/15" href="/logs">
                <NotebookIcon className="mr-2 h-4 w-4" />
                Read Build Logs
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="marquee-mask w-full max-w-full overflow-hidden border-y border-white/10 py-3">
              <div className="flex w-max animate-ticker gap-3 hover:[animation-play-state:paused]">
                {[...movingTech, ...movingTech].map(({ label, Icon }, index) => (
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-100 shadow-[0_12px_30px_rgba(10,18,38,0.18)]"
                    key={`${label}-${index}`}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-moss">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex min-w-0 justify-center md:justify-end">
            <div className="relative w-full max-w-[320px] motion-safe:animate-fade-up motion-safe:stagger-2">
              <div className="absolute left-0 top-8 h-20 w-20 animate-pulse-border border border-moss/45 bg-moss/90 sm:-left-5 sm:h-24 sm:w-24" />
              <div className="absolute bottom-16 right-0 h-20 w-20 animate-float-card border border-clay/50 bg-clay/35 backdrop-blur-sm sm:-right-5 sm:h-24 sm:w-24" />
              <div className="interactive-card relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-md border border-white/15 bg-skywash shadow-glow transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-lift sm:max-w-[260px] md:ml-auto md:mr-0">
                <Image
                  alt="Portrait of Johnraymond Gallego, owner of this portfolio."
                  className="object-cover object-top transition duration-700 hover:scale-105"
                  fill
                  priority
                  sizes="(min-width: 768px) 250px, 250px"
                  src="/images/image.png"
                />
              </div>
              <div className="animated-border mx-auto mt-5 max-w-[260px] rounded-md border border-white/10 bg-gradient-to-br from-white/[0.14] to-white/[0.05] p-4 text-sm leading-6 text-orange-200 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 md:ml-auto md:mr-0">
                Internship work focused on polished interfaces, structured workflows, and clear day-to-day usability.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-14 sm:px-6 lg:px-8">
        <div className="motion-safe:animate-fade-up">
          <Badge variant="accent">Featured</Badge>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-ink sm:text-3xl">
            Selected project work
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            A focused showcase of builds that connect clean interfaces with real internship workflows.
          </p>
        </div>
        <FeaturedProjects projects={featuredProjects} />
      </section>

      <section className="soft-section-gradient border-t border-clay/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Timeline projects={projects} />
        </div>
      </section>
    </div>
  );
}
