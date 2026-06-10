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

// Pre-computed "Related Tips" index, produced offline by `deno task related`
// (_og/build-related.ts) from OpenRouter embeddings. Read explicitly here
// rather than from _data/ so it isn't auto-exposed as a global (which would
// collide with the `related` front-matter override). Missing file is fine —
// the site builds without related links until the task is first run.
type RelatedRef = { slug: string; tip_number: number };
let relatedIndex: Record<string, RelatedRef[]> = {};
try {
  relatedIndex = JSON.parse(await Deno.readTextFile("_og/related.json"));
} catch {
  // no index yet
}

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

// Escape a string for safe use inside an HTML attribute value. Vento does not
// auto-escape interpolations, so titles containing quotes (e.g. Tip 240's
// `"+1"`) would otherwise break `attr="{{ ... }}"`.
site.filter("attr", (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;"));

// Drop the routing-only "post" tag and cap the visible list.
site.filter("displayTags", (tags: unknown): string[] => {
  const list = Array.isArray(tags) ? (tags as string[]) : [];
  return list.filter((t) => t && t !== "post").slice(0, 3);
});

// Bucket posts by publication year, newest year first.
type PostLike = { date?: Date | string };
site.filter(
  "groupByYear",
  (posts: unknown): { year: number; posts: PostLike[] }[] => {
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
  },
);

// Add the CSS file to be processed
site.add("styles.css");
site.copy("assets");

// Copy CNAME file for GitHub Pages custom domain
site.copy("CNAME");

site.ignore("CLAUDE.md", "LICENSE.md", "README.md");

// Append site name to page titles for SEO (in meta tags only, not display)
// and stamp blog posts with a reading-time estimate for index pages to read.
site.preprocess([".html"], (pages) => {
  // Index every tip page so related links can be resolved to live titles/urls.
  const tipUrlSlug = (url: unknown) =>
    typeof url === "string"
      ? url.replace(/^\/256tipsdev\//, "").replace(/\/$/, "")
      : "";
  type TipRef = { url: string; title: string; tip_number: number };
  const tipBySlug = new Map<string, TipRef>();
  const slugByNumber = new Map<number, string>();
  for (const page of pages) {
    const d = page.data;
    if (d.layout !== "tip.vto" || typeof d.url !== "string") continue;
    const slug = tipUrlSlug(d.url);
    const ref: TipRef = {
      url: d.url,
      title: String(d.title ?? ""),
      tip_number: Number(d.tip_number),
    };
    tipBySlug.set(slug, ref);
    if (Number.isFinite(ref.tip_number)) slugByNumber.set(ref.tip_number, slug);
  }

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

    // Auto-wire per-tip Open Graph cards. `deno task tip-cards` renders
    // /assets/img/og/tips/<slug>.jpg from each tip's title + tip_number;
    // this hook surfaces it via metas plugin as og:image.
    if (
      data.layout === "tip.vto" && !data.thumbnail &&
      typeof data.url === "string"
    ) {
      const slug = data.url.replace(/^\/256tipsdev\//, "").replace(/\/$/, "");
      if (slug) data.thumbnail = `/assets/img/og/tips/${slug}.jpg`;
    }

    // Resolve "Related Tips" for the page. A `related: [N, M]` front-matter
    // array (tip_numbers) overrides; otherwise fall back to the embedding
    // index. Either way, resolve to live {url, title, tip_number} refs and
    // skip anything that doesn't point at a real tip.
    if (data.layout === "tip.vto" && typeof data.url === "string") {
      const slug = tipUrlSlug(data.url);
      const refs = Array.isArray(data.related)
        ? (data.related as number[])
          .map((n) => slugByNumber.get(Number(n)))
          .filter((s): s is string => !!s)
          .map((s) => tipBySlug.get(s)!)
        : (relatedIndex[slug] ?? [])
          .map((r) => tipBySlug.get(r.slug))
          .filter((r): r is TipRef => !!r);
      data.relatedTips = refs;
    }
  }
});

export default site;
