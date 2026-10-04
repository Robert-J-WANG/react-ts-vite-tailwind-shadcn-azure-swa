# React + TypeScript + Vite + Azure Static Web Apps Template

A reusable, non-UI engineering foundation for React applications built with TypeScript, Vite, and Azure Static Web Apps.

The template includes strict TypeScript, React Router, Vitest, React Testing Library, Playwright, SPA fallback configuration, and Pull Request and Production delivery workflows.

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

## Environment variables

Only variables prefixed with `VITE_` are available to browser code. Treat those values as public.

Use `.env.example` for safe example values. Keep local values in `.env.local`, and never use a `VITE_` variable for a token or other secret.

## Create a project

1. Select **Use this template** on GitHub and create a new repository from the default branch.
2. Create an Azure Static Web Apps resource and select `Other` as the deployment source.
3. Copy its Deployment Token into the GitHub Actions repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Create a working branch, make the first project change, and open a Pull Request targeting `main`.
5. Confirm that `Quality`, `Deploy`, and `Deployed smoke test` succeed.
6. Create an active branch ruleset named `Protect main` targeting the default branch.
7. Enable `Restrict deletions`, `Require a pull request before merging`, `Require status checks to pass before merging`, `Require linear history`, and `Block force pushes`.
8. Require the `Quality`, `Deploy`, and `Deployed smoke test` status checks.
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
