"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ApiError, getRoles, submitApplication } from "@/lib/api";
import type { ApplicationState } from "@/lib/api/applications";
import type { RoleState } from "@/lib/api/roles";
import {
  applicationDefaultValues,
  applicationSchema,
} from "@/lib/validation/application-schema";
import type {
  ApplicationFormInput,
  CandidateApplicationPayload,
} from "@/types/application";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { Button } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
import { ApplicationSubmitBar } from "./ApplicationSubmitBar";
import { ApplicationSuccessModal } from "./ApplicationSuccessModal";
import { ExperienceFields } from "./ExperienceFields";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { RoleSelectField } from "./RoleSelectField";
import type { ApplicationFormValues } from "@/lib/validation/application-schema";

type ApplicationField = keyof ApplicationFormInput;

const fieldLabels: Record<ApplicationField, string> = {
  coverLetter: "Short note",
  email: "Email address",
  experienceYears: "Years of experience",
  fullName: "Full name",
  linkedInUrl: "LinkedIn URL",
  location: "Location",
  phone: "Phone number",
  portfolioUrl: "Portfolio URL",
  resumeUrl: "Resume URL",
  roleId: "Role",
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function getRoleState(value: string | null): RoleState | undefined {
  return value === "empty" || value === "error" ? value : undefined;
}

function getApplicationState(value: string | null): ApplicationState | undefined {
  return value === "error" ? value : undefined;
}

function isApplicationField(value: string): value is ApplicationField {
  return value in fieldLabels;
}

function createRoleOptions(roles: Awaited<ReturnType<typeof getRoles>>) {
  return roles.map<SelectOption>((role) => ({
    label: `${role.title} - ${role.location}`,
    value: role.id,
  }));
}

export function ApplicationForm() {
  const [formError, setFormError] = useState<string | undefined>();
  const formStartRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  // These params let us preview loading/error/empty states without adding demo controls to the UI.
  const rolesState = getRoleState(searchParams.get("rolesState"));
  const submitState = getApplicationState(searchParams.get("submitState"));

  // TanStack Query owns server state for open roles: loading, caching, retry, and errors.
  const rolesQuery = useQuery({
    queryFn: ({ signal }) => getRoles({ signal, state: rolesState }),
    queryKey: ["roles", rolesState],
  });

  const roleOptions = useMemo(() => {
    return rolesQuery.data ? createRoleOptions(rolesQuery.data) : [];
  }, [rolesQuery.data]);

  const form = useForm<ApplicationFormInput, undefined, ApplicationFormValues>({
    defaultValues: applicationDefaultValues,
    mode: "onBlur",
    resolver: zodResolver(applicationSchema),
  });

  // The mutation sends the Zod-normalized payload to the mock Next.js API route.
  const submission = useMutation({
    mutationFn: (application: CandidateApplicationPayload) =>
      submitApplication(application, { state: submitState }),
    onError: (error) => {
      // API validation errors are mapped back to React Hook Form fields.
      if (error instanceof ApiError && error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, messages]) => {
          if (!isApplicationField(field) || !messages?.[0]) {
            return;
          }

          form.setError(field, {
            message: messages[0],
            type: "server",
          });
        });
      }

      setFormError(getErrorMessage(error));
    },
    onSuccess: () => {
      setFormError(undefined);
    },
  });

  const isRolesEmpty = rolesQuery.data?.length === 0;
  const isRoleSelectDisabled =
    rolesQuery.isPending ||
    rolesQuery.isError ||
    !rolesQuery.data ||
    isRolesEmpty;

  const rolePlaceholder = rolesQuery.isPending
    ? "Loading roles..."
    : rolesQuery.isError
      ? "Roles unavailable"
      : rolesQuery.data?.length === 0
        ? "No open roles"
        : "Select a role";

  function scrollToFormStart() {
    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      formStartRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function closeSuccessModal() {
    submission.reset();
    setFormError(undefined);
    scrollToFormStart();
  }

  function resetApplication() {
    submission.reset();
    form.reset(applicationDefaultValues);
    setFormError(undefined);
    scrollToFormStart();
  }

  function handleSubmit(values: ApplicationFormValues) {
    setFormError(undefined);
    submission.mutate(values);
  }

  return (
    <>
      <form
        aria-busy={submission.isPending}
        className="scroll-mt-24 space-y-6"
        onSubmit={form.handleSubmit(handleSubmit)}
        ref={formStartRef}
      >
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

        <fieldset
          className="grid gap-4 sm:grid-cols-2"
          disabled={submission.isPending}
        >
          <div className="sm:col-span-2">
            <RoleSelectField
              disabled={isRoleSelectDisabled}
              form={form}
              options={roleOptions}
              placeholder={rolePlaceholder}
            />
          </div>

          <PersonalInfoFields form={form} />
          <ExperienceFields form={form} />
        </fieldset>

        <ApplicationSubmitBar
          form={form}
          formError={formError}
          isDisabled={isRoleSelectDisabled}
          isSubmitting={submission.isPending}
        />
      </form>

      {submission.data ? (
        <ApplicationSuccessModal
          onClose={closeSuccessModal}
          onSubmitAnother={resetApplication}
          submission={submission.data}
        />
      ) : null}
    </>
  );
}
