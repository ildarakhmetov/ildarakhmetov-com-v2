# Testing

**Analysis Date:** 2026-04-16

## Framework

**Deno's native test runner** (`Deno.test`) with `jsr:@std/assert` for assertions. No third-party test framework, no mocking library, no fixture loader.

```bash
deno task test
# expands to: deno test --allow-read --allow-env --allow-net
```

## Test Files

| File                            | Tests | Coverage                                   |
|---------------------------------|-------|--------------------------------------------|
| `_lib/bibtex-parser_test.ts`    | 19    | `BibtexParser` class — all 6 public methods |

That's it. The codebase has **one** test file covering **one** module.

## Test Naming Convention

- File suffix: `<module>_test.ts` (Deno default)
- Test name format: `"<methodName> - <scenario description>"`
  - Example: `"parse - single entry with all fields"` (`_lib/bibtex-parser_test.ts:5`)
  - Example: `"formatAuthors - case insensitive highlighting"` (`_lib/bibtex-parser_test.ts:141`)

Each test exercises one method and one scenario. No nested suites — flat list of `Deno.test()` calls.

## What's Tested

`BibtexParser` (`_lib/bibtex-parser.ts`):

| Method                              | Test scenarios                                                        |
|-------------------------------------|-----------------------------------------------------------------------|
| `parse()`                           | All-fields entry, multiple entries, brace/quote/bare value formats, missing optional fields, different entry types (`@article`, `@book`, `@inproceedings`) |
| `formatAuthors()`                   | Single author, multi-author with `and`, middle names, highlight target, case-insensitive match, empty input, non-standard format |
| `sortByYear()`                      | Descending sort, missing-year handling, mutation semantics            |
| `parseWithFormattedAuthors()`       | Combined parse + format pipeline                                      |
| `parseAndSortWithFormattedAuthors()`| Full happy-path: parse → format → sort                                |

## What's NOT Tested

This is a small static site, so coverage gaps are intentional in many cases — but worth knowing:

- **Vento templates** (`*.vto`) — no template rendering tests. Build success is the only signal.
- **`_config.ts`** — the custom `bibLoader` and the title-suffix preprocess hook have no unit tests.
- **Data files** (`_data/*.yaml`, `_data/publications.bib`) — no schema validation. Malformed YAML or BibTeX surfaces only at build time.
- **Front-matter validation** — blog posts with missing `url:` or wrong `date:` format aren't caught until build.
- **Image references** — broken `thumbnail:` paths aren't validated before build.
- **Build artifact** — no smoke test on `_site/` output (no link checker, no HTML validator, no Lighthouse run).
- **Mobile menu JavaScript** (`_includes/layout.vto:43-61`) — inline browser JS, no tests.
- **Infinite scroll JavaScript** (`blog.vto:78-162`) — inline browser JS, no tests.
- **Malformed BibTeX edge cases** — the parser tests use well-formed input; no tests cover trailing-period bugs (which is exactly the kind of bug that exists today — see CONCERNS.md).

## Mocking

None. The single tested module (`BibtexParser`) is a pure parser with no I/O, so no mocks are needed. The custom loader in `_config.ts` does file I/O (`Deno.readTextFile`) and is untested for that reason.

## Coverage

- **No coverage tooling configured.** Deno supports `--coverage` flag, but `deno task test` doesn't pass it.
- **No CI gate on test results.** `.github/workflows/deploy.yml` builds and deploys; it does not run `deno task test`. Tests must be run locally.

## Test Permissions

The `test` task explicitly grants `--allow-read --allow-env --allow-net`. Read is needed for `BibtexParser` if a test ever loads from disk (none currently do). Env and net are likely defensive — neither is exercised by the existing 19 tests.

## Adding Tests

For a new utility in `_lib/<name>.ts`:

1. Create `_lib/<name>_test.ts`
2. Import: `import { assertEquals } from "jsr:@std/assert";`
3. Add `Deno.test("<methodName> - <scenario>", () => { ... });` blocks
4. Run `deno task test`

For template/HTML output testing, no precedent exists — would require adding a build-output snapshot or HTML parsing test, neither of which is set up today.

---

*Testing analysis: 2026-04-16*
