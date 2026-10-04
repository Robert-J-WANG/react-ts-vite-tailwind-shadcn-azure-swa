# React + TypeScript + Vite + Azure Static Web Apps Template

## Technical Design

Repository: `react-ts-vite-azure-swa`

## 1. Purpose

This repository provides a reusable engineering foundation for projects using React, TypeScript, Vite, and Azure Static Web Apps.

Projects using this stack start with project scaffolding, TypeScript and Vite configuration, automated testing, routing, quality checks, and delivery workflows already present in the repository. Each new repository supplies only its own Azure resource, deployment secret, and GitHub ruleset.

This is an engineering foundation only. It contains no product-specific code and no reusable UI design.

## 2. Included foundation

- React and React DOM;
- TypeScript in strict mode;
- Vite;
- ESLint;
- npm with a committed `package-lock.json`;
- Node.js 24 for local development and CI;
- `@/` as the alias for `src/`;
- React Router;
- minimal placeholder routes required to verify routing, 404, and error handling;
- Vitest with jsdom;
- React Testing Library and `jest-dom`;
- Playwright with Chromium;
- local and deployed Playwright targets through `PLAYWRIGHT_BASE_URL`;
- Azure Static Web Apps SPA fallback and response headers;
- GitHub Actions for Pull Request and Production delivery.

## 3. Excluded content

- visual design, component libraries, reusable UI components, and application styling;
- product-specific copy, branding, routes, domain components, data, and services;
- Azure Functions or an application API;
- authentication, database, analytics, and monitoring integrations;
- real Azure resource identifiers, URLs, tokens, or secrets;
- project planning documents and learning notes.

Placeholder route content exists only to keep the template runnable and testable. It is not a UI implementation.

## 4. New project starting point

A new project starts by selecting **Use this template** and creating a new GitHub repository from the template's default branch. The new repository contains the template files and starts with its own project history.

Complete the following repository-specific setup before merging the first project change:

1. Create an Azure Static Web Apps resource for the new repository and select `Other` as the deployment source so Azure does not generate another workflow.
2. Copy the resource's Deployment Token into the new repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
3. Create a working branch from `main`, make the first project change, and open a Pull Request targeting `main`.
4. Confirm that `Quality`, `Deploy`, and `Deployed smoke test` succeed on that Pull Request.
5. Create and activate the `Protect main` branch ruleset described in Section 9.4, targeting the default branch.
6. Confirm that the ruleset requires `Quality`, `Deploy`, and `Deployed smoke test` and allows only Squash merging.
7. Confirm that the Pull Request remains ready to merge after the ruleset becomes active.
8. Squash Merge the Pull Request and confirm that `Production deploy` and `Production smoke test` succeed.

The project files and workflows come from the template. The Azure resource, repository secret, and ruleset belong to the new repository and must be configured there.

## 5. Repository structure

```text
react-ts-vite-azure-swa/
├── .github/
│   └── workflows/
│       ├── pull-request.yml
│       └── production.yml
├── docs/
│   └── TECHNICAL_DESIGN.md
├── public/
│   └── staticwebapp.config.json
├── src/
│   ├── app/
│   │   ├── router/
│   │   │   ├── router.ts
│   │   │   ├── routes.test.tsx
│   │   │   └── routes.tsx
│   │   └── App.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SecondaryPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── RouteErrorPage.tsx
│   ├── test/
│   │   └── setup.ts
│   └── main.tsx
├── tests/
│   └── e2e/
│       └── app.spec.ts
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 6. Application and configuration baseline

The application uses this entry chain:

```text
index.html
→ src/main.tsx
→ src/app/App.tsx
→ RouterProvider
→ router.ts
→ routes.tsx
→ current route or RouteErrorPage
```

The route table contains:

```text
/           → HomePage
/secondary  → SecondaryPage
*           → NotFoundPage
route error → RouteErrorPage
```

The two ordinary routes provide only enough content and navigation to verify client-side routing. The not-found route verifies unknown URLs. The error boundary handles unexpected route errors without exposing internal details.

TypeScript retains Vite's project-reference structure:

- `tsconfig.app.json` covers application source;
- `tsconfig.node.json` covers configuration and browser-test TypeScript;
- `tsconfig.json` references both projects;
- strict checking remains enabled;
- `@/*` resolves to `src/*` in TypeScript and Vite.

The production build remains:

```text
tsc -b → vite build → dist/
```

ESLint uses the official Vite React TypeScript flat configuration.

Only intentionally public browser variables use the `VITE_` prefix. `.env.local` remains ignored, and `.env.example` contains names and safe example values only.

## 7. Tests and scripts

Vitest uses the Vite configuration, the `jsdom` environment, and `src/test/setup.ts`. The setup installs `jest-dom` matchers and performs React Testing Library cleanup after each test.

Route tests verify:

- the home route;
- the secondary route;
- an unknown path rendering the not-found page;
- a deliberately throwing route rendering the route-error page.

Playwright is configured as follows:

- tests live in `tests/e2e`;
- Chromium is the initial browser;
- tests run fully in parallel;
- list and HTML reporters are enabled;
- the HTML report does not open automatically;
- traces are retained on failure;
- local tests start Vite at `http://127.0.0.1:5173`;
- an existing local server may be reused;
- when `PLAYWRIGHT_BASE_URL` is set, tests use that deployed URL and do not start Vite.

The browser tests verify loading the home route, navigating to the secondary route, and directly opening an unknown URL.

The package scripts are:

| Script | Command |
| --- | --- |
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `lint` | `eslint .` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |
| `test:e2e` | `playwright test` |
| `check` | `npm run lint && npm run test && npm run build && npm run test:e2e` |
| `preview` | `vite preview` |

## 8. Azure Static Web Apps configuration

`public/staticwebapp.config.json` provides SPA navigation fallback and basic response headers:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*"]
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
}
```

Vite copies this file to `dist/staticwebapp.config.json`. Direct access and refresh on `/secondary` verify the SPA fallback after deployment.

## 9. GitHub Actions

The repository must provide an Azure Static Web Apps resource and its deployment secret before the delivery workflows run:

```text
AZURE_STATIC_WEB_APPS_API_TOKEN
```

### 9.1 Pull Request delivery

For Pull Requests targeting `main`, the `opened`, `synchronize`, and `reopened` events run:

```text
Quality
→ checkout
→ Node.js 24
→ npm ci
→ install Chromium with system dependencies
→ npm run check
→ upload frontend-dist

Deploy
→ wait for Quality
→ download frontend-dist into dist
→ Azure upload with skip_app_build: true
→ expose preview_url

Deployed smoke test
→ wait for Deploy
→ set PLAYWRIGHT_BASE_URL from preview_url
→ checkout pull request
→ Node.js 24
→ npm ci
→ install Chromium with system dependencies
→ fail if the deployed URL is empty
→ npm run test:e2e
```

`frontend-dist` is retained for one day. Playwright diagnostics are uploaded on failure and retained for seven days.

The Pull Request `closed` event runs only:

```text
Close Preview
→ Azure action: close
```

### 9.2 Production delivery

A push to `main` runs:

```text
Production deploy
→ checkout main
→ Node.js 24
→ npm ci
→ npm run build
→ Azure upload from dist with skip_app_build: true
→ expose production_url

Production smoke test
→ wait for Production deploy
→ set PLAYWRIGHT_BASE_URL from production_url
→ checkout main
→ Node.js 24
→ npm ci
→ install Chromium with system dependencies
→ fail if the deployed URL is empty
→ npm run test:e2e
→ upload Playwright diagnostics on failure
```

Playwright diagnostics are retained for seven days. Production rebuilds from the current `main` commit instead of reusing a Pull Request artifact.

### 9.3 Required checks

After the Pull Request workflow has produced these successful checks, the `main` ruleset requires exactly:

```text
Quality
Deploy
Deployed smoke test
```

`Close Preview` and the Production jobs are not Pull Request required checks.

### 9.4 Default-branch ruleset

Each repository created from the template configures its own branch ruleset with these settings:

- Ruleset name: `Protect main`;
- enforcement status: `Active`;
- target: the repository's default branch;
- bypass list: empty;
- `Restrict deletions`: enabled;
- `Block force pushes`: enabled;
- `Require linear history`: enabled;
- `Require a pull request before merging`: enabled;
- required approvals: `0`;
- additional review requirements: disabled;
- allowed merge methods: `Squash` only;
- `Require status checks to pass`: enabled;
- `Require branches to be up to date before merging`: disabled;
- `Do not require status checks on creation`: disabled;
- required status checks: `Quality`, `Deploy`, and `Deployed smoke test`.

Ruleset IDs, repository identifiers, and status-check integration IDs are repository-specific and are not part of the reusable configuration.

## 10. Security boundaries

- No real deployment token, deployed application URL, or Azure resource identifier is committed.
- The Azure token is stored in the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub Actions secret.
- The token is passed only to the Azure deployment action.
- The token never uses a `VITE_` prefix and never enters the browser build.
- CI installs dependencies from the committed lockfile with `npm ci`.
- Workflow permissions remain `contents: read`.
- Build output and workflow artifacts contain no environment files or secret values.

## 11. Acceptance criteria

The template is complete when the following criteria pass:

- the project is based on the official Vite `react-ts` scaffold;
- product-specific code and UI implementation are absent;
- strict TypeScript and the `@/` alias work;
- ordinary, not-found, and error routes behave correctly;
- `npm run lint`, `npm run test`, `npm run build`, `npm run test:e2e`, and `npm run check` pass;
- `dist/staticwebapp.config.json` exists after the build;
- the Azure Static Web Apps resource uses `Other` as its deployment source;
- the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub Actions repository secret is configured;
- Pull Request Quality, Deploy, and Deployed smoke test succeed;
- the deployed Preview supports direct access and refresh on a client route;
- closing or merging the Pull Request removes its Preview;
- Production deploy and Production smoke test succeed from the current `main` commit;
- an active `Protect main` ruleset targets the default branch;
- the ruleset restricts deletions, requires Pull Requests and linear history, and blocks force pushes;
- the ruleset has no bypass actors or approval requirement and permits only Squash merging;
- the ruleset requires `Quality`, `Deploy`, and `Deployed smoke test` without requiring the branch to be up to date before merging.
