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
