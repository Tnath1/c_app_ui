import { ApplicationForm } from "@/components/application/ApplicationForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <a
            href="#main-content"
            className="sr-only hover:bg-stone-800 focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:rounded-md focus:bg-stone-950 focus:px-3 focus:py-2 focus:text-sm focus:text-white dark:focus:bg-stone-100 dark:focus:text-stone-950"
          >
            Skip to application
          </a>
          <div>
            <p className="text-sm font-semibold tracking-normal text-stone-950 dark:text-stone-50">
              25th&amp;Staffing
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Candidate intake
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden rounded-full border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 sm:block dark:border-stone-800 dark:text-stone-300">
              Application
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section
        id="main-content"
        className="mx-auto grid w-full max-w-6xl gap-7 px-5 py-8 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-10"
      >
        <aside className="lg:pt-5">
          <p className="text-xs font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
            Candidate application
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-normal text-stone-950 sm:text-4xl dark:text-stone-50">
            Apply for an open role.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-300">
            Share your details with the 25th&amp;Staffing team. We will review
            your application and follow up when there is a strong match.
          </p>

          <div className="mt-6 grid gap-2.5 text-sm text-stone-600 dark:text-stone-300">
            <div className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-stone-100" />
              <p>Applications are reviewed by the staffing team.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-stone-100" />
              <p>Response updates are sent to the email you provide.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-stone-100" />
              <p>Required fields will be clearly marked in the form.</p>
            </div>
          </div>
        </aside>

        <section
          aria-labelledby="application-form-title"
          className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="border-b border-stone-200 pb-4 dark:border-stone-800">
            <p className="text-xs font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
              Application overview
            </p>
            <h2
              id="application-form-title"
              className="mt-1 text-xl font-semibold tracking-normal text-stone-950 dark:text-stone-50"
            >
              Candidate profile intake
            </h2>
          </div>

          <div className="pt-5">
            <ApplicationForm />
          </div>
        </section>
      </section>
    </main>
  );
}
