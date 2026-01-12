import { assertEquals } from "jsr:@std/assert";
import { BibtexParser, type BibtexEntry } from "./bibtex-parser.ts";

// Tests for parse() method
Deno.test("parse - single entry with all fields", () => {
  const input = `@article{doe2024,
    title={Test Article Title},
    author={Doe, John},
    year={2024},
    journal={Test Journal},
    volume={10},
    number={2},
    pages={100--110}
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result.length, 1);
  assertEquals(result[0].type, "article");
  assertEquals(result[0].citationKey, "doe2024");
  assertEquals(result[0].title, "Test Article Title");
  assertEquals(result[0].author, "Doe, John");
  assertEquals(result[0].year, "2024");
  assertEquals(result[0].journal, "Test Journal");
  assertEquals(result[0].volume, "10");
  assertEquals(result[0].number, "2");
  assertEquals(result[0].pages, "100--110");
});

Deno.test("parse - multiple entries", () => {
  const input = `@article{first2024,
    title={First Article},
    author={Doe, John},
    year={2024}
  }
  
  @inproceedings{second2023,
    title={Second Paper},
    author={Smith, Jane},
    year={2023},
    booktitle={Conference Proceedings}
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result.length, 2);
  assertEquals(result[0].citationKey, "first2024");
  assertEquals(result[0].title, "First Article");
  assertEquals(result[1].citationKey, "second2023");
  assertEquals(result[1].title, "Second Paper");
  assertEquals(result[1].booktitle, "Conference Proceedings");
});

Deno.test("parse - field with braces format", () => {
  const input = `@article{test2024,
    title={Article with Nested Content},
    author={Doe, John}
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result[0].title, "Article with Nested Content");
});

Deno.test("parse - field with quotes format", () => {
  const input = `@article{test2024,
    title="Article with Quotes",
    author="Doe, John"
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result[0].title, "Article with Quotes");
  assertEquals(result[0].author, "Doe, John");
});

Deno.test("parse - field without braces or quotes", () => {
  const input = `@article{test2024,
    year=2024,
    volume=10
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result[0].year, "2024");
  assertEquals(result[0].volume, "10");
});

Deno.test("parse - entry with missing optional fields", () => {
  const input = `@article{minimal2024,
    title={Minimal Entry}
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result.length, 1);
  assertEquals(result[0].title, "Minimal Entry");
  assertEquals(result[0].author, undefined);
  assertEquals(result[0].year, undefined);
});

Deno.test("parse - different entry types", () => {
  const input = `@book{book2024,
    title={Book Title},
    publisher={Publisher Name}
  }
  
  @inproceedings{conf2024,
    title={Conference Paper},
    booktitle={Conference Name}
  }`;
  const result = BibtexParser.parse(input);
  assertEquals(result[0].type, "book");
  assertEquals(result[0].publisher, "Publisher Name");
  assertEquals(result[1].type, "inproceedings");
  assertEquals(result[1].booktitle, "Conference Name");
});

// Tests for formatAuthors() method
Deno.test("formatAuthors - single author in Last, First format", () => {
  const result = BibtexParser.formatAuthors("Doe, John");
  assertEquals(result.length, 1);
  assertEquals(result[0].name, "John Doe");
  assertEquals(result[0].isHighlighted, false);
});

Deno.test("formatAuthors - multiple authors with and separator", () => {
  const result = BibtexParser.formatAuthors("Doe, John and Smith, Jane and Brown, Bob");
  assertEquals(result.length, 3);
  assertEquals(result[0].name, "John Doe");
  assertEquals(result[1].name, "Jane Smith");
  assertEquals(result[2].name, "Bob Brown");
});

Deno.test("formatAuthors - author with middle name", () => {
  const result = BibtexParser.formatAuthors("Doe, John Michael");
  assertEquals(result.length, 1);
  assertEquals(result[0].name, "John Michael Doe");
});

Deno.test("formatAuthors - highlight specific author", () => {
  const result = BibtexParser.formatAuthors(
    "Doe, John and Akhmetov, Ildar and Smith, Jane",
    "Akhmetov"
  );
  assertEquals(result.length, 3);
  assertEquals(result[0].isHighlighted, false);
  assertEquals(result[1].isHighlighted, true);
  assertEquals(result[1].name, "Ildar Akhmetov");
  assertEquals(result[2].isHighlighted, false);
});

Deno.test("formatAuthors - case insensitive highlighting", () => {
  const result = BibtexParser.formatAuthors(
    "AKHMETOV, ILDAR",
    "akhmetov"
  );
  assertEquals(result[0].isHighlighted, true);
});

Deno.test("formatAuthors - empty string", () => {
  const result = BibtexParser.formatAuthors("");
  assertEquals(result.length, 0);
});

Deno.test("formatAuthors - author without comma (non-standard format)", () => {
  const result = BibtexParser.formatAuthors("John Doe");
  assertEquals(result.length, 1);
  assertEquals(result[0].name, "John Doe");
  assertEquals(result[0].isHighlighted, false);
});

// Tests for sortByYear() method
Deno.test("sortByYear - descending order", () => {
  const entries: BibtexEntry[] = [
    { type: "article", citationKey: "a", year: "2020" },
    { type: "article", citationKey: "b", year: "2023" },
    { type: "article", citationKey: "c", year: "2021" },
  ];
  const result = BibtexParser.sortByYear(entries);
  assertEquals(result[0].year, "2023");
  assertEquals(result[1].year, "2021");
  assertEquals(result[2].year, "2020");
});

Deno.test("sortByYear - entries without year field", () => {
  const entries: BibtexEntry[] = [
    { type: "article", citationKey: "a", year: "2020" },
    { type: "article", citationKey: "b" },
    { type: "article", citationKey: "c", year: "2023" },
  ];
  const result = BibtexParser.sortByYear(entries);
  assertEquals(result[0].year, "2023");
  assertEquals(result[1].year, "2020");
  assertEquals(result[2].year, undefined);
});

Deno.test("sortByYear - does not mutate original array", () => {
  const entries: BibtexEntry[] = [
    { type: "article", citationKey: "a", year: "2020" },
    { type: "article", citationKey: "b", year: "2023" },
  ];
  const original = [...entries];
  BibtexParser.sortByYear(entries);
  // Original array should be mutated (sort mutates in place)
  assertEquals(entries[0].year, "2023");
  assertEquals(entries[1].year, "2020");
});

// Tests for parseWithFormattedAuthors() method
Deno.test("parseWithFormattedAuthors - adds formatted authors", () => {
  const input = `@article{test2024,
    title={Test Article},
    author={Doe, John and Akhmetov, Ildar},
    year={2024}
  }`;
  const result = BibtexParser.parseWithFormattedAuthors(input, "Akhmetov");
  assertEquals(result.length, 1);
  assertEquals(result[0].formattedAuthors?.length, 2);
  assertEquals(result[0].formattedAuthors?.[0].name, "John Doe");
  assertEquals(result[0].formattedAuthors?.[0].isHighlighted, false);
  assertEquals(result[0].formattedAuthors?.[1].name, "Ildar Akhmetov");
  assertEquals(result[0].formattedAuthors?.[1].isHighlighted, true);
});

// Tests for parseAndSortWithFormattedAuthors() method
Deno.test("parseAndSortWithFormattedAuthors - complete workflow", () => {
  const input = `@article{old2020,
    title={Old Article},
    author={Doe, John},
    year={2020}
  }
  
  @article{new2024,
    title={New Article},
    author={Smith, Jane and Akhmetov, Ildar},
    year={2024}
  }`;
  const result = BibtexParser.parseAndSortWithFormattedAuthors(input, "Akhmetov");
  
  // Should be sorted by year (newest first)
  assertEquals(result.length, 2);
  assertEquals(result[0].year, "2024");
  assertEquals(result[1].year, "2020");
  
  // Should have formatted authors
  assertEquals(result[0].formattedAuthors?.length, 2);
  assertEquals(result[0].formattedAuthors?.[1].isHighlighted, true);
  assertEquals(result[1].formattedAuthors?.length, 1);
  assertEquals(result[1].formattedAuthors?.[0].isHighlighted, false);
});
