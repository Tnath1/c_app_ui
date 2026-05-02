"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      aria-label={label}
      aria-pressed={isDark}
      className="relative inline-flex h-8 w-14 items-center rounded-full border border-stone-300 bg-white p-1 shadow-sm hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 focus:ring-offset-white dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-500 dark:focus:ring-stone-100 dark:focus:ring-offset-stone-950"
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      <span
        aria-hidden="true"
        className={`h-6 w-6 rounded-full shadow-sm transition-transform ${
          isDark
            ? "translate-x-6 bg-stone-100"
            : "translate-x-0 bg-stone-900"
        }`}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
