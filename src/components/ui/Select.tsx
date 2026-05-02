import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";

export type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "id"> & {
  error?: string;
  helperText?: string;
  id: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  className,
  error,
  helperText,
  id,
  label,
  options,
  placeholder,
  ...props
}: SelectProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      {label ? (
        <label
          className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200"
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
      <select
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : "false"}
        className={cn(
          "h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-950 shadow-sm outline-none transition-colors focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 disabled:bg-stone-100 disabled:text-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:focus:border-stone-100 dark:focus:ring-stone-100/10 dark:disabled:bg-stone-900",
          error &&
            "border-red-500 focus:border-red-600 focus:ring-red-600/10 dark:border-red-400 dark:focus:border-red-300 dark:focus:ring-red-300/10",
          className,
        )}
        id={id}
        {...props}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? (
        <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400" id={helperId}>
          {helperText}
        </p>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
