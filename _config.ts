import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import markdown from "lume/plugins/markdown.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import { BibtexParser } from "./_lib/bibtex-parser.ts";

// Use environment variable for location, or default to production URL
const siteUrl = Deno.env.get("SITE_URL") || "https://ildarakhmetov.com/";

const site = lume({
  location: new URL(siteUrl),
});

site.use(tailwindcss());
site.use(markdown());
site.use(date());
site.use(metas());

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

// Copy CNAME file for GitHub Pages custom domain
site.copy("CNAME");

// Append site name to page titles for SEO (in meta tags only, not display)
site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const data = page.data;
    // Skip home page (title already includes site name or is the site name)
    if (data.url !== "/" && data.title && !data.title.includes("Ildar Akhmetov")) {
      // Set metas.title with the site name suffix for SEO
      if (!data.metas) {
        data.metas = {};
      }
      data.metas.title = `${data.title} | Ildar Akhmetov`;
    }
  }
});

export default site;
