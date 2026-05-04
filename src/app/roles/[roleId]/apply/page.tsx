import { notFound } from "next/navigation";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { AppHeader } from "@/components/layout/AppHeader";
import { SelectedRoleSummary } from "@/components/roles/SelectedRoleSummary";
import { mockRoles } from "@/lib/mock-data/roles";

type ApplyPageProps = {
  params: Promise<{
    roleId: string;
  }>;
};

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { roleId } = await params;
  const selectedRole = mockRoles.find((role) => role.id === roleId);

  if (!selectedRole) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950" id="top">
      <AppHeader />

      <section
        className="mx-auto grid w-full max-w-3xl gap-8 px-5 py-9 sm:px-6 lg:py-11"
        id="main-content"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-stone-950 dark:text-stone-50">
            Apply for this role
          </h1>
          <p className="mt-2 text-base text-stone-600 dark:text-stone-300">
            Fill in the form below. It takes about 5 minutes.
          </p>
        </div>

        <SelectedRoleSummary role={selectedRole} />

        <section
          aria-labelledby="application-form-title"
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
            <p className="text-sm font-medium uppercase tracking-normal text-stone-500 dark:text-stone-400">
              Application overview
            </p>
            <h2
              className="mt-1.5 text-2xl font-semibold tracking-normal text-stone-950 dark:text-stone-50"
              id="application-form-title"
            >
              Candidate profile intake
            </h2>
          </div>

          <div className="pt-6">
            <ApplicationForm roles={mockRoles} selectedRoleId={selectedRole.id} />
          </div>
        </section>
      </section>
    </main>
  );
}
