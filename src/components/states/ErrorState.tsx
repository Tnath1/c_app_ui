import type { ReactNode } from "react";

type ErrorStateProps = {
  action?: ReactNode;
  message: string;
  title?: string;
};

export function ErrorState({
  action,
  message,
  title = "Something went wrong",
}: ErrorStateProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900/60 dark:bg-red-950/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            {title}
          </p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            {message}
          </p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
