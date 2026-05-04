import { technicalSkills } from "@/lib/constants/technical-skills";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui";
import type { ApplicationFormController } from "./application-form-types";

type SkillsFieldProps = {
  form: ApplicationFormController;
};

export function SkillsField({ form }: SkillsFieldProps) {
  const selectedSkills = form.watch("skills") || [];
  const errorId = form.formState.errors.skills ? "skills-error" : undefined;

  function toggleSkill(skill: string) {
    const nextSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
      : [...selectedSkills, skill];

    form.setValue("skills", nextSkills, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (nextSkills.length > 0) {
      form.clearErrors("skills");
    }
  }

  return (
    <fieldset
      aria-describedby={errorId}
      className="sm:col-span-2"
      id="technical-skills"
    >
      <legend className="mb-2 block text-base font-medium text-stone-700 dark:text-stone-200">
        Technical Skills
        <span
          aria-hidden="true"
          className="ml-0.5 text-red-600 dark:text-red-400"
        >
          *
        </span>
        <span className="sr-only"> required</span>
      </legend>

      <div className="flex flex-wrap gap-2 rounded-md border border-stone-300 bg-white p-3 dark:border-stone-700 dark:bg-stone-950">
        {technicalSkills.map((skill, index) => {
          const isSelected = selectedSkills.includes(skill);

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-950",
                isSelected
                  ? "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:bg-stone-900",
              )}
              id={index === 0 ? "technical-skill-first" : undefined}
              key={skill}
              onClick={() => toggleSkill(skill)}
              type="button"
            >
              {skill}
            </button>
          );
        })}
      </div>

      <FieldError id={errorId}>
        {form.formState.errors.skills?.message}
      </FieldError>
    </fieldset>
  );
}
