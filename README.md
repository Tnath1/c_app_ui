# 25th&Staffing Candidate Application UI

A compact candidate application flow built with Next.js, TypeScript, Tailwind CSS, React Hook Form, Zod, and TanStack Query.

The project turns a static application flow into a small frontend system with reusable components, typed validation, mock API routes, server-state handling, and clear loading/error/empty/success states.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query

## What Is Included

- Candidate application form with required-field validation.
- Open role selection loaded from a mock API route.
- Submit flow connected to a mock API route.
- Loading, error, empty, submit loading, submit error, and success states.
- Light/dark theme toggle, with dark mode as the default.
- Clean component split between page shell, feature components, shared UI, API clients, validation, and types.

## Architecture

The app is organized around the application flow, with generic pieces separated from feature-specific logic.

- `src/app/page.tsx` defines the page shell and layout for 25th&Staffing.
- `src/components/application` contains the candidate application feature: form, grouped fields, submit bar, role select, and success modal.
- `src/components/ui` contains reusable form and button components.
- `src/components/states` contains shared loading, error, and empty state components.
- `src/components/theme` contains the theme provider and toggle.
- `src/components/query` contains the TanStack Query provider.
- `src/lib/validation/application-schema.ts` defines the Zod schema and default form values.
- `src/lib/api` contains typed client functions used by React components.
- `src/app/api` contains the mock Next.js route handlers.
- `src/types` contains shared TypeScript contracts for roles, applications, and API errors.

## Mock API Decision

No real backend endpoint was provided, so the project uses mock API routes inside Next.js:

- `GET /api/roles` returns available roles.
- `POST /api/applications` accepts and validates an application payload.

The frontend still calls these through a small service layer:

- `getRoles()`
- `submitApplication()`

This keeps components away from raw `fetch` calls and makes the mock easy to replace later. If a real backend is added, the main change should be in `src/lib/api`, while the form and UI can stay mostly the same.

The mock application route validates the submitted payload with the same Zod schema used by the form. This mirrors a real application flow where client-side validation improves the user experience, but the server still protects the API contract.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` runs the production build.
- `npm run lint` checks the code with ESLint.

## Previewing States

The mock routes support query params so review states can be previewed without changing code.

Default application flow:

```text
http://localhost:3000
```

Roles error state:

```text
http://localhost:3000?rolesState=error
```

Roles empty state:

```text
http://localhost:3000?rolesState=empty
```

Submit error state:

```text
http://localhost:3000?submitState=error
```

Submit loading appears briefly after submitting the form. The success modal appears after a valid submission on the default route.

## Notes

The UI is intentionally restrained: compact navigation, clear form structure, accessible labels, visible feedback states, and consistent light/dark styling.

## Author

Arome Jonathan Ukpoju
