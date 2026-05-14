"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  EmailIcon,
  FacebookIcon,
  GraduationCapIcon,
  PhoneIcon,
  SparkIcon,
  UserBadgeIcon,
  XIcon
} from "@/components/atoms/Icons";

const profileCards = [
  {
    label: "School",
    value: "University of Eastern Pangasinan",
    Icon: GraduationCapIcon
  },
  {
    label: "Current Role",
    value: "OJT Intern",
    Icon: BriefcaseIcon
  },
  {
    label: "Workplace",
    value: "Makerspace InnovHub",
    Icon: BuildingIcon
  }
];

const contactItems = [
  {
    label: "Phone",
    value: "09064587156",
    href: "tel:09064587156",
    Icon: PhoneIcon
  },
  {
    label: "Email",
    value: "johnraymondgallego08@gmail.com",
    href: "mailto:johnraymondgallego08@gmail.com",
    Icon: EmailIcon
  },
  {
    label: "Facebook",
    value: "john.raymond.gallego",
    href: "https://web.facebook.com/john.raymond.gallego",
    Icon: FacebookIcon
  }
];

export function AboutContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="hero-gradient relative overflow-hidden text-orange-200">
        <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-28 w-full animate-scan-line bg-gradient-to-b from-transparent via-moss/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-moss/70 to-transparent" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)] md:items-center lg:px-8 lg:py-20">
          <div className="min-w-0 space-y-7 motion-safe:animate-fade-up">
            <span className="inline-flex min-h-8 items-center rounded-full border border-moss/40 bg-moss/20 px-3 py-1 text-sm font-medium text-white shadow-[0_0_34px_rgba(255,208,47,0.12)]">
              About John Raymond Gallego
            </span>

            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-moss">
                <UserBadgeIcon className="h-4 w-4" />
                Student Intern
              </p>
              <h1 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Learning by building practical, polished systems.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                I am a student from the University of Eastern Pangasinan. I am currently completing my on-the-job training and working at Makerspace InnovHub as an intern.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {profileCards.map(({ label, value, Icon }) => (
                <div
                  className="animated-border rounded-md border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.04] p-4 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14]"
                  key={label}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-orange-100 shadow-[0_10px_22px_rgba(10,18,38,0.22)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-moss">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="group inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-moss px-5 py-2 text-sm font-semibold text-ink shadow-[0_16px_40px_rgba(255,208,47,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffdc5e] hover:shadow-[0_20px_52px_rgba(255,208,47,0.35)]"
              onClick={() => setIsContactOpen(true)}
              type="button"
            >
              <PhoneIcon className="mr-2 h-4 w-4" />
              Contact Me
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="relative flex min-w-0 justify-center md:justify-end">
            <div className="relative w-full max-w-[320px] motion-safe:animate-fade-up motion-safe:stagger-2">
              <div className="absolute left-0 top-8 h-20 w-20 animate-pulse-border border border-moss/45 bg-moss/90 sm:-left-5 sm:h-24 sm:w-24" />
              <div className="absolute bottom-16 right-0 h-20 w-20 animate-float-card border border-clay/50 bg-clay/35 backdrop-blur-sm sm:-right-5 sm:h-24 sm:w-24" />
              <div className="interactive-card relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-md border border-white/15 bg-skywash shadow-glow transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-lift sm:max-w-[260px] md:ml-auto md:mr-0">
                <Image
                  alt="Portrait of John Raymond Gallego."
                  className="object-cover object-top transition duration-700 hover:scale-105"
                  fill
                  priority
                  sizes="(min-width: 768px) 250px, 250px"
                  src="/images/image.png"
                />
              </div>
              <div className="animated-border mx-auto mt-5 max-w-[260px] rounded-md border border-white/10 bg-gradient-to-br from-white/[0.14] to-white/[0.05] p-4 text-sm leading-6 text-slate-100 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 md:ml-auto md:mr-0">
                Focused on learning, improving, and creating useful digital experiences during my internship.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="motion-safe:animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-clay/15 bg-white/70 px-3 py-1 text-sm font-bold uppercase tracking-[0.16em] text-navy shadow-soft">
              <SparkIcon className="h-4 w-4" />
              My Journey
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-normal text-ink sm:text-3xl">
              A student growing through real workplace experience.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-slate-600 motion-safe:animate-fade-up motion-safe:stagger-1 sm:text-base">
            <p>
              As a student from the University of Eastern Pangasinan, I am using my OJT experience to strengthen my skills, understand professional workflows, and contribute to real projects.
            </p>
            <p>
              At Makerspace InnovHub, I am learning how to work with practical systems, clearer user interfaces, and organized development processes that support daily tasks.
            </p>
          </div>
        </div>
      </section>

      {isContactOpen && (
        <div
          aria-labelledby="contact-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4 backdrop-blur-sm"
          onClick={() => setIsContactOpen(false)}
          role="dialog"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-md border border-white/15 bg-night text-white shadow-lift motion-safe:animate-scale-in"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 animate-drift-grid bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px]" />
            <div className="relative border-b border-white/10 p-5">
              <button
                aria-label="Close contact information"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-moss/60 hover:text-moss"
                onClick={() => setIsContactOpen(false)}
                type="button"
              >
                <XIcon className="h-5 w-5" />
              </button>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-moss">
                Contact Information
              </p>
              <h2 id="contact-modal-title" className="mt-2 pr-12 text-2xl font-black tracking-normal">
                Let us connect.
              </h2>
            </div>
            <div className="relative space-y-3 p-5">
              {contactItems.map(({ label, value, href, Icon }) => (
                <a
                  className="group flex min-h-11 min-w-0 items-center gap-4 rounded-md border border-white/10 bg-white/[0.07] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-moss/60 hover:bg-white/[0.1]"
                  href={href}
                  key={label}
                  rel={label === "Facebook" ? "noreferrer" : undefined}
                  target={label === "Facebook" ? "_blank" : undefined}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-moss text-ink shadow-[0_12px_32px_rgba(255,208,47,0.2)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-moss">
                      {label}
                    </span>
                    <span className="block break-words text-sm font-semibold leading-6 text-white">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
