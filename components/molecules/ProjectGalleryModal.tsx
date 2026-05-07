"use client";

import Image from "next/image";
import { ModalShell } from "@/components/molecules/ModalShell";
import type { Project, ProjectGalleryImage } from "@/lib/types";

export function ProjectGalleryModal({
  project,
  images,
  activeImageIndex,
  onSelectImage,
  onClose
}: {
  project: Project;
  images: ProjectGalleryImage[];
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
  onClose: () => void;
}) {
  const currentImage = images[activeImageIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;
  const thumbnailGroups = getGalleryGroups(images);
  const details = project.fullDetails?.length
    ? project.fullDetails
    : [project.description];

  const showPrevious = () => {
    onSelectImage((activeImageIndex - 1 + images.length) % images.length);
  };

  const showNext = () => {
    onSelectImage((activeImageIndex + 1) % images.length);
  };

  return (
    <ModalShell labelledBy="gallery-title" maxWidth="max-w-7xl" onClose={onClose}>
      <header className="flex shrink-0 items-start justify-between gap-3 border-b border-clay/15 bg-night px-3 py-3 text-orange-200 sm:gap-4 sm:px-5">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            Full project
          </p>
          <h3 className="break-words text-base font-bold tracking-normal text-orange-300 sm:text-lg" id="gallery-title">
            {project.title}
          </h3>
        </div>
        <button
          aria-label="Close gallery"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/15 text-lg font-bold text-orange-200 transition hover:border-moss hover:text-orange-100"
          onClick={onClose}
          type="button"
        >
          X
        </button>
      </header>

      <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-3 sm:gap-5 sm:p-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:overflow-hidden">
        <div className="flex min-h-0 flex-col gap-3">
          <div className="relative aspect-[4/3] max-h-[36dvh] shrink-0 overflow-hidden rounded-lg border border-clay/10 bg-white shadow-soft sm:aspect-[16/10] sm:max-h-[48dvh]">
            <Image
              alt={currentImage.alt}
              className="object-contain transition duration-500"
              fill
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              src={currentImage.src}
            />
          </div>
          {hasMultipleImages ? (
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
              <button
                className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-md border border-clay/15 px-3 text-sm font-semibold text-navy transition duration-300 hover:-translate-x-1 hover:border-clay hover:bg-skywash/45 hover:text-clay sm:px-4"
                onClick={showPrevious}
                type="button"
              >
                Prev
              </button>
              <p className="text-sm font-semibold text-navy">
                {activeImageIndex + 1} / {images.length}
              </p>
              <button
                className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-md border border-clay/15 px-3 text-sm font-semibold text-navy transition duration-300 hover:translate-x-1 hover:border-clay hover:bg-skywash/45 hover:text-clay sm:px-4"
                onClick={showNext}
                type="button"
              >
                Next
              </button>
            </div>
          ) : null}

          <div className="shrink-0 space-y-3 rounded-lg border border-clay/10 bg-gradient-to-br from-skywash/45 to-white/80 p-3">
            {currentImage.group ? (
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">
                {currentImage.group}
              </p>
            ) : null}
            {currentImage.caption ? (
              <p className="mt-1 text-sm leading-6 text-slate-600">{currentImage.caption}</p>
            ) : null}
          </div>

          <div className="min-h-[9rem] flex-1 overflow-y-auto rounded-lg border border-clay/10 bg-white/65 p-3 pr-2 lg:min-h-0">
            {thumbnailGroups.map((group) => (
              <div className="space-y-2 pb-4 last:pb-0" key={group.label}>
                {group.label ? (
                  <p className="sticky top-0 z-10 bg-white/95 py-1 text-xs font-bold uppercase tracking-[0.16em] text-clay backdrop-blur">
                    {group.label}
                  </p>
                ) : null}
                <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {group.images.map(({ image, index }) => (
                    <button
                      aria-label={`Show image ${index + 1}`}
                      aria-pressed={activeImageIndex === index}
                      className={`relative aspect-[16/10] overflow-hidden rounded-md border bg-white transition ${
                        activeImageIndex === index
                          ? "border-moss ring-2 ring-moss/30"
                          : "border-clay/15 hover:-translate-y-0.5 hover:border-moss"
                      }`}
                      key={`${image.src}-${index}`}
                      onClick={() => onSelectImage(index)}
                      type="button"
                    >
                      <Image
                        alt=""
                        className="object-contain"
                        fill
                        sizes="192px"
                        src={image.src}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

          <aside className="min-w-0 space-y-4 overflow-y-auto rounded-lg border border-clay/15 bg-gradient-to-br from-white/95 to-skywash/45 p-4 shadow-soft lg:max-h-[calc(96dvh-6.5rem)]">
          <div className="space-y-3">
            <p className="text-sm leading-6 text-slate-700">{project.description}</p>
            <ul className="space-y-2">
              {details.map((detail) => (
                <li className="flex gap-2 text-sm leading-6 text-slate-600" key={detail}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid gap-3 rounded-lg border border-clay/15 bg-gradient-to-br from-skywash/65 to-white/80 p-4 text-sm">
            <div>
              <dt className="font-bold text-ink">Category</dt>
              <dd className="mt-1 text-slate-600">{project.category}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink">Tech Stack</dt>
              <dd className="mt-1 text-slate-600">{project.techStack.join(", ")}</dd>
            </div>
            {project.repositoryUrl ? (
              <div>
                <dt className="font-bold text-ink">Repository</dt>
                <dd className="mt-2">
                  <p className="break-all rounded-md border border-clay/15 bg-white p-3 text-xs leading-5 text-slate-600">
                    {project.repositoryUrl}
                  </p>
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>
    </ModalShell>
  );
}

function getGalleryGroups(images: ProjectGalleryImage[]) {
  return images.reduce<
    { label: string; images: { image: ProjectGalleryImage; index: number }[] }[]
  >((groups, image, index) => {
    const label = image.group ?? "";
    const existingGroup = groups.find((group) => group.label === label);

    if (existingGroup) {
      existingGroup.images.push({ image, index });
      return groups;
    }

    groups.push({ label, images: [{ image, index }] });
    return groups;
  }, []);
}
