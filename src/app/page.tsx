import { Suspense } from "react";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { LoadingState } from "@/components/states";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950" id="top">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
          <a
            href="#main-content"
            className="sr-only hover:bg-stone-800 focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:rounded-md focus:bg-stone-950 focus:px-3 focus:py-2 focus:text-sm focus:text-white dark:focus:bg-stone-100 dark:focus:text-stone-950"
          >
            Skip to application
          </a>
          <a
            aria-label="Scroll to top"
            className="rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-950"
            href="#top"
            id="site-brand"
          >
            <p className="text-base font-semibold tracking-normal text-stone-950 dark:text-stone-50">
              25th&amp;Staffing
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Candidate intake
            </p>
          </a>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section
        id="main-content"
        className="grid w-full gap-8 px-5 py-9 sm:px-6 lg:px-8 lg:py-11"
      >
        <aside>
          <p className="text-sm font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
            Candidate application
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-normal text-stone-950 sm:text-5xl dark:text-stone-50">
            Apply for an open role.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg dark:text-stone-300">
            Share your details with the 25th&amp;Staffing team. We will review
            your application and follow up when there is a strong match.
          </p>

          <div className="mt-7 grid gap-3 text-base text-stone-600 dark:text-stone-300">
            <div className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-stone-100" />
              <p>Applications are reviewed by the staffing team.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-stone-100" />
              <p>Response updates are sent to the email you provide.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-stone-100" />
              <p>Required fields will be clearly marked in the form.</p>
            </div>
          </div>
        </aside>

        <section
          aria-labelledby="application-form-title"
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
            <p className="text-sm font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
              Application overview
            </p>
            <h2
              id="application-form-title"
              className="mt-1.5 text-2xl font-semibold tracking-normal text-stone-950 dark:text-stone-50"
            >
              Candidate profile intake
            </h2>
          </div>

          <div className="pt-6">
            <Suspense
              fallback={
                <LoadingState
                  message="Preparing the application workspace."
                  title="Loading application form"
                />
              }
            >
              <ApplicationForm />
            </Suspense>
          </div>
        </section>
      </section>
    </main>
  );
}
