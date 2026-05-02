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
      className="inline-flex h-9 items-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-medium text-stone-700 shadow-sm hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 focus:ring-offset-white dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-stone-700 dark:hover:bg-stone-800 dark:focus:ring-stone-100 dark:focus:ring-offset-stone-950"
      onClick={toggleTheme}
      type="button"
    >
      <span
        aria-hidden="true"
        className="relative h-4 w-7 rounded-full bg-stone-200 transition-colors dark:bg-stone-700"
      >
        <span
          className={`absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform dark:bg-stone-100 ${
            isDark ? "translate-x-3" : "translate-x-0"
          }`}
        />
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
