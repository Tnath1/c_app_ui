import type { ApplicationSubmissionResponse } from "@/types/application";
import { Button } from "@/components/ui";

type ApplicationSuccessModalProps = {
  onClose: () => void;
  onSubmitAnother: () => void;
  submission: ApplicationSubmissionResponse;
};

export function ApplicationSuccessModal({
  onClose,
  onSubmitAnother,
  submission,
}: ApplicationSuccessModalProps) {
  // The form remains mounted behind the modal so the user gets clear completion feedback.
  return (
    <div
      aria-labelledby="application-success-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <div className="relative w-full max-w-md rounded-lg border border-stone-200 bg-white p-6 text-center shadow-xl dark:border-stone-800 dark:bg-stone-900">
        <button
          aria-label="Close confirmation"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-500 outline-none transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-50 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-900"
          onClick={onClose}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m6 6 8 8M14 6l-8 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </button>

        <div className="success-check mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m5.5 10.5 3 3 6-7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
          Application received
        </p>
        <h3
          className="mx-auto mt-1 max-w-sm text-xl font-semibold text-stone-950 dark:text-stone-50"
          id="application-success-title"
        >
          Thank you, {submission.candidateName}.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-600 dark:text-stone-300">
          {submission.message} We will contact you by email when there is an
          update.
        </p>

        <div className="mx-auto mt-4 max-w-xs rounded-md border border-stone-200 bg-stone-50 px-3 py-2 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Reference
          </p>
          <p className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">
            {submission.applicationId}
          </p>
        </div>

        <div className="mt-5 flex justify-center">
          <Button onClick={onSubmitAnother} type="button" variant="primary">
            Submit another application
          </Button>
        </div>
      </div>
    </div>
  );
}
