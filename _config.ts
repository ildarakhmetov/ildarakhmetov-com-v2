import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import markdown from "lume/plugins/markdown.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";
import sitemap from "lume/plugins/sitemap.ts";
import { BibtexParser } from "./_lib/bibtex-parser.ts";

// Use environment variable for location, or default to production URL
const siteUrl = Deno.env.get("SITE_URL") || "https://ildarakhmetov.com/";

const site = lume({
  location: new URL(siteUrl),
});

site.use(tailwindcss());
site.use(markdown());
site.use(date());
site.use(picture());
site.use(transformImages());
site.use(metas());
site.use(sitemap());

// Custom BibTeX loader for publications
async function bibLoader(path: string) {
  const content = await Deno.readTextFile(path);
  // Highlight "Akhmetov" in author lists
  return BibtexParser.parseAndSortWithFormattedAuthors(content, "Akhmetov");
}

site.loadData([".bib"], bibLoader);

// Reading-time estimate (in minutes) computed from the raw source.
// Stored on page data at preprocess so it's stable for templates that
// read sibling pages via search.pages() before those pages have rendered.
function computeReadingTime(content: unknown): number {
  const text = String(content ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

// Drop the routing-only "post" tag and cap the visible list.
site.filter("displayTags", (tags: unknown): string[] => {
  const list = Array.isArray(tags) ? (tags as string[]) : [];
  return list.filter((t) => t && t !== "post").slice(0, 3);
});

// Bucket posts by publication year, newest year first.
type PostLike = { date?: Date | string };
site.filter("groupByYear", (posts: unknown): { year: number; posts: PostLike[] }[] => {
  const list = Array.isArray(posts) ? (posts as PostLike[]) : [];
  const groups = new Map<number, PostLike[]>();
  for (const p of list) {
    const d = p.date ? new Date(p.date) : null;
    const y = d && !isNaN(d.getTime()) ? d.getFullYear() : 0;
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(p);
  }
  return Array.from(groups.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, posts]) => ({ year, posts }));
});

// Add the CSS file to be processed
site.add("styles.css");
site.copy("assets");

// Copy CNAME file for GitHub Pages custom domain
site.copy("CNAME");

site.ignore("CLAUDE.md", "LICENSE.md", "README.md");

// Append site name to page titles for SEO (in meta tags only, not display)
// and stamp blog posts with a reading-time estimate for index pages to read.
site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const data = page.data;
    // Skip home page (title already includes site name or is the site name)
    if (
      data.url !== "/" && data.title && !data.title.includes("Ildar Akhmetov")
    ) {
      // Set metas.title with the site name suffix for SEO
      if (!data.metas) {
        data.metas = {};
      }
      data.metas.title = `${data.title} | Ildar Akhmetov`;
    }

    if (Array.isArray(data.tags) && (data.tags as string[]).includes("post")) {
      data.readingTime = computeReadingTime(data.content);
      // Default any unflagged entry to "post"; explicit "note" wins.
      if (data.kind !== "note") data.kind = "post";
    }
  }
});

export default site;
