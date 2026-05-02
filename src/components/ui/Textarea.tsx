import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  error?: string;
  helperText?: string;
  id: string;
  isRequired?: boolean;
  label?: string;
};

export function Textarea({
  className,
  error,
  helperText,
  id,
  isRequired = false,
  label,
  rows = 5,
  ...props
}: TextareaProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      {label ? (
        <FieldLabel htmlFor={id} isRequired={isRequired} label={label} />
      ) : null}
      <textarea
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : "false"}
        aria-required={isRequired ? "true" : undefined}
        className={cn(
          "w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-base text-stone-950 shadow-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 disabled:bg-stone-100 disabled:text-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:placeholder:text-stone-500 dark:focus:border-stone-100 dark:focus:ring-stone-100/10 dark:disabled:bg-stone-900",
          error &&
            "border-red-500 focus:border-red-600 focus:ring-red-600/10 dark:border-red-400 dark:focus:border-red-300 dark:focus:ring-red-300/10",
          className,
        )}
        id={id}
        rows={rows}
        {...props}
      />
      {helperText ? (
        <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400" id={helperId}>
          {helperText}
        </p>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
