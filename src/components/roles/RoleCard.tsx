import Link from "next/link";
import type { Role } from "@/types/role";

type RoleCardProps = {
  role: Role;
};

export function RoleCard({ role }: RoleCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold tracking-normal text-stone-950 dark:text-stone-50">
              {role.title}
            </h2>
            <span className="rounded-full border border-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600 dark:border-stone-700 dark:text-stone-300">
              {role.department}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-stone-500 dark:text-stone-400">
            <span>{role.workplace}</span>
            <span>{role.location}</span>
            <span>{role.employmentType}</span>
            <span>{role.salaryRange}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-stone-600 dark:text-stone-300">
        {role.description}
      </p>

      <div className="mt-5">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-transparent bg-stone-950 px-4 text-sm font-medium text-white shadow-sm outline-none transition-colors hover:bg-stone-800 focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-950"
          href={`/roles/${role.id}/apply`}
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
}
