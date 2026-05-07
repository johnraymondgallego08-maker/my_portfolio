export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8" role="status" aria-label="Loading page">
      <div className="h-5 w-32 animate-pulse rounded-full bg-moss/35" />
      <div className="space-y-4">
        <div className="h-10 w-full max-w-2xl animate-pulse rounded-lg bg-clay/15" />
        <div className="h-10 w-full max-w-xl animate-pulse rounded-lg bg-clay/10" />
        <div className="h-5 w-full max-w-lg animate-pulse rounded-lg bg-moss/25" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div className="h-72 animate-pulse rounded-lg border border-clay/15 bg-white/80 shadow-soft" key={item} />
        ))}
      </div>
    </div>
  );
}
