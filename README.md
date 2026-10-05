# React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Azure Static Web Apps Template

A reusable, UI-enabled engineering foundation for React applications built with TypeScript, Vite, Tailwind CSS, shadcn/ui, and Azure Static Web Apps.

The template includes a neutral responsive application shell, semantic design tokens, a project-owned shadcn/ui Button, React Router, strict TypeScript, Vitest, React Testing Library, Playwright, SPA fallback configuration, and Pull Request and Production delivery workflows.

## Requirements

- Node.js 24
- npm

## Local development

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
npm run check
```

## UI foundation

- Tailwind CSS v4 is integrated through `@tailwindcss/vite`.
- shadcn/ui uses the Radix UI library, Nova preset, neutral CSS variables, and Lucide icons.
- Geist Variable is bundled as the default font.
- The first visit follows the system colour scheme, and the Header theme control persists an explicit light or dark choice.
- Global tokens and base styles live in `src/styles/index.css`.
- The responsive Header, Main, and Footer shell lives in `src/components/layout/AppShell.tsx`.
- Project-owned shadcn/ui components live in `src/components/ui`.
- `components.json` defines aliases and generation settings for additional components.

The included shell and placeholder pages are deliberately product-neutral. Replace their identity, copy, routes, and visual decisions with the needs of the new project rather than treating them as a finished product design.

Add another shadcn/ui component only when the project uses it:

```bash
npx shadcn@latest add <component>
```

## Environment variables

Only variables prefixed with `VITE_` are available to browser code. Treat those values as public.

Use `.env.example` for safe example values. Keep local values in `.env.local`, and never use a `VITE_` variable for a token or other secret.

## Create a project

1. Select **Use this template** on GitHub and create a new repository from the default branch.
2. Create an Azure Static Web Apps resource and select `Other` as the deployment source.
3. Copy its Deployment Token into the GitHub Actions repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Create a working branch, adapt the template for the new project, and open a Pull Request targeting `main`.
5. Confirm that `Quality`, `Deploy`, and `Deployed smoke test` succeed.
6. Create an active branch ruleset named `Protect main` targeting the default branch.
7. Enable `Restrict deletions`, `Require a pull request before merging`, `Require status checks to pass before merging`, `Require linear history`, and `Block force pushes`.
8. Require the `Quality`, `Deploy`, and `Deployed smoke test` status checks, and allow only Squash merging.
9. Squash Merge the Pull Request and confirm that `Production deploy` and `Production smoke test` succeed.

GitHub creates an initial commit on `main` when a repository is created from the template. That push starts Production Delivery before the Azure resource and secret can be configured. A failed initial Production Delivery is expected; after step 3, rerun it from the Actions tab.

## Repository secret

The workflows require this GitHub Actions repository secret:

```text
AZURE_STATIC_WEB_APPS_API_TOKEN
```

Never place the Deployment Token in source files, environment examples, workflow files, or documentation.

## Technical design

See [`docs/TECHNICAL_DESIGN.md`](docs/TECHNICAL_DESIGN.md).
