import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import markdown from "lume/plugins/markdown.ts";
import date from "lume/plugins/date.ts";
import { BibtexParser } from "./_lib/bibtex-parser.ts";

const site = lume();

site.use(tailwindcss());
site.use(markdown());
site.use(date());

// Custom BibTeX loader for publications
async function bibLoader(path: string) {
  const content = await Deno.readTextFile(path);
  // Highlight "Akhmetov" in author lists
  return BibtexParser.parseAndSortWithFormattedAuthors(content, "Akhmetov");
}

site.loadData([".bib"], bibLoader);

// Add the CSS file to be processed
site.add("styles.css");
site.copy("assets");

export default site;
