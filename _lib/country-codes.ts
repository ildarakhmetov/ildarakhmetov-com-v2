/**
 * Country metadata for the traveling page.
 *
 * Maps human-readable country names (as they appear in _data/traveling.yaml)
 * to ISO 3166-1 codes and a continent classification used for stamp ink color.
 *
 * Continent classification intentionally differs from pure geography in a few
 * cases where cultural/political convention overrides (e.g., Armenia → europe).
 * Transcontinental countries are placed where they're most commonly classified.
 *
 * Countries flagged `overlay: true` are too small to appear as polygons in the
 * world-atlas 110m topojson and need to be drawn as a dot at their given
 * lat/lng on top of the map.
 */

export type Continent = "americas" | "europe" | "africa" | "asia";

export interface CountryMeta {
  alpha3: string;
  numeric: string; // zero-padded 3-digit ISO 3166-1 numeric
  continent: Continent;
  subContinent: string; // display label on the stamp
  overlay?: { lng: number; lat: number };
}

export const COUNTRIES: Record<string, CountryMeta> = {
  "Argentina":    { alpha3: "ARG", numeric: "032", continent: "americas", subContinent: "S. America" },
  "Armenia":      { alpha3: "ARM", numeric: "051", continent: "europe",   subContinent: "Europe" },
  "Belarus":      { alpha3: "BLR", numeric: "112", continent: "europe",   subContinent: "Europe" },
  "Bolivia":      { alpha3: "BOL", numeric: "068", continent: "americas", subContinent: "S. America" },
  "Botswana":     { alpha3: "BWA", numeric: "072", continent: "africa",   subContinent: "Africa" },
  "Brazil":       { alpha3: "BRA", numeric: "076", continent: "americas", subContinent: "S. America" },
  "Cambodia":     { alpha3: "KHM", numeric: "116", continent: "asia",     subContinent: "Asia" },
  "Canada":       { alpha3: "CAN", numeric: "124", continent: "americas", subContinent: "N. America" },
  "Chile":        { alpha3: "CHL", numeric: "152", continent: "americas", subContinent: "S. America" },
  "China":        { alpha3: "CHN", numeric: "156", continent: "asia",     subContinent: "Asia" },
  "Colombia":     { alpha3: "COL", numeric: "170", continent: "americas", subContinent: "S. America" },
  "Croatia":      { alpha3: "HRV", numeric: "191", continent: "europe",   subContinent: "Europe" },
  "Germany":      { alpha3: "DEU", numeric: "276", continent: "europe",   subContinent: "Europe" },
  "Hong Kong":    { alpha3: "HKG", numeric: "344", continent: "asia",     subContinent: "Asia", overlay: { lng: 114.17, lat: 22.30 } },
  "India":        { alpha3: "IND", numeric: "356", continent: "asia",     subContinent: "Asia" },
  "Indonesia":    { alpha3: "IDN", numeric: "360", continent: "asia",     subContinent: "Asia" },
  "Iran":         { alpha3: "IRN", numeric: "364", continent: "asia",     subContinent: "Asia" },
  "Jordan":       { alpha3: "JOR", numeric: "400", continent: "asia",     subContinent: "Asia" },
  "Kazakhstan":   { alpha3: "KAZ", numeric: "398", continent: "asia",     subContinent: "Asia" },
  "Kenya":        { alpha3: "KEN", numeric: "404", continent: "africa",   subContinent: "Africa" },
  "Laos":         { alpha3: "LAO", numeric: "418", continent: "asia",     subContinent: "Asia" },
  "Lebanon":      { alpha3: "LBN", numeric: "422", continent: "asia",     subContinent: "Asia" },
  "Malaysia":     { alpha3: "MYS", numeric: "458", continent: "asia",     subContinent: "Asia" },
  "Mexico":       { alpha3: "MEX", numeric: "484", continent: "americas", subContinent: "N. America" },
  "Moldova":      { alpha3: "MDA", numeric: "498", continent: "europe",   subContinent: "Europe" },
  "Mongolia":     { alpha3: "MNG", numeric: "496", continent: "asia",     subContinent: "Asia" },
  "North Korea":  { alpha3: "PRK", numeric: "408", continent: "asia",     subContinent: "Asia" },
  "Peru":         { alpha3: "PER", numeric: "604", continent: "americas", subContinent: "S. America" },
  "Poland":       { alpha3: "POL", numeric: "616", continent: "europe",   subContinent: "Europe" },
  "Russia":       { alpha3: "RUS", numeric: "643", continent: "asia",     subContinent: "Eurasia" },
  "Singapore":    { alpha3: "SGP", numeric: "702", continent: "asia",     subContinent: "Asia", overlay: { lng: 103.82, lat: 1.35 } },
  "South Africa": { alpha3: "ZAF", numeric: "710", continent: "africa",   subContinent: "Africa" },
  "Thailand":     { alpha3: "THA", numeric: "764", continent: "asia",     subContinent: "Asia" },
  "Turkey":       { alpha3: "TUR", numeric: "792", continent: "asia",     subContinent: "Asia / Europe" },
  "USA":          { alpha3: "USA", numeric: "840", continent: "americas", subContinent: "N. America" },
  "Uruguay":      { alpha3: "URY", numeric: "858", continent: "americas", subContinent: "S. America" },
  "Uzbekistan":   { alpha3: "UZB", numeric: "860", continent: "asia",     subContinent: "Asia" },
};

export function metaFor(name: string): CountryMeta {
  const meta = COUNTRIES[name];
  if (!meta) {
    throw new Error(
      `Unknown country ${JSON.stringify(name)} in traveling.yaml — add it to _lib/country-codes.ts`,
    );
  }
  return meta;
}

/** Total number of sovereign states used for the "X of 195" framing. */
export const WORLD_COUNTRY_COUNT = 195;
