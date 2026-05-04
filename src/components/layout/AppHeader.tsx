import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
      <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#main-content"
          className="sr-only hover:bg-stone-800 focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:rounded-md focus:bg-stone-950 focus:px-3 focus:py-2 focus:text-sm focus:text-white dark:focus:bg-stone-100 dark:focus:text-stone-950"
        >
          Skip to application
        </a>
        <Link
          aria-label="Scroll to top"
          className="rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-950"
          href="/"
          id="site-brand"
        >
          <p className="text-base font-semibold tracking-normal text-stone-950 dark:text-stone-50">
            25th&amp;Staffing
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Candidate intake
          </p>
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
