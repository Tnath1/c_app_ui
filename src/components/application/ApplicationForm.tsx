"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ApiError, getRoles, submitApplication } from "@/lib/api";
import {
  applicationDefaultValues,
  applicationSchema,
} from "@/lib/validation/application-schema";
import type {
  ApplicationFormInput,
  CandidateApplicationPayload,
} from "@/types/application";
import { Button, FieldError, Input, Select, Textarea } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
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

function isApplicationField(value: string): value is ApplicationField {
  return value in fieldLabels;
}

function createRoleOptions(roles: Awaited<ReturnType<typeof getRoles>>) {
  return roles.map<SelectOption>((role) => ({
    label: `${role.title} · ${role.location}`,
    value: role.id,
  }));
}

export function ApplicationForm() {
  const [formError, setFormError] = useState<string | undefined>();

  const rolesQuery = useQuery({
    queryFn: ({ signal }) => getRoles({ signal }),
    queryKey: ["roles"],
  });

  const roleOptions = useMemo(() => {
    return rolesQuery.data ? createRoleOptions(rolesQuery.data) : [];
  }, [rolesQuery.data]);

  const form = useForm<ApplicationFormInput, undefined, ApplicationFormValues>({
    defaultValues: applicationDefaultValues,
    mode: "onBlur",
    resolver: zodResolver(applicationSchema),
  });

  const submission = useMutation({
    mutationFn: (application: CandidateApplicationPayload) =>
      submitApplication(application),
    onError: (error) => {
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

  const isRoleSelectDisabled =
    rolesQuery.isPending ||
    rolesQuery.isError ||
    !rolesQuery.data ||
    rolesQuery.data.length === 0;

  const rolePlaceholder = rolesQuery.isPending
    ? "Loading roles..."
    : rolesQuery.isError
      ? "Roles unavailable"
      : rolesQuery.data?.length === 0
        ? "No open roles"
        : "Select a role";

  function resetApplication() {
    submission.reset();
    form.reset(applicationDefaultValues);
    setFormError(undefined);
  }

  function handleSubmit(values: ApplicationFormValues) {
    setFormError(undefined);
    submission.mutate(values);
  }

  if (submission.data) {
    return (
      <div className="rounded-md border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950">
        <p className="text-xs font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
          Application received
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-950 dark:text-stone-50">
          Thank you, {submission.data.candidateName}.
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
          {submission.data.message} We will contact you by email when there is
          an update.
        </p>
        <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
          Reference: {submission.data.applicationId}
        </p>
        <Button className="mt-5" onClick={resetApplication} variant="secondary">
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Select
            disabled={isRoleSelectDisabled}
            error={form.formState.errors.roleId?.message}
            id="roleId"
            label="Role"
            options={roleOptions}
            placeholder={rolePlaceholder}
            {...form.register("roleId")}
          />
          {rolesQuery.isError ? (
            <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 dark:border-red-900/60 dark:bg-red-950/30">
              <p className="text-sm text-red-700 dark:text-red-300">
                {getErrorMessage(rolesQuery.error)}
              </p>
              <Button
                onClick={() => rolesQuery.refetch()}
                size="sm"
                type="button"
                variant="secondary"
              >
                Retry
              </Button>
            </div>
          ) : null}
          {rolesQuery.data?.length === 0 ? (
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              There are no open roles available right now.
            </p>
          ) : null}
        </div>

        <Input
          autoComplete="name"
          error={form.formState.errors.fullName?.message}
          id="fullName"
          label="Full name"
          placeholder="Jane Doe"
          {...form.register("fullName")}
        />
        <Input
          autoComplete="email"
          error={form.formState.errors.email?.message}
          id="email"
          label="Email address"
          placeholder="jane@example.com"
          type="email"
          {...form.register("email")}
        />
        <Input
          autoComplete="tel"
          error={form.formState.errors.phone?.message}
          id="phone"
          label="Phone number"
          placeholder="+234 800 000 0000"
          type="tel"
          {...form.register("phone")}
        />
        <Input
          autoComplete="address-level2"
          error={form.formState.errors.location?.message}
          id="location"
          label="Location"
          placeholder="Lagos, Nigeria"
          {...form.register("location")}
        />
        <Input
          error={form.formState.errors.experienceYears?.message}
          id="experienceYears"
          inputMode="numeric"
          label="Years of experience"
          min="0"
          placeholder="4"
          type="number"
          {...form.register("experienceYears")}
        />
        <Input
          error={form.formState.errors.resumeUrl?.message}
          id="resumeUrl"
          label="Resume URL"
          placeholder="https://example.com/resume.pdf"
          type="url"
          {...form.register("resumeUrl")}
        />
        <Input
          error={form.formState.errors.linkedInUrl?.message}
          id="linkedInUrl"
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/janedoe"
          type="url"
          {...form.register("linkedInUrl")}
        />
        <Input
          error={form.formState.errors.portfolioUrl?.message}
          id="portfolioUrl"
          label="Portfolio URL"
          placeholder="https://janedoe.com"
          type="url"
          {...form.register("portfolioUrl")}
        />
        <div className="sm:col-span-2">
          <Textarea
            error={form.formState.errors.coverLetter?.message}
            helperText="Optional. Keep it short and specific."
            id="coverLetter"
            label="Short note"
            placeholder="Tell us what kind of role you are looking for."
            rows={4}
            {...form.register("coverLetter")}
          />
        </div>
      </div>

      <div className="border-t border-stone-200 pt-4 dark:border-stone-800">
        <FieldError>{formError}</FieldError>
        <Button
          className="w-full sm:w-auto"
          disabled={isRoleSelectDisabled}
          isLoading={submission.isPending}
          loadingLabel="Submitting"
          type="submit"
        >
          Submit application
        </Button>
      </div>
    </form>
  );
}
