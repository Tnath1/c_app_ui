import type { Role } from "@/types/role";

type SelectedRoleSummaryProps = {
  role: Role;
};

export function SelectedRoleSummary({ role }: SelectedRoleSummaryProps) {
  return (
    <section className="rounded-lg border border-stone-200 bg-stone-100 p-4 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">
            {role.title}
          </h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-stone-600 dark:text-stone-300">
            <span>{role.location}</span>
            <span>{role.employmentType}</span>
          </div>
        </div>
        <span className="w-fit rounded-full border border-stone-200 bg-white px-2 py-0.5 text-xs font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200">
          {role.department}
        </span>
      </div>
    </section>
  );
}
