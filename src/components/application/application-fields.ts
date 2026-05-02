import type { FieldErrors } from "react-hook-form";
import type { ApiFieldErrors } from "@/types/api";
import type { ApplicationFormInput } from "@/types/application";

export type ApplicationField = keyof ApplicationFormInput;

export const applicationFieldLabels: Record<ApplicationField, string> = {
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

const applicationFieldOrder: ApplicationField[] = [
  "roleId",
  "fullName",
  "email",
  "phone",
  "location",
  "experienceYears",
  "resumeUrl",
  "linkedInUrl",
  "portfolioUrl",
  "coverLetter",
];

export function isApplicationField(value: string): value is ApplicationField {
  return value in applicationFieldLabels;
}

export function getFirstFormErrorField(
  errors: FieldErrors<ApplicationFormInput>,
) {
  return applicationFieldOrder.find((field) => errors[field]);
}

export function getFieldErrorMessage(
  errors: FieldErrors<ApplicationFormInput>,
  field: ApplicationField,
) {
  const message = errors[field]?.message;

  return typeof message === "string" ? message : undefined;
}

export function getFirstServerErrorField(fieldErrors?: ApiFieldErrors) {
  return applicationFieldOrder.find((field) => fieldErrors?.[field]?.[0]);
}

export function getFieldAttentionMessage(
  field: ApplicationField,
  message?: string,
) {
  return `${applicationFieldLabels[field]} needs attention.${
    message ? ` ${message}` : ""
  }`;
}
