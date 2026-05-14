import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-6 flex items-center space-x-2 px-1 text-sm text-slate-500" aria-label="Breadcrumb">
      <Link className="inline-flex min-h-11 items-center transition-colors hover:text-clay" href="/">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          {item.href ? (
            <Link
              className="inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-clay"
              href={item.href}
            >
              {item.label}
            </Link>
          ) : (
            <span className="max-w-[150px] truncate font-medium text-ink sm:max-w-none">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
