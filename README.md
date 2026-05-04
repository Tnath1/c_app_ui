# 25th&Staffing Candidate Application UI

A compact candidate application flow built with Next.js, TypeScript, Tailwind CSS, React Hook Form, Zod, and TanStack Query.

The project turns a static application flow into a small frontend system with role listings, reusable components, typed validation, mock API routes, server-state handling, and clear loading/error/empty/success states.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query

## What Is Included

- Open role listing loaded from a mock API route.
- Apply flow that reveals the application form with the selected role prefilled.
- Candidate application form with required-field validation.
- Technical skills chip selector.
- Resume PDF upload converted to Base64 before submission.
- Submit flow connected to a mock API route.
- Loading, error, empty, submit loading, submit error, and success states.
- Light/dark theme toggle, with dark mode as the default.
- Clean component split between page shell, feature components, shared UI, API clients, validation, and types.

## Accessibility

The form is built to support keyboard and screen-reader users:

- Required fields expose accessible required state, not only the visible `*`.
- Field errors are connected to their inputs and announced when they appear.
- Invalid submit moves focus to the first field that needs attention.
- Loading, error, empty, submitting, and success states are announced through live regions.
- The success confirmation behaves as a dialog: focus moves into it, `Tab` stays inside it, and `Escape` closes it.
- Closing the dialog returns focus to a sensible place in the page.

## Architecture

The app is organized around the application flow, with generic pieces separated from feature-specific logic.

- `src/app/page.tsx` defines the page shell and layout for 25th&Staffing.
- `src/components/application` contains the candidate application feature: workspace, form, grouped fields, skills picker, resume upload, submit bar, role select, and success modal.
- `src/components/roles` contains the open-role listing and role card components.
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

The resume upload is intentionally handled as a frontend demo flow: the browser validates a PDF file, converts it to Base64, and submits that payload to the mock API. In a production system, the preferred approach would usually be to upload the file to object storage and save a secure file reference instead of storing large Base64 strings directly.

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

## Manual Accessibility Checks

- Use `Tab` and `Shift + Tab` to move through the page without a mouse.
- Submit an empty form and confirm focus moves to the first invalid field.
- Submit a valid form and confirm focus moves into the success dialog.
- While the dialog is open, confirm `Tab` stays between the dialog actions.
- Press `Escape` to close the dialog.
- With a screen reader enabled, confirm loading, error, submit, and success updates are announced.

## Notes

The UI is intentionally restrained: compact navigation, clear form structure, accessible labels, visible feedback states, and consistent light/dark styling.

## Author

Arome Jonathan Ukpoju
