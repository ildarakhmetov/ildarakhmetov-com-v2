# External Integrations

**Analysis Date:** 2026-04-16

## APIs & External Services

**None explicitly used in production code.**

- The site does not integrate with third-party APIs
- No authentication services (auth0, Firebase, etc.)
- No real-time data sources
- No analytics/tracking platforms
- Lume's CMS module (`lume/cms/`) is imported but not actively used

## Data Storage

**Databases:**
- None. Data is static and commit-based.
  - Source of truth: Git repository
  - Build time: Data loaded from YAML files (`_data/programming.yaml`, `_data/teaching.yaml`, `_data/running.yaml`, `_data/traveling.yaml`)
  - BibTeX publications: Loaded from `_data/publications.bib` via custom parser in `_lib/bibtex-parser.ts`

**File Storage:**
- Local filesystem only
  - Static assets: `assets/` directory
  - Blog images: `assets/img/blog/`
  - Output: `_site/` directory (build artifact, not committed)

**Caching:**
- None required (static site). Browser caching via standard HTTP headers (managed by GitHub Pages).

## Authentication & Identity

**Auth Provider:**
- Custom implementation: GitHub authentication for deployment only
  - Uses GitHub Actions default `GITHUB_TOKEN` (automatic)
  - No user authentication in the site itself (static site)

## Monitoring & Observability

**Error Tracking:**
- None. No runtime errors possible (static HTML output).

**Logs:**
- GitHub Actions logs only (visible in `.github/workflows/`)
- No external log aggregation
- Build output logged to workflow console

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (https://ildarakhmetov.com/)
  - Custom domain: `ildarakhmetov.com` (configured in `CNAME` file)
  - Automatic deployment from `main` branch

**CI Pipeline:**
- GitHub Actions (`.github/workflows/`)
  - **Deploy workflow** (`.github/workflows/deploy.yml`):
    1. Trigger: Pushes to `main` branch
    2. Jobs: test → build → deploy to GitHub Pages
    3. Deployment: Uses `actions/deploy-pages@v4`
  
  - **Dependency update workflow** (`.github/workflows/update-dependencies.yml`):
    1. Schedule: Weekly (Mondays 9 AM UTC)
    2. Manual trigger: `workflow_dispatch`
    3. Process: Check outdated → update → test → create PR
    4. Output: Automated PR with dependency updates (using `peter-evans/create-pull-request@v7`)

**Actions Used:**
- `actions/checkout@v6` - Clone repository
- `denoland/setup-deno@v2` - Setup Deno runtime
- `actions/configure-pages@v5` - Configure GitHub Pages
- `actions/upload-pages-artifact@v4` - Upload build artifact to Pages
- `actions/deploy-pages@v4` - Deploy to GitHub Pages
- `peter-evans/create-pull-request@v7` - Create dependency update PRs

## Environment Configuration

**Required Environment Variables:**
- `SITE_URL` (optional) - Base URL for the site
  - Default: `https://ildarakhmetov.com/`
  - Used in: `_config.ts` (line 11)
  - Purpose: Sets site location in Lume config for correct link generation

**Secrets:**
- None required for build/deploy (GitHub Actions uses default `GITHUB_TOKEN`)
- No API keys, database credentials, or third-party service secrets

**Configuration Files:**
- `CNAME` - GitHub Pages custom domain configuration (contains: `ildarakhmetov.com`)

## Webhooks & Callbacks

**Incoming:**
- None. No external services push data to this repository.

**Outgoing:**
- GitHub Pages deployment notifications (to GitHub)
- GitHub Actions workflow completion notifications (internal to GitHub)
- No external webhooks triggered

## Content Delivery

**CDN:**
- GitHub Pages CDN for static asset distribution
- jsDelivr CDN for importing Lume modules (build time only, not runtime)

**Image Optimization:**
- Build-time optimization via Sharp 0.34.5
- Output formats: AVIF, WebP, JPEG (responsive widths: 480px, 768px)
- Configured in `_config.ts` via `transformImages` plugin

## Git Hosting & Version Control

**Repository:**
- GitHub (public)
- Branch strategy: `main` branch for deployment
- Pull requests for dependency updates (automated)

**Integration with GitHub:**
- Automatic workflows on push
- No third-party GitHub App integrations
- Uses native GitHub Actions only

## Domain & DNS

**Domain:**
- `ildarakhmetov.com` (custom domain)
- Provider: Not specified in codebase (external)
- Configured via `CNAME` file (GitHub Pages expects this)

**DNS Configuration:**
- Must be configured externally to point to GitHub Pages IP addresses
- File-based CNAME: `ildarakhmetov.com` (in repository root)

## Security & Permissions

**GitHub Actions Permissions** (`.github/workflows/deploy.yml`):
```
permissions:
  contents: read       # Can read repository contents
  pages: write         # Can deploy to GitHub Pages
  id-token: write      # Can write OIDC token for Pages deployment
```

**Dependency Update Permissions** (`.github/workflows/update-dependencies.yml`):
```
permissions:
  contents: write      # Can write commits
  pull-requests: write # Can create pull requests
```

## No External Service Dependencies

**Absent from this codebase:**
- No API clients (Stripe, SendGrid, etc.)
- No database ORMs or connectors
- No authentication libraries (Passport, Auth0, etc.)
- No logging services (Datadog, LogRocket, etc.)
- No CDN providers (Cloudflare, CloudFront, etc.)
- No email services
- No form handlers
- No payments processors
- No social media integrations
- No analytics platforms (Google Analytics, Segment, etc.)
- No monitoring services (Sentry, New Relic, etc.)

This is a **self-contained static site** with minimal external dependencies.

---

*Integration audit: 2026-04-16*
