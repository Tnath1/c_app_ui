import type { Role } from "@/types/role";
import { RoleCard } from "./RoleCard";
import { RoleListHeader } from "./RoleListHeader";

type RoleListProps = {
  roles: Role[];
};

export function RoleList({ roles }: RoleListProps) {
  return (
    <section aria-labelledby="open-roles-title">
      <RoleListHeader />

      <div className="grid gap-4">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
