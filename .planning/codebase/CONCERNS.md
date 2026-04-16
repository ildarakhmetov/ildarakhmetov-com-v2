# Concerns

**Analysis Date:** 2026-04-16

This is a small, low-traffic personal site. Most of the codebase is well-structured and the security/risk surface is intentionally minimal (no backend, no user input, no auth). The concerns below are real but mostly low-impact — none are blocking.

## Bugs

### Malformed BibTeX entry — last publication

**Severity:** High (build hazard)
**Location:** `_data/publications.bib:123`

The last entry has `year={2025}.` (period) instead of `year={2025},` (comma):

```bibtex
@inproceedings{kucera2025adapting,
  ...
  year={2025}.        # ← BUG: should be ","
  url={https://dl.acm.org/...}
}
```

**Impact:** The field-pattern regex in `BibtexParser.parseFields()` (`_lib/bibtex-parser.ts:106`) requires a `,` (or end-of-entry brace) to terminate values. With the trailing period, the `url` field for this single entry won't parse, so the publication card on `/publications/` won't be a clickable link. The build still succeeds — the parser silently skips the malformed field rather than throwing.

**Fix:** One-character change in `_data/publications.bib`.

## Tech Debt

### Custom BibTeX parser instead of a library

**Severity:** Low
**Location:** `_lib/bibtex-parser.ts`

A hand-rolled parser handles a narrow subset of BibTeX. It works for the current `publications.bib` (15 entries) but doesn't handle:
- Nested braces in field values (`title={Foo {Bar} Baz}`) — `parseFields` regex `\{([^}]*)\}` stops at the first `}`.
- LaTeX commands and accents (`{\'e}`, `\textit{...}`).
- BibTeX comments (`% ...`) and `@string{}` abbreviations.
- Author names with suffixes / "van der" prefixes.

**Impact:** Future entries pasted from publishers may need manual cleanup. Switching to a library (e.g. `@retorquere/bibtex-parser`) would reduce risk but adds a dependency for a small win — fine to defer until it actually breaks.

### No build-time validation of front-matter

**Severity:** Low
**Location:** All `blog/YYYY/*.md`

Blog posts require a `url:` field (per `CLAUDE.md`) — without it, Lume routes the post under `/blog/YYYY/<slug>/`, which silently breaks the convention. There's no schema check. Same for `date:` format and `thumbnail:` path validity.

**Impact:** A typo'd blog post yields the wrong URL or a missing thumbnail in production with no warning.

### Inline JavaScript without tests

**Severity:** Low
**Location:** `_includes/layout.vto:43-61` (mobile menu), `blog.vto:78-162` (infinite scroll)

Both pieces of browser JS are written inline in `.vto` templates. No tests, no extraction. The infinite-scroll IIFE is ~85 lines and uses `IntersectionObserver` with a 300ms `setTimeout` for "better UX" — works, but fragile to change.

**Impact:** Refactor risk. If either feature breaks, there's no automated signal.

## Accessibility

### Mobile menu lacks `aria-expanded` and keyboard cues

**Severity:** Medium
**Location:** `_includes/layout.vto:25` and toggle JS at `:43-61`

The hamburger button has `aria-label="Toggle menu"` but the toggle JS only swaps `hidden` ↔ `flex` — `aria-expanded` is never updated, so screen readers can't tell whether the menu is open. Also, the menu opens on `click` only; there's no escape-to-close, no focus management.

**Fix:** Add `aria-expanded="false"` initially, toggle alongside the class swap, and consider focus trap when open.

### Color-contrast not formally audited

**Severity:** Low–Medium
**Location:** `tailwind.config.ts:11-16` (neo color palette)

The neo colors (`#FDE047` yellow, `#F472B6` pink, `#60A5FA` blue, `#4ADE80` green) are used as backgrounds with black text and as button fills. WCAG AA compliance hasn't been verified for all combinations. Most likely fine — black-on-yellow is a high-contrast classic — but the `opacity-75` and `opacity-60` utilities used for secondary text reduce contrast below the base.

### Missing `:focus-visible` styles

The neo design relies on `hover:shadow-neo` for affordance but doesn't define matching `focus-visible:` states for keyboard navigation.

## Security

### Surface area is minimal

This is a static site deployed to GitHub Pages with no backend, no forms, no user input, no cookies (other than Google Analytics), and no authenticated routes. XSS surface comes only from:
- Markdown blog content (author-controlled, not user input)
- BibTeX field values rendered into HTML (also author-controlled)

Both are first-party content, so the practical XSS risk is near zero.

### Hardcoded GA tracking ID

**Location:** `_includes/layout.vto:11-17`

The Google Analytics ID `G-TXPZSQ7489` is committed in plaintext. This is normal for client-side analytics and not a secret, but worth noting if the site is ever forked or templated.

### No CSP, HSTS via host

GitHub Pages handles HTTPS and HSTS. There's no Content-Security-Policy header (GitHub Pages doesn't allow custom headers easily). For a static personal site this is acceptable.

## Performance

### Image processing volume

**Location:** `assets/img/` (~102 files)

Lume's `picture` plugin generates AVIF + WebP + JPG at 480px and 768px for each transformed image — that's up to 6 outputs per source. Build times scale with the image count. The `_cache/` directory mitigates this on incremental builds.

### Infinite scroll on `blog.vto`

The blog index renders all 111 post cards into the DOM up-front, then JavaScript hides all but the first 12 and reveals more on scroll. This means:
- Larger HTML payload than necessary on first load.
- All post thumbnails are referenced (though `loading="lazy"` defers their fetch).

For 111 posts this is fine; if the count grows substantially, consider true pagination or server-side batching.

## Dependency Management

### Locked + auto-updated

**Location:** `deno.lock`, `.github/workflows/update-dependencies.yml`

`deno.lock` is in `frozen: true` mode (`deno.json:73-76`) — exact dependency versions enforced at build time. Automated weekly PR updates the lock. Solid practice.

### CDN-resolved Lume

**Location:** `deno.json:3`

Lume is loaded from `https://cdn.jsdelivr.net/gh/lumeland/lume@3.1.4/`. If jsDelivr is unreachable or yanks the version, builds break. Standard Deno pattern; tradeoff is convenience vs. supply-chain dependence.

## Deployment

### No CI gate

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. There's no test step, no lint step, no preview environment. A red `deno task test` does not block deployment.

**Impact:** Bugs reach production immediately. For a personal site with one author, this is a defensible tradeoff — but it's worth knowing.

### `SITE_URL` defaults silently

**Location:** `_config.ts:11`

`Deno.env.get("SITE_URL") || "https://ildarakhmetov.com/"` — if the env var is unset locally, the build still produces production-targeted URLs in metas and sitemap-style fields. Not catastrophic; just silent.

## Missing Features (nice-to-have)

- No RSS feed (the blog is content-driven; an RSS feed would be expected by readers)
- No sitemap.xml (Lume has a `sitemap` plugin not currently registered)
- No custom 404 page (GitHub Pages default applies)

---

## Summary

| Concern                                          | Severity | Action                |
|--------------------------------------------------|----------|-----------------------|
| Malformed BibTeX in `publications.bib:123`       | High     | One-char fix          |
| Mobile menu `aria-expanded` / focus              | Medium   | Quick a11y improvement |
| BibTeX parser edge cases                         | Low      | Defer until breaks    |
| No front-matter validation                       | Low      | Defer                 |
| Inline JS without tests                          | Low      | Acceptable for size   |
| No CI test gate                                  | Low      | Acceptable for solo project |
| Missing RSS / sitemap                            | Low      | Backlog               |

---

*Concerns analysis: 2026-04-16*
