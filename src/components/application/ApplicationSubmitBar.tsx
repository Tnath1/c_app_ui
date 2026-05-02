import { ErrorState } from "@/components/states";
import { Button, FieldError } from "@/components/ui";
import type { ApplicationFormController } from "./application-form-types";

type ApplicationSubmitBarProps = {
  form: ApplicationFormController;
  formError?: string;
  isDisabled: boolean;
  isSubmitting: boolean;
};

export function ApplicationSubmitBar({
  form,
  formError,
  isDisabled,
  isSubmitting,
}: ApplicationSubmitBarProps) {
  return (
    <div className="border-t border-stone-200 pt-4 dark:border-stone-800">
      {formError ? (
        <div className="mb-4">
          <ErrorState
            message={formError}
            title="Application could not be submitted"
          />
        </div>
      ) : null}
      <FieldError>{form.formState.errors.root?.message}</FieldError>
      <Button
        className="w-full sm:w-auto"
        disabled={isDisabled}
        isLoading={isSubmitting}
        loadingLabel="Submitting"
        type="submit"
      >
        Submit application
      </Button>
    </div>
  );
}
