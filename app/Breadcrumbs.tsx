import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-orange-100/50 mb-6 px-1" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-moss transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-orange-100/20" aria-hidden="true">
            /
          </span>
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-moss transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-orange-100 truncate max-w-[150px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
