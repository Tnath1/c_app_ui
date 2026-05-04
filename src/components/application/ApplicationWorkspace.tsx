"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { getRoles } from "@/lib/api";
import type { RoleState } from "@/lib/api/roles";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { Button, LiveRegion } from "@/components/ui";
import { RoleList } from "@/components/roles/RoleList";
import { ApplicationForm } from "./ApplicationForm";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function getRoleState(value: string | null): RoleState | undefined {
  return value === "empty" || value === "error" ? value : undefined;
}

function scrollToElement(element: HTMLElement | null) {
  window.requestAnimationFrame(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    element?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
}

export function ApplicationWorkspace() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  const formSectionRef = useRef<HTMLElement>(null);
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

  function handleApply(roleId: string) {
    setSelectedRoleId(roleId);
    window.requestAnimationFrame(() => {
      scrollToElement(formSectionRef.current);
    });
  }

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
        <LoadingState
          message="We are checking the current openings before you apply."
          title="Loading open roles"
        />
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
        <RoleList onApply={handleApply} roles={rolesQuery.data} />
      ) : null}

      {selectedRoleId && rolesQuery.data ? (
        <section
          aria-labelledby="application-form-title"
          className="scroll-mt-24 rounded-lg border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
          ref={formSectionRef}
        >
          <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
            <p className="text-sm font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
              Application overview
            </p>
            <h2
              className="mt-1.5 text-2xl font-semibold tracking-normal text-stone-950 dark:text-stone-50"
              id="application-form-title"
            >
              Candidate profile intake
            </h2>
          </div>

          <div className="pt-6">
            <ApplicationForm
              roles={rolesQuery.data}
              selectedRoleId={selectedRoleId}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
