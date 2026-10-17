# WikiClub Tech-UU

Official website for WikiClub Tech-UU at United University.

## Repository structure

```text
.github/workflows/     # GitHub Pages deployment workflow
app/                   # Next.js App Router pages and routes
components/            # Shared UI and feature components
data/                  # Site content and team data
lib/                   # Shared helpers
public/                # Static assets, blog images, team images and site metadata
types/                 # Shared TypeScript types
utils/                 # Domain-specific utilities

next.config.ts         # Next.js static-export configuration
tsconfig.json          # TypeScript configuration
package.json           # Project scripts and dependencies
```

The repository intentionally keeps a single canonical source tree at the project root. Legacy duplicate `src/` content and duplicate root-level copies of assets are not used.

## Current Teams page

The `/teams` page contains the current WikiClub Tech-UU 2026–27 team, including:

- Campus Envoys
- Mentors
- Team Leads
- Volunteers
- Previous team archive: **Wikiclub Tech-UU 2025-26**

The current Teams layout keeps Campus Envoys centered, Mentors in broad horizontal cards, and Volunteers in a compact five-column desktop grid.

## Development

```bash
npm ci
npm run dev
```

Production/static build:

```bash
npm run build
```

## GitHub Pages

The project is configured for a static Next.js export and GitHub Pages deployment at:

`https://mishraji0519.github.io/teams-pages/`

The repository's Pages source must be set to **GitHub Actions** under **Settings → Pages → Build and deployment** before the deployment workflow can publish the site.

## Notes

- Next.js static export is enabled in `next.config.ts`.
- GitHub Pages builds temporarily exclude the server API routes because Pages is static hosting.
- `@/*` imports resolve from the repository root.
