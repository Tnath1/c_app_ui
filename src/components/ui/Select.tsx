import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";

export type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "id"> & {
  error?: string;
  helperText?: string;
  id: string;
  isRequired?: boolean;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  className,
  disabled,
  error,
  helperText,
  id,
  isRequired = false,
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
        <FieldLabel htmlFor={id} isRequired={isRequired} label={label} />
      ) : null}
      <div className="relative">
        <select
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : "false"}
          aria-required={isRequired ? "true" : undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-stone-300 bg-white px-3.5 pr-10 text-base text-stone-950 shadow-sm outline-none transition-colors hover:border-stone-400 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:hover:border-stone-600 dark:focus:border-stone-100 dark:focus:ring-stone-100/10 dark:disabled:bg-stone-900",
            error &&
              "border-red-500 focus:border-red-600 focus:ring-red-600/10 dark:border-red-400 dark:focus:border-red-300 dark:focus:ring-red-300/10",
            className,
          )}
          disabled={disabled}
          id={id}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option
              className="bg-white text-stone-950 dark:bg-stone-950 dark:text-stone-50"
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-500 dark:text-stone-400",
            disabled && "opacity-50",
          )}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 7.5 10 12l4.5-4.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </span>
      </div>
      {helperText ? (
        <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400" id={helperId}>
          {helperText}
        </p>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
