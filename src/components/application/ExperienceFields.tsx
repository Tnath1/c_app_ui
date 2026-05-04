import { Input, Textarea } from "@/components/ui";
import type { ApplicationFormController } from "./application-form-types";
import { ResumeUploadField } from "./ResumeUploadField";
import { SkillsField } from "./SkillsField";

type ExperienceFieldsProps = {
  form: ApplicationFormController;
};

export function ExperienceFields({ form }: ExperienceFieldsProps) {
  return (
    <>
      <Input
        error={form.formState.errors.experienceYears?.message}
        id="experienceYears"
        inputMode="numeric"
        isRequired
        label="Years of experience"
        min="0"
        placeholder="4"
        type="number"
        {...form.register("experienceYears")}
      />
      <SkillsField form={form} />
      <ResumeUploadField form={form} />
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
    </>
  );
}
