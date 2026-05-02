import type { UseFormReturn } from "react-hook-form";
import type { ApplicationFormInput } from "@/types/application";
import type { ApplicationFormValues } from "@/lib/validation/application-schema";

export type ApplicationFormController = UseFormReturn<
  ApplicationFormInput,
  undefined,
  ApplicationFormValues
>;
