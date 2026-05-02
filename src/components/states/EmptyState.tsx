type EmptyStateProps = {
  message: string;
  title: string;
};

export function EmptyState({ message, title }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950">
      <p className="text-sm font-medium text-stone-800 dark:text-stone-100">
        {title}
      </p>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        {message}
      </p>
    </div>
  );
}
