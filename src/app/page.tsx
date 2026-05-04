import { Suspense } from "react";
import { ApplicationWorkspace } from "@/components/application/ApplicationWorkspace";
import { AppHeader } from "@/components/layout/AppHeader";
import { LoadingState } from "@/components/states";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950" id="top">
      <AppHeader />

      <section
        id="main-content"
        className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-9 sm:px-6 lg:py-11"
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

        <Suspense
          fallback={
            <LoadingState
              message="Preparing the application workspace."
              title="Loading application workspace"
            />
          }
        >
          <ApplicationWorkspace />
        </Suspense>
      </section>
    </main>
  );
}
