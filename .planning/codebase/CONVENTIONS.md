# Coding Conventions

**Analysis Date:** 2026-04-16

## Naming Patterns

**Files:**
- TypeScript files: `kebab-case.ts` (e.g., `bibtex-parser.ts`)
- Test files: `kebab-case_test.ts` (e.g., `bibtex-parser_test.ts`)
- Vento templates: `kebab-case.vto` (e.g., `blog-post.vto`)
- Markdown blog posts: `kebab-case-title.md` organized in `blog/YYYY/` directories
- Configuration files: `kebab-case.config.ts` or `kebab-case.ts` (e.g., `tailwind.config.ts`, `_config.ts`)

**Functions:**
- Static methods in classes: `camelCase` (e.g., `BibtexParser.parse()`, `BibtexParser.formatAuthors()`)
- Private methods prefixed with `private`: `findClosingBrace()`, `parseFields()`
- No arrow functions for public APIs; use `static` methods for utility classes

**Variables:**
- `camelCase` for all variable names
- `const` for imports and constants (immutable-first style)
- Loop variables follow TypeScript conventions: `for (let i = 0; i < ...)` for indices, `for (const item of array)` for iteration

**Types:**
- Interfaces: `PascalCase` (e.g., `BibtexEntry`, `BibtexParser`)
- Type names use `PascalCase` even for internal types
- Export explicit interfaces for public APIs

## Code Style

**Formatting:**
- Deno's built-in formatter (implied by use of Deno's native toolchain)
- Line length: No hard limit observed; code is concise and readable
- Indentation: 2 spaces (standard Deno convention)

**Linting:**
- Deno lint enabled via `deno.json` at root
- Configured plugins: Lume's lint plugin (`https://cdn.jsdelivr.net/gh/lumeland/lume@3.1.4/lint.ts`)
- Exclude rule: `no-import-prefix` (allows relative imports)
- Run with: `deno lint` (not explicitly used in provided deno.json tasks, but configured)

**Tailwind/CSS:**
- Tailwind CSS utility-first approach with custom extensions
- Custom color palette: `neo-yellow`, `neo-pink`, `neo-blue`, `neo-green` defined in `tailwind.config.ts`
- Custom shadows: `shadow-neo` (4px offset) and `shadow-neo-lg` (8px offset)
- **Design principle:** Neomorphic/retro style with thick black borders (`border-4 border-black`) and sharp corners
- **CRITICAL:** Do NOT use `rounded-*` classes — design intentionally avoids border-radius
- Font weights are heavy: `font-black`, `font-bold` preferred over lighter weights
- Layout: `max-w-6xl mx-auto` for content centering with responsive padding

## Import Organization

**Order:**
1. Standard library imports (Deno std lib: `jsr:@std/...`)
2. Third-party libraries (Lume: `lume/...`)
3. Local modules (relative: `./...` or `./_lib/...`)

**Examples from codebase:**
```typescript
// _config.ts pattern
import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import { BibtexParser } from "./_lib/bibtex-parser.ts";

// bibtex-parser_test.ts pattern
import { assertEquals } from "jsr:@std/assert";
import { BibtexParser, type BibtexEntry } from "./bibtex-parser.ts";
```

**Path Aliases:**
- None configured; relative imports only
- Lume auto-loads data files from `_data/` by matching filename to template variable name

## Error Handling

**Patterns:**
- No explicit error handling observed in BibTeX parser; assumes well-formed input
- File reads (`Deno.readTextFile()`) wrapped in Lume's loader mechanism, which handles errors
- Regex parsing uses defensive approaches (checking for null matches, counting braces)
- Return empty arrays for missing or malformed data (e.g., `formatAuthors("")` returns `[]`)
- No try/catch blocks in utility code; failures propagate to caller or gracefully degrade

**Defensive patterns:**
- Optional chaining in templates: `{{ if post.date }}` before use
- Type coercion with defaults: `const yearA = parseInt(a.year || "0")`
- Array methods (.map(), .filter()) prefer immutability over mutations

## Logging

**Framework:** `console` (browser/Deno native)

**Patterns:**
- No logging observed in application code (`_lib/bibtex-parser.ts`)
- Deno tasks (`deno task serve`, `deno task build`) output to console during development
- Debug output would use `console.log()`, `console.error()`, `console.warn()`

## Comments

**When to Comment:**
- JSDoc comments required for all public methods and exported interfaces
- Include parameter descriptions (`@param`) and return types (`@returns`)
- Used sparingly in method bodies; code is self-documenting through clear function/variable names

**JSDoc/TSDoc:**
- All public static methods documented with JSDoc blocks
- Parameter and return type descriptions required for public APIs
- Example from `_lib/bibtex-parser.ts`:
  ```typescript
  /**
   * Parse BibTeX content string into an array of entries
   * @param content - The raw BibTeX file content
   * @returns Array of parsed BibTeX entries
   */
  static parse(content: string): BibtexEntry[] { ... }
  ```

## Function Design

**Size:** Methods range from 10–50 lines; small, focused functions
- `parse()`: ~50 lines (two-pass algorithm)
- `formatAuthors()`: ~20 lines (straightforward transformation)
- `findClosingBrace()`: ~10 lines (pure utility)

**Parameters:**
- Typed parameters required (no implicit `any`)
- Optional parameters use `?` syntax (e.g., `highlightAuthor?: string`)
- No parameter objects for single arguments; spread when needed

**Return Values:**
- Explicit return types on all functions (no implicit `any`)
- Return immutable data: arrays, objects with readonly properties where applicable
- Methods that modify input (e.g., `sortByYear()`) return new array; mutation in-place noted in comments

## Module Design

**Exports:**
- Named exports for types: `export interface BibtexEntry { ... }`
- Named exports for classes: `export class BibtexParser { ... }`
- No default exports (except in `_config.ts` and `tailwind.config.ts` for Lume/Tailwind)

**Barrel Files:**
- Not used; each module imports directly from its file path
- `_lib/` contains single files with focused responsibility

## Vento Template Conventions

**Front Matter Schema (All pages):**
```yaml
---
layout: layout.vto              # or blog-post.vto for articles
title: Page Title               # Required; used in <title> and <h1>
date: YYYY-MM-DD [HH:MM:SS]    # Optional; formatted via `date()` filter
description: One-line summary  # Optional; used for meta tags and previews
tags: [tag1, tag2]             # Optional; Lume search filter
categories: category-name      # Optional; content classification
url: /desired/path/            # Optional; override default URL
---
```

**Template Variables:**
- Data files accessed by filename without extension: `{{ programming }}` from `_data/programming.yaml`
- Lume provides: `{{ content }}`, `{{ title }}`, `{{ date }}`, `{{ url }}`
- Search API: `search.pages(tag, sort, limit)` to find posts

**Control Flow:**
- `{{ if condition }}` ... `{{ /if }}` for conditionals
- `{{ for item of array }}` ... `{{ /for }}` for loops
- `{{ set variable = value }}` for local variables
- `{{ variable |> filter }}` for pipe/filter syntax

**Filters:**
- `date("HUMAN_DATE")` converts date to readable format
- Custom filters registered in `_config.ts`

**Tailwind in Templates:**
- Apply utility classes directly in HTML: `class="border-4 border-black shadow-neo"`
- Custom shadow and color utilities available: `shadow-neo`, `neo-yellow`, `neo-pink`, `neo-blue`, `neo-green`
- Responsive modifiers: `md:` for medium screens and up (Tailwind default breakpoints)

**Navigation Structure:**
- Main layout (`_includes/layout.vto`) includes responsive nav with hamburger menu
- Mobile: hidden menu toggle, vertical links
- Desktop: horizontal navigation across all pages

## Design System Implementation

**Neomorphic Design Principles:**
- Borders: Always use `border-4 border-black` for strong visual separation
- Shadows: Use `shadow-neo` (4px) or `shadow-neo-lg` (8px) for depth
- Colors: Primary palette (`neo-yellow`, `neo-pink`, `neo-blue`, `neo-green`); backgrounds often `bg-white` or one of neo colors
- Typography: `font-black` for headings, `font-bold` for emphasis
- **Never** use `rounded-*` classes — sharp corners are intentional

**Example Component Pattern (from `index.vto`):**
```html
<div class="border-4 border-black shadow-neo hover:shadow-none transition-all bg-neo-yellow p-8">
  <h3 class="text-2xl font-black mb-4">Title</h3>
  <p>Content</p>
</div>
```

**Image Optimization:**
- Lume's `picture` plugin auto-generates responsive formats (avif, webp, jpg)
- Responsive widths: 480px and 768px
- Store blog images in `assets/img/blog/`
- Reference as: `thumbnail: /assets/img/blog/filename.jpg` in front matter
- Styling: `prose-img:border-4 prose-img:border-black prose-img:shadow-neo`

---

*Convention analysis: 2026-04-16*
