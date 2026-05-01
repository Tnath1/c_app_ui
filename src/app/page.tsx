export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:rounded-md focus:bg-stone-950 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to application
          </a>
          <div>
            <p className="text-base font-semibold tracking-normal text-stone-950">
              25th&amp;Staffing
            </p>
            <p className="text-sm text-stone-500">Candidate intake</p>
          </div>
          <div className="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-600">
            Application
          </div>
        </div>
      </header>

      <section
        id="main-content"
        className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-14"
      >
        <aside className="lg:pt-8">
          <p className="text-sm font-medium text-stone-500">
            Candidate application
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-normal text-stone-950 sm:text-5xl">
            Apply for an open role.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
            Share your details with the 25th&amp;Staffing team. We will review
            your application and follow up when there is a strong match.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-stone-600">
            <div className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-stone-900" />
              <p>Applications are reviewed by the staffing team.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-stone-900" />
              <p>Response updates are sent to the email you provide.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-stone-900" />
              <p>Required fields will be clearly marked in the form.</p>
            </div>
          </div>
        </aside>

        <section
          aria-labelledby="application-form-title"
          className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-sm font-medium text-stone-500">
              Application overview
            </p>
            <h2
              id="application-form-title"
              className="mt-1 text-2xl font-semibold tracking-normal text-stone-950"
            >
              Candidate profile intake
            </h2>
          </div>

          <div className="grid gap-4 py-6">
            {[
              "Role selection",
              "Personal information",
              "Experience and links",
              "Review and submit",
            ].map((item, index) => (
              <div
                className="flex items-center gap-4 rounded-md border border-stone-200 px-4 py-3"
                key={item}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-sm font-medium text-stone-700">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-stone-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="border-t border-stone-200 pt-5 text-sm text-stone-500">
            Four short sections before submission.
          </p>
        </section>
      </section>
    </main>
  );
}
