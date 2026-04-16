# Project Structure

**Analysis Date:** 2026-04-16

## Directory Layout

```
ildarakhmetov-com-v2/
├── _config.ts                  # Lume site configuration (entry point)
├── _data.yml                   # Site-wide meta defaults
├── deno.json                   # Deno tasks, imports, lint, lock config
├── deno.lock                   # Frozen dependency lock
├── tailwind.config.ts          # Theme: neo colors + custom shadows
├── styles.css                  # Global CSS + Tailwind imports
├── CNAME                       # GitHub Pages custom domain
├── README.md
├── LICENSE.md
├── CLAUDE.md                   # AI-assistant instructions
│
├── _data/                      # Structured page data (auto-loaded by Lume)
│   ├── programming.yaml        # Tech stack listing
│   ├── teaching.yaml           # Courses by semester
│   ├── running.yaml            # Race results
│   ├── traveling.yaml          # Countries visited
│   └── publications.bib        # BibTeX bibliography (custom loader)
│
├── _includes/                  # Shared Vento layouts
│   ├── layout.vto              # Main HTML wrapper (nav, GA, mobile menu)
│   └── blog-post.vto           # Blog article wrapper (extends layout)
│
├── _lib/                       # Custom TypeScript helpers
│   ├── bibtex-parser.ts        # BibTeX → BibtexEntry[] parser
│   └── bibtex-parser_test.ts   # Tests (deno task test)
│
├── blog/                       # Markdown posts organized by year
│   ├── 2020/                   # 111 posts total across years
│   ├── 2021/
│   ├── 2022/
│   ├── 2023/
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
│
├── assets/                     # Static images (copied verbatim to _site/)
│   └── img/
│       ├── ildar.jpg           # Profile photo
│       └── blog/               # Per-post thumbnails
│
├── scripts/
│   └── migrate_posts.py        # One-off migration helper (Python)
│
├── _legacy_posts/              # Pre-migration content (not built)
├── _cache/                     # Lume's image-transform cache (gitignored)
├── _site/                      # Build output (gitignored, deployed)
│
├── *.vto                       # Top-level page templates (one per route)
│   ├── index.vto               # /         — home page
│   ├── blog.vto                # /blog/    — blog index w/ infinite scroll
│   ├── publications.vto        # /publications/
│   ├── teaching.vto            # /teaching/
│   ├── programming.vto         # /programming/
│   ├── running.vto             # /running/
│   └── traveling.vto           # /traveling/
│
└── .github/workflows/
    ├── deploy.yml              # Build + deploy to GitHub Pages on push to main
    └── update-dependencies.yml # Weekly automated PR for deps
```

## Underscore Convention

Lume treats directories and files starting with `_` as **build-time-only** — not copied into `_site/`. Used for:
- `_config.ts` — config (not output)
- `_data.yml`, `_data/` — data (consumed by templates)
- `_includes/` — shared layouts
- `_lib/` — utility code
- `_site/`, `_cache/`, `_legacy_posts/` — system / build outputs

## Key File Locations

### Entry points
- **Build:** `_config.ts` — Lume reads this first.
- **Routes:** Top-level `*.vto` files map to URL paths (`blog.vto` → `/blog/`).
- **Posts:** `blog/YYYY/<slug>.md` → `/blog/<slug>/` (URL set by `url:` front-matter).

### Configuration
- `deno.json` — runtime config (`compilerOptions`, `tasks`, `permissions`, `lock`, `lint`)
- `_config.ts` — Lume plugins, custom loader, preprocess hook
- `tailwind.config.ts` — design tokens (neo-yellow, neo-pink, neo-blue, neo-green; shadow-neo, shadow-neo-lg)
- `_data.yml` — global meta defaults
- `styles.css` — Tailwind directive imports + any global rules

### Code & tests
- `_lib/bibtex-parser.ts` — BibTeX parsing, author formatting, year sorting
- `_lib/bibtex-parser_test.ts` — 19 test cases (`deno task test`)
- `scripts/migrate_posts.py` — Python helper used during the v1 → v2 content migration; not part of the build

### Content
- Blog posts: `blog/YYYY/<slug>.md`
- Publications: `_data/publications.bib`
- Page data: `_data/*.yaml`
- Images: `assets/img/blog/<filename>` (referenced as `/assets/img/blog/<filename>` in front-matter)

### CI/CD
- `.github/workflows/deploy.yml` — production deploy
- `.github/workflows/update-dependencies.yml` — weekly dep updates

## Naming Conventions

| Artifact          | Convention                          | Example                          |
|-------------------|-------------------------------------|----------------------------------|
| TypeScript file   | `kebab-case.ts`                     | `bibtex-parser.ts`               |
| Test file         | `kebab-case_test.ts`                | `bibtex-parser_test.ts`          |
| Vento template    | `kebab-case.vto`                    | `blog-post.vto`                  |
| Blog post         | `blog/YYYY/kebab-case.md`           | `blog/2025/my-post.md`           |
| Data file         | `lowercase.yaml` (matches var name) | `programming.yaml` → `{{ programming }}` |
| Asset             | `kebab-case.<ext>`                  | `assets/img/blog/foo.jpg`        |
| Lume special dir  | leading underscore                  | `_includes/`, `_data/`           |

## Where to Add New Things

| Task                     | Where                                                |
|--------------------------|------------------------------------------------------|
| New blog post            | `blog/YYYY/<slug>.md` with required front-matter     |
| New blog thumbnail       | `assets/img/blog/<filename>.jpg`                     |
| New publication          | Append entry to `_data/publications.bib`             |
| New tech stack item      | Edit `_data/programming.yaml`                        |
| New course               | Edit `_data/teaching.yaml`                           |
| New race result          | Edit `_data/running.yaml`                            |
| New country              | Edit `_data/traveling.yaml`                          |
| New top-level page       | Create `<slug>.vto` at root with `layout: layout.vto` |
| New nav link             | Edit `_includes/layout.vto:31-39`                    |
| New Lume plugin          | `import` + `site.use()` in `_config.ts`              |
| New design token         | `tailwind.config.ts` `theme.extend`                  |
| New shared utility       | `_lib/<name>.ts` + `_lib/<name>_test.ts`             |

## Required Blog Post Front-Matter

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

The `url:` field overrides Lume's default routing — without it, posts would land at `/blog/YYYY/<slug>/`.

## Build Output

- `_site/` is the deployable artifact. Gitignored. Generated by `deno task build`.
- `_cache/` holds transformed images between builds. Gitignored.

---

*Structure analysis: 2026-04-16*
