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
      className="relative inline-flex h-7 w-12 items-center rounded-full border border-stone-300 bg-stone-100 p-0.5 shadow-inner hover:border-stone-400 hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-stone-700 dark:bg-stone-800 dark:hover:border-stone-600 dark:hover:bg-stone-700 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-950"
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      <span
        aria-hidden="true"
        className={`h-5 w-5 rounded-full shadow-sm transition-transform ${
          isDark
            ? "translate-x-5 bg-stone-100"
            : "translate-x-0 bg-stone-900"
        }`}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
