import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, className = "", ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="5.5" rx="7" ry="3.5" />
      <path d="M5 5.5v6c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5v-6" />
      <path d="M5 11.5v6c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5v-6" />
    </IconBase>
  );
}

export function RouteIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h4a4 4 0 0 0 4-4V8" />
      <path d="M10 6h4" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function CloudLaunchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17.5h9.5a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.7-1.3A4 4 0 0 0 7 17.5Z" />
      <path d="m12 15.5 3-3" />
      <path d="M15 12.5V8.5" />
      <path d="M15 8.5h-4" />
    </IconBase>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3.5v3" />
      <path d="M16 3.5v3" />
      <path d="M4 9h16" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
    </IconBase>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
      <path d="m13 5-2 14" />
    </IconBase>
  );
}

export function WindIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 13h14a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M4 17h8" />
    </IconBase>
  );
}

export function NotebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 4.5h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
      <path d="M8.5 4.5v15" />
      <path d="M11 8h4" />
      <path d="M11 12h4" />
      <path d="M11 16h3" />
    </IconBase>
  );
}

export function UserBadgeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M6 18a6 6 0 0 1 12 0" />
      <path d="m17.5 4.5 1 1 2-2" />
    </IconBase>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
      <path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8Z" />
    </IconBase>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </IconBase>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M11 4H6a2 2 0 0 0-2 2v5l8.5 8.5a2.1 2.1 0 0 0 3 0l4-4a2.1 2.1 0 0 0 0-3Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </IconBase>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <rect x="14" y="14" width="6" height="6" rx="1.2" />
    </IconBase>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M4 12.5h16" />
      <path d="M10 12.5v1.2h4v-1.2" />
    </IconBase>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 20V5.8A1.8 1.8 0 0 1 6.8 4h10.4A1.8 1.8 0 0 1 19 5.8V20" />
      <path d="M3.5 20h17" />
      <path d="M8 8h2" />
      <path d="M14 8h2" />
      <path d="M8 12h2" />
      <path d="M14 12h2" />
      <path d="M10 20v-4h4v4" />
    </IconBase>
  );
}

export function EmailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="m5 8 7 5 7-5" />
    </IconBase>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 8h2V4.8A10 10 0 0 0 13.6 4C11.2 4 10 5.5 10 7.8V10H7.5v3.4H10V20h3.5v-6.6H16l.5-3.4h-3V8.2c0-.8.2-1.2.5-1.4Z" />
    </IconBase>
  );
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m3.5 8.5 8.5-4 8.5 4-8.5 4-8.5-4Z" />
      <path d="M7 10.3v4.2c1.3 1.2 3 1.8 5 1.8s3.7-.6 5-1.8v-4.2" />
      <path d="M20.5 8.5v5" />
    </IconBase>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.4 5.2 10 8.8a1.4 1.4 0 0 1-.4 1.6l-1.2 1a10 10 0 0 0 4.2 4.2l1-1.2a1.4 1.4 0 0 1 1.6-.4l3.6 1.6a1.5 1.5 0 0 1 .9 1.6l-.4 2a1.7 1.7 0 0 1-1.7 1.3A13.6 13.6 0 0 1 4 6.4a1.7 1.7 0 0 1 1.3-1.7l2-.4a1.5 1.5 0 0 1 1.1.9Z" />
    </IconBase>
  );
}

export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}
