/**
 * View model for the traveling page.
 *
 * Reads _data/traveling.yaml and _lib/countries-110m.json at build time,
 * enriches each visited country with ISO codes + continent metadata, renders
 * the world-map SVG, and exports one consolidated object for the template.
 *
 * Keeping all the page's computed data in one file means the .vto template
 * stays declarative — loops over a ready-to-render list rather than looking
 * anything up inline.
 */

import { parse as parseYaml } from "jsr:@std/yaml@^1.0.5";
import { COUNTRIES, metaFor, WORLD_COUNTRY_COUNT } from "../_lib/country-codes.ts";
import { buildMapFromTravelData } from "../_lib/travel-map.ts";

interface YamlVisited {
  name: string;
  years: string;
}
interface YamlData {
  visited: YamlVisited[];
  lived: string[];
}

export interface Stamp {
  name: string;
  alpha3: string;
  continent: string;
  subContinent: string;
  years: string; // full years string from yaml, e.g. "2013, 2025"
  firstYearShort: string; // last 2 digits of earliest year, e.g. "13" — for postmark
  isHome: boolean;
  isLongName: boolean;
  rotation: number; // deterministic per-country rotation, deg
  isCanadaLeaf: boolean; // true only for the Canada stamp (maple-leaf variant)
}

export interface HomeCard {
  name: string;
  alpha3: string;
  years: string;
}

/* ------------------------------------------------------------------ */

const yamlText = await Deno.readTextFile("./_data/traveling.yaml");
const topoText = await Deno.readTextFile("./_lib/countries-110m.json");

const data = parseYaml(yamlText) as YamlData;
// yaml auto-coerces unquoted single-year values like `2015` to numbers — normalize
for (const v of data.visited) v.years = String(v.years);
// deno-lint-ignore no-explicit-any
const topo = JSON.parse(topoText) as any;

/* ---------- Helpers ---------- */

function extractFirstYearShort(years: string): string {
  const m = years.match(/\d{4}/);
  return m ? m[0].slice(-2) : "—";
}

/** Format the first year-range in a visited-years string as a "lived years" label. */
function firstRangeLabel(years: string): string {
  const firstSegment = years.split(",")[0].trim();
  // "1984-..." → "1984 — …"
  if (/^\d{4}-\.\.\.?$/.test(firstSegment)) {
    return firstSegment.replace(/^(\d{4})-\.\.\.?$/, "$1 — …");
  }
  // "1994-1995" → "1994 – 1995"
  const range = firstSegment.match(/^(\d{4})-(\d{4})$/);
  if (range) return `${range[1]} – ${range[2]}`;
  // "2013" → "2013"
  return firstSegment;
}

function rotationFor(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash * 31) + name.charCodeAt(i)) | 0;
  }
  const angles = [-2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5];
  return angles[Math.abs(hash) % angles.length];
}

const HOME_YEARS_OVERRIDE: Record<string, string> = {
  Canada: "currently",
};

function yearsForHome(name: string, visitedYears: string | undefined): string {
  if (HOME_YEARS_OVERRIDE[name]) return HOME_YEARS_OVERRIDE[name];
  if (!visitedYears) return "";
  return firstRangeLabel(visitedYears);
}

/* ---------- Validate yaml entries exist in the code table ---------- */

const allNames = new Set<string>([
  ...data.visited.map((v) => v.name),
  ...data.lived,
]);
for (const name of allNames) {
  metaFor(name); // throws if missing — loud build-time failure
}

/* ---------- Stamps (36 visited + 1 leaf-only Canada, sorted A–Z) ---------- */

const livedSet = new Set(data.lived);

const stamps: Stamp[] = data.visited.map((v) => {
  const meta = metaFor(v.name);
  return {
    name: v.name,
    alpha3: meta.alpha3,
    continent: meta.continent,
    subContinent: meta.subContinent,
    years: v.years,
    firstYearShort: extractFirstYearShort(v.years),
    isHome: livedSet.has(v.name),
    isLongName: v.name.length > 9,
    rotation: rotationFor(v.name),
    isCanadaLeaf: false,
  };
});

// Inject home-only countries (Canada) as leaf stamps
for (const name of data.lived) {
  if (data.visited.some((v) => v.name === name)) continue; // already included
  const meta = metaFor(name);
  stamps.push({
    name,
    alpha3: meta.alpha3,
    continent: meta.continent,
    subContinent: meta.subContinent,
    years: "",
    firstYearShort: "",
    isHome: true,
    isLongName: name.length > 9,
    rotation: rotationFor(name),
    isCanadaLeaf: name === "Canada",
  });
}

stamps.sort((a, b) => a.name.localeCompare(b.name));

/* ---------- Home cards (in encountered order) ---------- */

// Preserve yaml's declared order but put "Russia" first if present
// (birthplace ordering). Fall back to yaml order otherwise.
const homeOrder = ["Russia", "China", "USA", "Canada"];
const homes: HomeCard[] = data.lived
  .slice()
  .sort((a, b) => {
    const ai = homeOrder.indexOf(a);
    const bi = homeOrder.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  })
  .map((name) => {
    const meta = metaFor(name);
    const visitedEntry = data.visited.find((v) => v.name === name);
    return {
      name,
      alpha3: meta.alpha3,
      years: yearsForHome(name, visitedEntry?.years),
    };
  });

/* ---------- Map ---------- */

const map = buildMapFromTravelData(topo, {
  visited: data.visited,
  lived: data.lived,
});

/* ---------- Stats ---------- */

const countryCount = allNames.size;

// "Years abroad" = first international trip → latest one. Skip entries with
// a "since birth" pattern like "1984-..." — that's residency, not a trip.
const sinceBirthPattern = /^\d{4}-\.\.\.?$/;
const travelYears = data.visited
  .filter((v) => !sinceBirthPattern.test(v.years.trim()))
  .flatMap((v) => Array.from(v.years.matchAll(/\d{4}/g)).map((m) => parseInt(m[0], 10)))
  .filter((y) => !Number.isNaN(y));
const firstYearAbroad = travelYears.length ? Math.min(...travelYears) : null;
const latestYear = travelYears.length ? Math.max(...travelYears) : null;
const percentOfWorld = Math.round((countryCount / WORLD_COUNTRY_COUNT) * 100);

/* ---------- Export ---------- */

export default {
  stamps,
  homes,
  mapSvg: map.svg,
  mapWidth: map.width,
  mapHeight: map.height,
  stats: {
    countries: countryCount,
    worldTotal: WORLD_COUNTRY_COUNT,
    percentOfWorld,
    firstYearAbroad,
    latestYear,
    homes: data.lived.length,
  },
};
