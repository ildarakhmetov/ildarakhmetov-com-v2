# Architecture

**Analysis Date:** 2026-04-16

## Pattern

**Style:** Static Site Generator (SSG) — data-driven templating compiled to static HTML at build time.

The site has no runtime backend. All pages are pre-rendered into `_site/` and served as flat files from GitHub Pages. There are no APIs, no databases, no auth — only client-side JavaScript for the mobile menu toggle and infinite-scroll batching on the blog page.

**Generator:** Lume 3.1.4 (Deno-native SSG) processes templates + data into HTML, runs Tailwind CSS compilation, and applies image transforms.

## Layers

```
┌─────────────────────────────────────────────────────────┐
│  Templates (Vento)                                      │
│  Root pages: index.vto, blog.vto, publications.vto, …  │
│  Layouts:    _includes/layout.vto, blog-post.vto       │
└─────────────────────────────────────────────────────────┘
              ▲                        ▲
              │ injected as            │ markdown
              │ template variables     │ rendered into
              │                        │ blog-post layout
┌─────────────────────────┐   ┌────────────────────────┐
│  Data (_data/)          │   │  Content (blog/YYYY/)  │
│  *.yaml + .bib          │   │  *.md with front-matter│
└─────────────────────────┘   └────────────────────────┘
              ▲
              │ custom loader (BibTeX → BibtexEntry[])
┌─────────────────────────┐
│  Custom Code (_lib/)    │
│  bibtex-parser.ts       │
└─────────────────────────┘
              ▲
              │ wired in
┌─────────────────────────┐
│  Configuration          │
│  _config.ts (Lume)      │
│  tailwind.config.ts     │
│  styles.css             │
└─────────────────────────┘
```

**Layer responsibilities:**

| Layer            | Path                     | Role                                                  |
|------------------|--------------------------|-------------------------------------------------------|
| Configuration    | `_config.ts`             | Plugin registration, custom loader, preprocessors     |
| Custom utilities | `_lib/`                  | TypeScript helpers (currently only BibTeX parsing)    |
| Data             | `_data/`, `_data.yml`    | Structured site data (YAML, BibTeX) and meta defaults |
| Templates        | `*.vto`, `_includes/`    | Markup with embedded data references                  |
| Content          | `blog/YYYY/*.md`         | Markdown with YAML front-matter                       |
| Assets           | `assets/`                | Static images, copied to `_site/` verbatim            |
| Output           | `_site/`                 | Build artifact (gitignored, deployed)                 |

## Data Flow

### Blog post rendering

```
blog/2025/foo.md (markdown + front-matter)
  → markdown plugin parses body → HTML
  → page.layout = "layout.vto" (resolved chain via blog-post.vto when set)
  → metas plugin applies _data.yml defaults (site name, description, image)
  → picture/transformImages plugins generate AVIF/WebP/JPG @ 480px, 768px
  → preprocess hook (in _config.ts) appends "| Ildar Akhmetov" to meta title
  → final HTML written to _site/blog/<slug>/index.html
```

### Publications (data-driven)

```
_data/publications.bib
  → bibLoader (registered in _config.ts:31)
  → BibtexParser.parseAndSortWithFormattedAuthors(content, "Akhmetov")
  → returns BibtexEntry[] sorted by year desc, with formattedAuthors[] flagging the highlighted author
  → exposed to publications.vto as {{ publications }}
  → template iterates and renders cards
```

### Home page aggregation (`index.vto`)

The home page reads multiple `_data/` sources at build time:
- `{{ teaching.universities[0].semesters[0] }}` — current semester courses
- `{{ programming.categories }}` — counts actively-used technologies
- `{{ traveling.visited.length }}` — country count
- `{{ running.marathons }}`, `{{ running.half_marathons }}` — race counts
- `{{ publications.length }}` — paper count
- `{{ search.pages("post", "date=desc", 3) }}` — three most recent blog posts via Lume's search helper

This makes `index.vto` the densest aggregator in the codebase — touching every data source.

## Entry Points

| File              | Role                                                       |
|-------------------|------------------------------------------------------------|
| `_config.ts`      | Build entry — Lume reads this to bootstrap the pipeline    |
| `index.vto`       | Site root (`/`)                                            |
| `blog.vto`        | Blog index (`/blog/`) — lists all posts with infinite scroll |
| `blog/YYYY/*.md`  | Individual post pages (`/blog/<slug>/`)                    |
| `publications.vto`, `programming.vto`, `teaching.vto`, `running.vto`, `traveling.vto` | Top-level content pages |
| `_includes/layout.vto`     | Shared HTML wrapper, nav, GA, mobile-menu JS     |
| `_includes/blog-post.vto`  | Wrapper for individual posts (extends layout)    |

## Key Abstractions

- **`BibtexEntry` interface** (`_lib/bibtex-parser.ts:4`) — typed shape for parsed BibTeX records with optional `formattedAuthors` array (each `{ name, isHighlighted }`).
- **Custom data loader** (`_config.ts:25-31`) — `bibLoader` async function registered via `site.loadData([".bib"], bibLoader)`. Lume calls it for any `.bib` file under `_data/`.
- **Preprocess hook** (`_config.ts:41-53`) — runs over all `.html` pages to append `" | Ildar Akhmetov"` to meta titles, skipping the home page.
- **Picture plugin** — auto-generates responsive `<picture>` markup for `<img transform-images="avif webp jpg 480 768">` attributes (used in `blog.vto:30`).
- **`_data.yml` defaults** — top-level meta defaults (site name, description fallback, image fallback) merged into every page via the `metas` plugin.

## Error Handling

- **No try/catch in the BibTeX loader.** A malformed `.bib` entry will surface as a parser error and halt the build (intentional fail-fast at build time).
- **Graceful template fallbacks:** `{{ if post.thumbnail }}` blocks render an emoji placeholder when missing; `{{ if post.date }}` skips the date badge if absent.
- **No runtime errors possible:** static output, no server logic.

## Cross-Cutting Concerns

- **Navigation** — Single source in `_includes/layout.vto:20-41`. Adding a section means editing this nav block.
- **SEO meta tags** — Defaults in `_data.yml`, page-specific overrides via front-matter `metas:`, title-suffix in `_config.ts` preprocess.
- **Analytics** — Google Analytics (G-TXPZSQ7489) hardcoded in `_includes/layout.vto:11-17`.
- **Responsive images** — Centralized via Lume's `picture` + `transformImages` plugins; configured per-image with `transform-images` attribute.
- **Design tokens** — All in `tailwind.config.ts` (4 neo-* colors, 2 shadow utilities). Site-wide visual changes start here.

## Build Pipeline

```
deno task build
  ↓
deno run -P=lume lume/cli.ts
  ↓
1. Load _config.ts
2. Discover *.vto, *.md, _data/* files
3. Apply plugins: tailwindcss, markdown, date, metas, picture, transformImages
4. Run custom bibLoader for *.bib
5. Render templates with data
6. Run preprocess hooks (title suffix)
7. Generate responsive image variants
8. Copy assets/ and CNAME to _site/
9. Output: _site/
```

---

*Architecture analysis: 2026-04-16*
