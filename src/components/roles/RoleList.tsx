import type { Role } from "@/types/role";
import { RoleCard } from "./RoleCard";

type RoleListProps = {
  onApply: (roleId: string) => void;
  roles: Role[];
};

export function RoleList({ onApply, roles }: RoleListProps) {
  return (
    <section aria-labelledby="open-roles-title">
      <div className="mb-4">
        <p className="text-sm font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
          Open roles
        </p>
        <h2
          className="mt-1.5 text-2xl font-semibold tracking-normal text-stone-950 dark:text-stone-50"
          id="open-roles-title"
        >
          Choose a role to apply for.
        </h2>
      </div>

      <div className="grid gap-4">
        {roles.map((role) => (
          <RoleCard key={role.id} onApply={onApply} role={role} />
        ))}
      </div>
    </section>
  );
}
