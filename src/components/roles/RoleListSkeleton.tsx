function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-stone-200 dark:bg-stone-800 ${className}`}
    />
  );
}

function RoleCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <SkeletonLine className="h-6 w-64 max-w-full" />
          <SkeletonLine className="h-6 w-24" />
        </div>

        <div className="flex flex-wrap gap-3">
          <SkeletonLine className="h-4 w-24" />
          <SkeletonLine className="h-4 w-32" />
          <SkeletonLine className="h-4 w-20" />
          <SkeletonLine className="h-4 w-36" />
        </div>

        <div className="mt-2 grid gap-2">
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-11/12" />
        </div>

        <SkeletonLine className="mt-3 h-10 w-28 rounded-md" />
      </div>
    </article>
  );
}

export function RoleListSkeleton() {
  return (
    <section aria-label="Loading open roles">
      <div className="mb-4">
        <SkeletonLine className="h-4 w-24" />
        <SkeletonLine className="mt-2 h-7 w-72 max-w-full" />
      </div>

      <div className="grid gap-4">
        <RoleCardSkeleton />
        <RoleCardSkeleton />
        <RoleCardSkeleton />
      </div>
    </section>
  );
}
