"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { ApiError, submitApplication } from "@/lib/api";
import type { ApplicationState } from "@/lib/api/applications";
import {
  applicationDefaultValues,
  applicationSchema,
} from "@/lib/validation/application-schema";
import type {
  ApplicationFormInput,
  CandidateApplicationPayload,
} from "@/types/application";
import type { Role } from "@/types/role";
import { LiveRegion } from "@/components/ui";
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

function getApplicationState(value: string | null): ApplicationState | undefined {
  return value === "error" ? value : undefined;
}

function createRoleOptions(roles: Role[]) {
  return roles.map<SelectOption>((role) => ({
    label: `${role.title} - ${role.location}`,
    value: role.id,
  }));
}

function getInitialValues(selectedRoleId?: string): ApplicationFormInput {
  return {
    ...applicationDefaultValues,
    roleId: selectedRoleId || applicationDefaultValues.roleId,
  };
}

type ApplicationFormProps = {
  roles: Role[];
  selectedRoleId?: string;
};

export function ApplicationForm({
  roles,
  selectedRoleId,
}: ApplicationFormProps) {
  const [formError, setFormError] = useState<string | undefined>();
  const [liveErrorMessage, setLiveErrorMessage] = useState<
    string | undefined
  >();
  const formStartRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  const submitState = getApplicationState(searchParams.get("submitState"));

  const roleOptions = useMemo(() => {
    return createRoleOptions(roles);
  }, [roles]);

  const form = useForm<ApplicationFormInput, undefined, ApplicationFormValues>({
    defaultValues: getInitialValues(selectedRoleId),
    mode: "onBlur",
    resolver: zodResolver(applicationSchema),
  });

  useEffect(() => {
    if (!selectedRoleId) {
      return;
    }

    form.setValue("roleId", selectedRoleId, {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [form, selectedRoleId]);

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

  const isRoleSelectDisabled = roles.length === 0;
  const rolePlaceholder = roles.length === 0 ? "No open roles" : "Select a role";

  const liveStatusMessage = useMemo(() => {
    if (submission.isPending) {
      return "Submitting application.";
    }

    if (submission.data) {
      return "Application received.";
    }

    return undefined;
  }, [submission.data, submission.isPending]);

  const liveAlertMessage = liveErrorMessage;

  function focusField(field: ApplicationField) {
    window.requestAnimationFrame(() => {
      if (field === "skills") {
        document.getElementById("technical-skill-first")?.focus();
        return;
      }

      if (field === "resume") {
        document.getElementById("resume")?.focus();
        return;
      }

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
    form.reset(getInitialValues(selectedRoleId));
    setFormError(undefined);
    setLiveErrorMessage(undefined);
    scrollToFormStart();
    focusField("roleId");
  }

  function handleSubmit(values: ApplicationFormValues) {
    setFormError(undefined);
    setLiveErrorMessage(undefined);

    if (!values.resume) {
      form.setError("resume", {
        message: "Upload your resume PDF.",
        type: "validate",
      });
      focusField("resume");
      setLiveErrorMessage("Resume PDF needs attention. Upload your resume PDF.");
      return;
    }

    submission.mutate({
      ...values,
      resume: values.resume,
    });
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
