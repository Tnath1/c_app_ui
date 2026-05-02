type LoadingStateProps = {
  message?: string;
  title: string;
};

export function LoadingState({ message, title }: LoadingStateProps) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 h-4 w-4 animate-spin rounded-full border-2 border-stone-400 border-r-transparent dark:border-stone-500 dark:border-r-transparent" />
        <div>
          <p className="text-sm font-medium text-stone-800 dark:text-stone-100">
            {title}
          </p>
          {message ? (
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
