import { z } from "zod";
import type { ApplicationFormInput } from "@/types/application";

const PHONE_PATTERN = /^[+\d][\d\s().-]{6,23}$/;

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const optionalUrlField = z
  .string()
  .trim()
  .refine(
    (value) => value.length === 0 || isValidHttpUrl(value),
    "Enter a valid URL including https://.",
  );

const requiredUrlField = z
  .string()
  .trim()
  .min(1, "Add a resume link.")
  .refine(isValidHttpUrl, "Enter a valid URL including https://.");

const experienceYearsField = z
  .string()
  .trim()
  .min(1, "Enter years of experience.")
  .or(z.number())
  .transform((value) => Number(value))
  .pipe(
    z
      .number()
      .int("Enter a whole number.")
      .min(0, "Experience cannot be negative.")
      .max(60, "Enter a realistic number of years."),
  );

export const applicationSchema = z.object({
  coverLetter: z
    .string()
    .trim()
    .max(800, "Keep your note under 800 characters."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email."),
  experienceYears: experienceYearsField,
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Name is too long."),
  linkedInUrl: optionalUrlField,
  location: z
    .string()
    .trim()
    .min(2, "Enter your location.")
    .max(80, "Location is too long."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(PHONE_PATTERN, "Enter a valid phone number."),
  portfolioUrl: optionalUrlField,
  resumeUrl: requiredUrlField,
  roleId: z.string().trim().min(1, "Select a role."),
});

export const applicationDefaultValues = {
  coverLetter: "",
  email: "",
  experienceYears: "",
  fullName: "",
  linkedInUrl: "",
  location: "",
  phone: "",
  portfolioUrl: "",
  resumeUrl: "",
  roleId: "",
} satisfies ApplicationFormInput;

export type ApplicationFormValues = z.output<typeof applicationSchema>;
