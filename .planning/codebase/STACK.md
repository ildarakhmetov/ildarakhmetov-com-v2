# Technology Stack

**Analysis Date:** 2026-04-16

## Languages

**Primary:**
- TypeScript - All source code, configuration, and tooling
- Vento - Templating language for page layouts (`.vto` files in `_includes/`, `*.vto` pages)
- Markdown - Blog post content (`blog/YYYY/slug.md`)
- YAML - Data files and front matter (`_data/` directory)
- BibTeX - Publication bibliography (`_data/publications.bib`)

**Styling:**
- CSS - Global styling with Tailwind integration (`styles.css`)

## Runtime

**Environment:**
- Deno 1.x (latest stable, managed via GitHub Actions `denoland/setup-deno@v2`)

**Package Manager:**
- Deno native (no npm/yarn)
- Lockfile: `deno.lock` (present, frozen mode enabled)

## Frameworks & Core Tools

**Static Site Generator:**
- Lume 3.1.4 - Core framework, imported via CDN (`https://cdn.jsdelivr.net/gh/lumeland/lume@3.1.4/`)

**Templating Runtime:**
- Vento - Embedded in Lume for template processing

**CSS Framework:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- @tailwindcss/node 4.1.18 - Node wrapper for Tailwind
- @tailwindcss/oxide 4.1.18 - Rust-based optimizer
- @tailwindcss/typography 0.5.19 - Typography plugin for blog styling

**Markdown Processing:**
- markdown-it 14.1.0 - Markdown parser
- markdown-it-attrs 4.3.1 - Attribute syntax support for markdown
- markdown-it-deflist 3.0.0 - Definition list support

**Image Processing:**
- sharp 0.34.5 - Image optimization and transformation
- @resvg/resvg-wasm 2.6.2 - SVG rendering engine (WASM)
- lightningcss-wasm 1.30.2 - CSS processing engine (WASM)
- ico-endec 0.1.6 - Icon encoding/decoding

**Build & Compilation:**
- esbuild 0.27.2 - JavaScript bundler (used by Lume)

**Utilities:**
- date-fns 4.1.0 - Date formatting and manipulation
- remove-markdown 0.6.2 - Strip markdown to plain text

**Standard Library:**
- @std/assert 1.0.16 - Test assertions
- @std/cli 1.0.25 - CLI utilities
- @std/collections 1.1.3 - Collection utilities
- @std/crypto 1.0.5 - Cryptographic functions
- @std/encoding 1.0.10 - Text encoding/decoding
- @std/fmt 1.0.8 - String formatting
- @std/front-matter 1.0.9 - Front matter parsing (YAML/TOML)
- @std/fs 1.0.21 - Filesystem operations
- @std/html 1.0.5 - HTML utilities
- @std/http 1.0.23 - HTTP server/utilities
- @std/json 1.0.2 - JSON utilities
- @std/jsonc 1.0.2 - JSON with comments
- @std/media-types 1.1.0 - MIME type handling
- @std/net 1.0.6 - Network utilities
- @std/path 1.1.4 - Path manipulation
- @std/semver 1.0.7 - Semantic versioning
- @std/streams 1.0.16 - Stream utilities
- @std/toml 1.0.11 - TOML parsing
- @std/yaml 1.0.10 - YAML parsing

## Configuration Files

**Build & Development:**
- `deno.json` - Deno configuration, import aliases, tasks
- `deno.lock` - Dependency lock file (frozen mode)
- `_config.ts` - Lume site configuration (plugins, loaders, CSS processing)
- `tailwind.config.ts` - Tailwind theme customization (neo color palette, shadows)

**Linting & Formatting:**
- `deno.json` lint configuration - Includes custom Lume lint plugin from CDN
- No separate ESLint or Prettier config (uses Deno's built-in tooling)

## Platform Requirements

**Development:**
- Deno 1.x runtime
- Node.js (optional, for edge case tooling; not required for normal workflow)

**Production:**
- Static file hosting (GitHub Pages)
- No server runtime required
- Built output: `_site/` directory

## Build Output

- **Target:** `_site/` directory (compiled HTML, CSS, assets)
- **Deployment:** GitHub Pages (via GitHub Actions)
- **Output Format:** Static HTML, optimized CSS, responsive images (AVIF, WebP, JPEG)

## Development Commands

```bash
deno task serve    # Run local dev server with hot reload
deno task build    # Build production site to _site/
deno task test     # Run Deno tests (@std/assert)
deno task lume     # Direct Lume CLI access
```

## Key Version Pins

| Package | Version | Purpose |
|---------|---------|---------|
| Lume | 3.1.4 | Core static site generator |
| Tailwind CSS | 4.1.18 | Styling engine |
| @tailwindcss/typography | 0.5.19 | Blog typography |
| Deno | 1.x | Runtime (latest managed by GH Actions) |
| markdown-it | 14.1.0 | Markdown parsing |
| sharp | 0.34.5 | Image optimization |
| date-fns | 4.1.0 | Date utilities |

## External CDN Dependencies

All Lume imports resolved via jsDelivr CDN:
- `https://cdn.jsdelivr.net/gh/lumeland/lume@3.1.4/` - Core Lume modules
- `https://cdn.jsdelivr.net/gh/oscarotero/ssx@0.1.14/jsx-runtime.ts` - SSX runtime
- `https://cdn.jsdelivr.net/gh/lumeland/cms@0.14.9/` - CMS module (imported but not used in production)

## Type Configuration

**JSX/TSX Support:**
- JSX runtime: `react-jsx`
- Import source: `lume` (custom Vento JSX handler)
- Lume type definitions: `lume/types.ts`

**Deno Unstable Features:**
- `temporal` - Temporal API support
- `fmt-component` - Component formatting

---

*Stack analysis: 2026-04-16*
