"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
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
import { Button, LiveRegion } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
import { ApplicationSubmitBar } from "./ApplicationSubmitBar";
import { ApplicationSuccessModal } from "./ApplicationSuccessModal";
import {
  getFieldAttentionMessage,
  getFieldErrorMessage,
  getFirstFormErrorField,
  getFirstServerErrorField,
  isApplicationField,
} from "./application-fields";
import type { ApplicationField } from "./application-fields";
import { ExperienceFields } from "./ExperienceFields";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { RoleSelectField } from "./RoleSelectField";
import type { ApplicationFormValues } from "@/lib/validation/application-schema";

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

function createRoleOptions(roles: Awaited<ReturnType<typeof getRoles>>) {
  return roles.map<SelectOption>((role) => ({
    label: `${role.title} - ${role.location}`,
    value: role.id,
  }));
}

export function ApplicationForm() {
  const [formError, setFormError] = useState<string | undefined>();
  const [liveErrorMessage, setLiveErrorMessage] = useState<
    string | undefined
  >();
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
      const errorMessage = getErrorMessage(error);

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

        const firstServerErrorField = getFirstServerErrorField(
          error.fieldErrors,
        );

        if (firstServerErrorField) {
          const fieldMessage = error.fieldErrors[firstServerErrorField]?.[0];

          focusField(firstServerErrorField);
          setLiveErrorMessage(
            getFieldAttentionMessage(firstServerErrorField, fieldMessage),
          );
        } else {
          setLiveErrorMessage(errorMessage);
        }
      } else {
        setLiveErrorMessage(errorMessage);
      }

      setFormError(errorMessage);
    },
    onSuccess: () => {
      setFormError(undefined);
      setLiveErrorMessage(undefined);
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

  const liveStatusMessage = useMemo(() => {
    if (submission.isPending) {
      return "Submitting application.";
    }

    if (submission.data) {
      return "Application received.";
    }

    if (rolesQuery.isPending) {
      return "Loading open roles.";
    }

    if (rolesQuery.isSuccess) {
      return isRolesEmpty
        ? "No open roles available."
        : `${rolesQuery.data.length} open roles loaded.`;
    }

    return undefined;
  }, [
    isRolesEmpty,
    rolesQuery.data,
    rolesQuery.isPending,
    rolesQuery.isSuccess,
    submission.data,
    submission.isPending,
  ]);

  const liveAlertMessage = rolesQuery.isError
    ? `Roles could not be loaded. ${getErrorMessage(rolesQuery.error)}`
    : liveErrorMessage;

  function focusField(field: ApplicationField) {
    window.requestAnimationFrame(() => {
      form.setFocus(field);
    });
  }

  function focusPageTop() {
    window.requestAnimationFrame(() => {
      const brandLink = document.getElementById("site-brand");

      if (brandLink instanceof HTMLElement) {
        brandLink.focus({ preventScroll: true });
      }
    });
  }

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

  function scrollToPageTop() {
    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        top: 0,
      });
    });
  }

  function closeSuccessModal() {
    submission.reset();
    setFormError(undefined);
    setLiveErrorMessage(undefined);
    scrollToPageTop();
    focusPageTop();
  }

  function resetApplication() {
    submission.reset();
    form.reset(applicationDefaultValues);
    setFormError(undefined);
    setLiveErrorMessage(undefined);
    scrollToFormStart();
    focusField("roleId");
  }

  function handleSubmit(values: ApplicationFormValues) {
    setFormError(undefined);
    setLiveErrorMessage(undefined);
    submission.mutate(values);
  }

  function handleInvalidSubmit(errors: FieldErrors<ApplicationFormInput>) {
    const firstErrorField = getFirstFormErrorField(errors);

    if (!firstErrorField) {
      setLiveErrorMessage("Please review the highlighted fields.");
      return;
    }

    const fieldMessage = getFieldErrorMessage(errors, firstErrorField);

    focusField(firstErrorField);
    setLiveErrorMessage(
      getFieldAttentionMessage(firstErrorField, fieldMessage),
    );
  }

  return (
    <>
      <LiveRegion message={liveStatusMessage} />
      <LiveRegion assertive message={liveAlertMessage} />

      <form
        aria-busy={submission.isPending}
        className="scroll-mt-24 space-y-6"
        onSubmit={form.handleSubmit(handleSubmit, handleInvalidSubmit)}
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
