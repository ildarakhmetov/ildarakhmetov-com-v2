# CLAUDE.md

This file provides context for AI assistants working on the ildarakhmetov.com personal website.

## Project Overview

Personal portfolio website for Ildar Akhmetov — educator, builder, and technology leader. Built with Deno + Lume (static site generator) and deployed to GitHub Pages at https://ildarakhmetov.com/.

## Tech Stack

- **Runtime:** Deno
- **Static Site Generator:** Lume 3.1.4
- **Templating:** Vento (`.vto` files)
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Testing:** Deno's native test runner
- **Deployment:** GitHub Pages (automated via GitHub Actions)

## Development Commands

```bash
deno task serve    # Local dev server with watch mode
deno task build    # Production build to _site/
deno task test     # Run tests (BibTeX parser)
deno task lume     # Run Lume CLI directly
```

## Repository Structure

```
ildarakhmetov-com-v2/
├── _config.ts          # Lume site configuration (plugins, loaders, transforms)
├── deno.json           # Deno tasks, imports, compiler options
├── tailwind.config.ts  # Tailwind theme (neo colors, shadows)
├── styles.css          # Global CSS (imports Tailwind + Typography)
├── _data/              # YAML + BibTeX data files
│   ├── programming.yaml
│   ├── teaching.yaml
│   ├── running.yaml
│   ├── traveling.yaml
│   └── publications.bib
├── _includes/          # Shared Vento layout templates
│   ├── layout.vto      # Main HTML wrapper with nav
│   └── blog-post.vto   # Blog article layout
├── _lib/               # Custom TypeScript utilities
│   ├── bibtex-parser.ts
│   └── bibtex-parser_test.ts
├── assets/             # Static assets (images)
├── blog/               # Markdown blog posts (organized by year)
│   └── YYYY/slug.md
├── *.vto               # Top-level page templates
│   ├── index.vto
│   ├── blog.vto
│   ├── programming.vto
│   ├── publications.vto
│   ├── teaching.vto
│   ├── running.vto
│   └── traveling.vto
└── .github/workflows/  # CI/CD (deploy + dependency updates)
```

## Key Conventions

### File Naming
- Templates and pages: `kebab-case.vto`
- Blog posts: `blog/YYYY/kebab-case-title.md`
- TypeScript files: `kebab-case.ts`, test files: `kebab-case_test.ts`

### Blog Post Front Matter
Every blog post in `blog/YYYY/` requires this front matter:
```yaml
---
title: Post Title
date: YYYY-MM-DD
description: One-sentence summary for SEO and previews.
tags: [tag1, tag2]
categories: [Category]
thumbnail: /assets/img/blog/image-name.jpg
url: /blog/slug/
---
```

### Page Templates (Vento)
- All pages must use `layout: layout.vto` in front matter
- Pages access `_data/` files by variable name matching the file name (e.g., `programming.yaml` → `{{ programming }}`)
- Lume passes data files as template variables automatically

### Design System
The site uses a **neomorphic/retro** visual style:
- **Borders:** `border-4 border-black` (thick, no rounding)
- **Shadows:** `shadow-neo` or `shadow-neo-lg` (custom Tailwind utilities)
- **Colors:** Custom `neo-yellow`, `neo-pink`, `neo-blue`, `neo-green` palette
- **Typography:** Heavy weights (`font-black`, `font-bold`)
- Avoid `rounded-*` classes — the design intentionally uses sharp corners

### Image Optimization
- Place blog images in `assets/img/blog/`
- Lume's `picture` plugin auto-generates responsive formats (avif, webp, jpg) at 480px and 768px widths
- Reference images in front matter as `thumbnail: /assets/img/blog/filename.jpg`

## Data Layer

### YAML Files (`_data/`)
Structured data powering non-blog pages. Edit these to update content:
- `programming.yaml` — Tech stack entries with name, icon, status
- `teaching.yaml` — University courses organized by semester
- `running.yaml` — Race results (marathons, half-marathons)
- `traveling.yaml` — Countries visited with years

### Publications (`_data/publications.bib`)
BibTeX format. The custom loader in `_config.ts` parses this via `_lib/bibtex-parser.ts` and highlights the author's name ("Akhmetov, I." / "Akhmetov, Ildar") with bold styling.

## Custom BibTeX Parser (`_lib/bibtex-parser.ts`)
- Parses `.bib` files into structured `BibEntry[]` objects
- Formats author names: "LastName, F." style
- Highlights a target author name in the rendered HTML
- Sorts entries by year (descending)
- Tests in `_lib/bibtex-parser_test.ts` — run with `deno task test`

## Environment Variables

| Variable   | Default                      | Purpose                         |
|------------|------------------------------|---------------------------------|
| `SITE_URL` | `https://ildarakhmetov.com/` | Full base URL for the site |

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:
1. Builds the site with `deno task build`
2. Deploys `_site/` to GitHub Pages

The `CNAME` file at the repo root sets the custom domain.

## Lume Configuration (`_config.ts`)

Key behaviors configured here:
- **Plugins:** `tailwindcss`, `markdown`, `date`, `metas`, `picture`, `transformImages`
- **Custom loader:** `publications.bib` loaded via BibTeX parser
- **Image transforms:** responsive widths (480, 768), formats (avif, webp, jpg)
- **Site URL:** reads from `SITE_URL` env var

When adding new Lume plugins or loaders, modify `_config.ts`.

## Adding Content

### New Blog Post
1. Create `blog/YYYY/slug.md` with required front matter (see above)
2. Add thumbnail image to `assets/img/blog/` if needed
3. Run `deno task serve` to preview

### New 256tipsdev Tip

Tips live in `256tipsdev/<slug>.md` and use `layout: tip.vto`. New tips ship roughly **biweekly**. Full procedure:

1. **Create the file** `256tipsdev/<slug>.md`. The filename slug **must equal** the `url` slug — `_config.ts` auto-derives each tip's `og:image` from its url (`/assets/img/og/tips/<slug>.jpg`), and the card renderer keys off the filename, so a mismatch breaks the social card. Front matter:
   ```yaml
   ---
   layout: tip.vto
   title: "Tip Title in Title Case"
   tip_number: 8
   date: 2026-06-10 12:00:00
   description: "One-sentence summary (SEO + the tip's own OG description)."
   tags:
   - tip            # always include `tip` — that's how pages are found
   - career         # plus topical tags
   url: /256tipsdev/<slug>/
   ---
   ```
   - **`tip_number`** (0–255) is the tip's fixed *identity*, **not** its publish order. It only decides which cell the tip occupies in the 16×16 grid on the archive page. Use the number the user gives.
   - **`date`** controls actual publish order — it drives the site's prev/next nav and the archive's "shipped" count. Use today's date (or the user's stated date).
   - **Omit `youtube_url` at creation.** The YouTube Short is published separately; the link is added in a *later, dedicated commit* (e.g. "add YouTube short link to tip N") once it's live.
   - Body is plain markdown.
   - **Cross-link other tips.** Tips are cross-listed: whenever the body mentions another tip (e.g. "see Tip 176"), make it a markdown link to that tip's `url` — `[Tip 176](/256tipsdev/build-software-to-solve-your-own-problems/)`. Scan the body for any such references and find the target by its `tip_number` in `256tipsdev/*.md`. If the referenced tip doesn't exist yet, leave it as plain text (it can be linked once that tip ships).

2. **Regenerate the two affected OG cards** (requires headless `google-chrome` **and** ImageMagick's `magick` on PATH):
   ```bash
   deno task tip-cards <slug>   # per-tip card → assets/img/og/tips/<slug>.jpg
   deno task archive-card       # catalog grid → assets/img/og/256tipsdev.jpg
   ```
   - Pass the slug to `tip-cards` to render **only the new tip** — omitting it re-renders every tip card.
   - Always run `archive-card` too: adding a tip changes the shipped/remaining counts and shifts the three "coming soon" teaser cells (computed by bit-reversal of the tip count).
   - Commit both generated JPGs alongside the new `.md`.

3. Preview with `deno task serve`.

### New Publication
Add a BibTeX entry to `_data/publications.bib`. The parser handles rendering automatically.

### New Data Page Entry
Edit the relevant YAML file in `_data/` and update the corresponding `.vto` template if new fields are added.

## Open Graph Social Cards

Per-page social-share cards (LinkedIn, X, iMessage previews) are wired through Lume's `metas` plugin via `_data.yml`. The home page has a purpose-built **1200×630** card at `assets/img/og/home.jpg`, rendered from a source HTML template at `_og/home.html`.

**If you change the home page hero (name, headshot, tagline), you MUST regenerate the OG card:**

```bash
deno task og
```

The task screenshots `_og/home.html` via headless Chrome (oversized to 1200×720 to work around Chrome's headless-mode chrome reservation), crops to 1200×630, and writes an optimized JPG. The source HTML is the source of truth — edit `_og/home.html` if the design needs to change, then re-run `deno task og` and commit the resulting JPG.

Other pages currently get the default fallback description and no image; to give one a custom card, set `thumbnail:` in its front matter (Lume's metas plugin maps this to `og:image`).

## Dependency Management

Dependencies are locked in `deno.lock`. The `.github/workflows/update-dependencies.yml` workflow runs weekly to create automated PRs for updates.

To update manually:
```bash
deno cache --reload _config.ts
```
