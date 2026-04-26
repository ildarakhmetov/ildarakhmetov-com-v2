// One-shot classifier: stamps `kind: post` or `kind: note` into the front
// matter of every blog/**/*.md file that doesn't already have a `kind` field.
//
// Heuristic: word count in the body. Below WORD_THRESHOLD → note, else → post.
// Skips files with an existing `kind:` (idempotent re-runs are safe).
//
//   deno run --allow-read --allow-write _lib/classify-posts.ts [--dry-run]

const DRY_RUN = Deno.args.includes("--dry-run");
const WORD_THRESHOLD = 230; // ~1 min @ 220 wpm
const ROOT = "blog";

function countWords(text: string): number {
  const cleaned = text
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
  return cleaned ? cleaned.split(" ").length : 0;
}

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory) yield* walk(path);
    else if (entry.isFile && path.endsWith(".md")) yield path;
  }
}

const decisions: { path: string; words: number; kind: "post" | "note" }[] = [];
let skippedAlready = 0;
let skippedNoFm = 0;

for await (const path of walk(ROOT)) {
  const content = await Deno.readTextFile(path);
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) {
    skippedNoFm++;
    console.warn(`SKIP (no front matter): ${path}`);
    continue;
  }
  const [, fm, body] = m;
  if (/^kind:\s*\S+/m.test(fm)) {
    skippedAlready++;
    continue;
  }
  const words = countWords(body);
  const kind: "post" | "note" = words < WORD_THRESHOLD ? "note" : "post";
  decisions.push({ path, words, kind });

  if (!DRY_RUN) {
    await Deno.writeTextFile(path, `---\n${fm}\nkind: ${kind}\n---\n${body}`);
  }
}

const noteCount = decisions.filter((d) => d.kind === "note").length;
const postCount = decisions.filter((d) => d.kind === "post").length;

console.log("");
console.log(`  ${postCount} posts, ${noteCount} notes classified`);
console.log(`  ${skippedAlready} already classified (skipped)`);
if (skippedNoFm) console.log(`  ${skippedNoFm} skipped (no front matter)`);
console.log("");

for (const d of decisions.sort((a, b) => a.path.localeCompare(b.path))) {
  const glyph = d.kind === "note" ? "·" : "■";
  console.log(`${glyph} ${d.kind.padEnd(4)} ${String(d.words).padStart(5)}w  ${d.path}`);
}

if (DRY_RUN) console.log("\n  (dry run — no files written)");
