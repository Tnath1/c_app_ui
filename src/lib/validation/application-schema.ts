import { z } from "zod";
import type { ResumeAttachment } from "@/types/application";
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

export const MAX_RESUME_SIZE_BYTES = 4 * 1024 * 1024;

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

const resumeAttachmentField = z
  .object({
    base64: z.string().min(1, "Upload your resume PDF."),
    fileName: z.string().min(1, "Upload your resume PDF."),
    fileSize: z
      .number()
      .max(MAX_RESUME_SIZE_BYTES, "Keep your resume under 4MB."),
    fileType: z.literal("application/pdf"),
  })
  .optional()
  .refine((value): value is ResumeAttachment => Boolean(value), {
    message: "Upload your resume PDF.",
  });

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
  resume: resumeAttachmentField,
  roleId: z.string().trim().min(1, "Select a role."),
  skills: z.array(z.string()).min(1, "Select at least one technical skill."),
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
  resume: undefined,
  roleId: "",
  skills: [],
} satisfies ApplicationFormInput;

export type ApplicationFormValues = z.output<typeof applicationSchema>;
