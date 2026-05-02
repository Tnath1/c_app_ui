type FieldLabelProps = {
  htmlFor: string;
  isRequired?: boolean;
  label: string;
};

export function FieldLabel({
  htmlFor,
  isRequired = false,
  label,
}: FieldLabelProps) {
  return (
    <label
      className="mb-2 block text-base font-medium text-stone-700 dark:text-stone-200"
      htmlFor={htmlFor}
    >
      {label}
      {isRequired ? (
        <>
          <span
            aria-hidden="true"
            className="ml-0.5 text-red-600 dark:text-red-400"
          >
            *
          </span>
          <span className="sr-only"> required</span>
        </>
      ) : null}
    </label>
  );
}
