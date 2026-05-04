"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getRoles } from "@/lib/api";
import type { RoleState } from "@/lib/api/roles";
import { EmptyState, ErrorState } from "@/components/states";
import { Button, LiveRegion } from "@/components/ui";
import { RoleList } from "@/components/roles/RoleList";
import { RoleListSkeleton } from "@/components/roles/RoleListSkeleton";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function getRoleState(value: string | null): RoleState | undefined {
  return value === "empty" || value === "error" ? value : undefined;
}

export function ApplicationWorkspace() {
  const searchParams = useSearchParams();
  const rolesState = getRoleState(searchParams.get("rolesState"));

  const rolesQuery = useQuery({
    queryFn: ({ signal }) => getRoles({ signal, state: rolesState }),
    queryKey: ["roles", rolesState],
  });

  const isRolesEmpty = rolesQuery.data?.length === 0;
  const liveStatusMessage = rolesQuery.isPending
    ? "Loading open roles."
    : rolesQuery.isSuccess
      ? isRolesEmpty
        ? "No open roles available."
        : `${rolesQuery.data.length} open roles loaded.`
      : undefined;

  return (
    <div className="grid gap-8">
      <LiveRegion message={liveStatusMessage} />
      <LiveRegion
        assertive
        message={
          rolesQuery.isError
            ? `Roles could not be loaded. ${getErrorMessage(rolesQuery.error)}`
            : undefined
        }
      />

      {rolesQuery.isPending ? (
        <RoleListSkeleton />
      ) : null}

      {rolesQuery.isError ? (
        <ErrorState
          action={
            <Button
              onClick={() => rolesQuery.refetch()}
              size="sm"
              type="button"
              variant="secondary"
            >
              Retry
            </Button>
          }
          message={getErrorMessage(rolesQuery.error)}
          title="Roles could not be loaded"
        />
      ) : null}

      {isRolesEmpty ? (
        <EmptyState
          message="Please check back later or contact the staffing team for upcoming openings."
          title="No open roles available"
        />
      ) : null}

      {rolesQuery.data && !isRolesEmpty ? (
        <RoleList roles={rolesQuery.data} />
      ) : null}
    </div>
  );
}
