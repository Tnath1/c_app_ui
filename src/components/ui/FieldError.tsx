import type { ReactNode } from "react";

type FieldErrorProps = {
  children?: ReactNode;
  id?: string;
};

export function FieldError({ children, id }: FieldErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" id={id}>
      {children}
    </p>
  );
}
