/**
 * Build-time SVG renderer for the traveling-page world map.
 *
 * Takes a TopoJSON world (countries-110m) plus a set of visited ISO numeric
 * codes and returns an SVG string. Pure TypeScript — no d3 dependency, so
 * the build stays frozen-lock-clean.
 *
 * Projection: Natural Earth 1 (Tom Patterson), same as d3-geo's
 * geoNaturalEarth1(). More visually balanced than Mercator — doesn't inflate
 * high latitudes, keeps Russia at an honest size relative to Africa.
 */

import { COUNTRIES, metaFor } from "./country-codes.ts";

/* ------------------------------------------------------------------
   TopoJSON types — only the subset we use
   ------------------------------------------------------------------ */

interface TopoTransform {
  scale: [number, number];
  translate: [number, number];
}

interface TopoGeometry {
  type: "Polygon" | "MultiPolygon";
  id?: string;
  arcs: unknown; // Polygon: number[][], MultiPolygon: number[][][]
  properties?: { name?: string };
}

interface Topology {
  transform: TopoTransform;
  arcs: number[][][]; // arcs[i] is a list of [x,y] pairs
  objects: Record<string, { geometries: TopoGeometry[] }>;
}

/* ------------------------------------------------------------------
   Topology decoding — convert arc-delta encoding to absolute lng/lat rings
   ------------------------------------------------------------------ */

type Ring = Array<[number, number]>; // [[lng, lat], ...]

/** Decode a single arc index (possibly negative = reversed) into lng/lat points. */
function decodeArc(topo: Topology, index: number): Ring {
  const reverse = index < 0;
  const arcIdx = reverse ? ~index : index;
  const raw = topo.arcs[arcIdx];
  const { scale, translate } = topo.transform;

  // Delta-decode: first point absolute, subsequent are deltas in quantized space
  const points: Ring = [];
  let qx = 0, qy = 0;
  for (const [dx, dy] of raw) {
    qx += dx;
    qy += dy;
    points.push([qx * scale[0] + translate[0], qy * scale[1] + translate[1]]);
  }
  return reverse ? points.slice().reverse() : points;
}

/** Stitch a ring of arc indices into a continuous lng/lat ring. */
function decodeRing(topo: Topology, arcIndices: number[]): Ring {
  const out: Ring = [];
  for (let i = 0; i < arcIndices.length; i++) {
    const arcPoints = decodeArc(topo, arcIndices[i]);
    // Skip first point after the first arc to avoid duplicates at arc joins
    const slice = i === 0 ? arcPoints : arcPoints.slice(1);
    for (const p of slice) out.push(p);
  }
  return out;
}

/** Decode a geometry into a list of rings (polygons + holes flattened). */
function decodeGeometry(topo: Topology, geom: TopoGeometry): Ring[] {
  if (geom.type === "Polygon") {
    // arcs: number[][] — array of rings (outer + holes)
    return (geom.arcs as number[][]).map((r) => decodeRing(topo, r));
  }
  // MultiPolygon: number[][][] — array of polygons, each is array of rings
  const rings: Ring[] = [];
  for (const poly of geom.arcs as number[][][]) {
    for (const ring of poly) rings.push(decodeRing(topo, ring));
  }
  return rings;
}

/* ------------------------------------------------------------------
   Natural Earth projection
   ------------------------------------------------------------------ */

/** Project [lng, lat] (degrees) to unit-space [x, y] per Natural Earth 1. */
function projectUnit(lng: number, lat: number): [number, number] {
  const phi = (lat * Math.PI) / 180;
  const lam = (lng * Math.PI) / 180;
  const phi2 = phi * phi;
  const phi4 = phi2 * phi2;
  const x = lam * (0.8707 -
    0.131979 * phi2 +
    phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4)));
  const y = phi * (1.007226 +
    phi2 * (0.015085 +
      phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)));
  return [x, y];
}

interface Viewport {
  width: number;
  height: number;
  scale: number;
  translateX: number;
  translateY: number;
}

/** Standard viewport used across the site's traveling map. */
export function defaultViewport(width = 1080): Viewport {
  const height = Math.round(width * 0.52);
  return {
    width,
    height,
    scale: width / 5.6, // matches d3.geoNaturalEarth1's natural fit factor
    translateX: width / 2,
    translateY: height / 2 + 6,
  };
}

function project(
  vp: Viewport,
  lng: number,
  lat: number,
): [number, number] {
  const [ux, uy] = projectUnit(lng, lat);
  return [
    ux * vp.scale + vp.translateX,
    -uy * vp.scale + vp.translateY, // screen y is flipped
  ];
}

/* ------------------------------------------------------------------
   SVG path generation
   ------------------------------------------------------------------ */

/** Turn a ring of lng/lat points into an SVG path "M...L...Z" fragment.
 *
 * Edges where |Δlng| > 180° cross the antimeridian — for Russia those run from
 * +169° (Kamchatka) to −169° (Bering Strait), and projecting them as a straight
 * segment paints a horizontal band across the whole map. We break the path
 * into a new subpath at each crossing; SVG fill auto-closes open subpaths so
 * the visible landmass on each side of the antimeridian still fills correctly.
 */
function ringToPath(vp: Viewport, ring: Ring): string {
  const parts: string[] = [];
  let prevLng: number | null = null;
  for (let i = 0; i < ring.length; i++) {
    const [lng, lat] = ring[i];
    const [x, y] = project(vp, lng, lat);
    const crossing = prevLng !== null && Math.abs(lng - prevLng) > 180;
    const cmd = (i === 0 || crossing) ? "M" : "L";
    parts.push(`${cmd}${x.toFixed(1)} ${y.toFixed(1)}`);
    prevLng = lng;
  }
  parts.push("Z");
  return parts.join("");
}

function geometryToPath(vp: Viewport, rings: Ring[]): string {
  return rings.map((r) => ringToPath(vp, r)).join("");
}

/* ------------------------------------------------------------------
   Graticule — subtle lat/lng grid in the background
   ------------------------------------------------------------------ */

function graticulePath(vp: Viewport, stepDeg = 30): string {
  const parts: string[] = [];
  // meridians (lines of longitude)
  for (let lng = -180; lng <= 180; lng += stepDeg) {
    const seg: string[] = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      const [x, y] = project(vp, lng, lat);
      seg.push(`${seg.length === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    parts.push(seg.join(""));
  }
  // parallels (lines of latitude)
  for (let lat = -60; lat <= 60; lat += stepDeg) {
    const seg: string[] = [];
    for (let lng = -180; lng <= 180; lng += 5) {
      const [x, y] = project(vp, lng, lat);
      seg.push(`${seg.length === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    parts.push(seg.join(""));
  }
  return parts.join("");
}

/** Outer sphere outline so the map has a defined edge. */
function spherePath(vp: Viewport): string {
  const parts: string[] = [];
  // trace the equator then the antimeridians to approximate the sphere edge
  for (let lat = 90; lat >= -90; lat -= 2) {
    const [x, y] = project(vp, 180, lat);
    parts.push(`${parts.length === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  for (let lat = -90; lat <= 90; lat += 2) {
    const [x, y] = project(vp, -180, lat);
    parts.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  parts.push("Z");
  return parts.join("");
}

/* ------------------------------------------------------------------
   Public API
   ------------------------------------------------------------------ */

export interface BuildMapOptions {
  /** numeric ISO code (zero-padded) → display name + years string for tooltips */
  visited: Map<string, { name: string; years: string }>;
  overlays: Array<{ name: string; alpha3: string; lng: number; lat: number; years: string }>;
  width?: number;
}

export function buildTravelingMap(
  topo: Topology,
  opts: BuildMapOptions,
): { svg: string; width: number; height: number } {
  const vp = defaultViewport(opts.width ?? 1080);
  const geoms = topo.objects.countries.geometries;

  // Subtle background layers
  const graticule = graticulePath(vp);
  const sphere = spherePath(vp);

  // Country polygons — separate visited vs unvisited so we can group and
  // render visited on top (avoids their thick strokes being clipped by neighbors)
  const unvisited: string[] = [];
  const visited: string[] = [];

  for (const g of geoms) {
    if (!g.id) continue;
    const rings = decodeGeometry(topo, g);
    const d = geometryToPath(vp, rings);
    const geoName = (g.properties?.name) ?? g.id;
    const entry = opts.visited.get(g.id);
    if (entry) {
      visited.push(
        `<path class="country country--visited" data-name="${escape(entry.name)}" data-years="${escape(entry.years)}" d="${d}"><title>${escape(entry.name)}</title></path>`,
      );
    } else {
      unvisited.push(
        `<path class="country" data-name="${escape(geoName)}" d="${d}"><title>${escape(geoName)}</title></path>`,
      );
    }
  }

  // Small-country overlay dots (Hong Kong, Singapore)
  const dots: string[] = [];
  for (const ov of opts.overlays) {
    const [x, y] = project(vp, ov.lng, ov.lat);
    dots.push(
      `<g class="citydot-group" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" data-name="${escape(ov.name)}" data-years="${escape(ov.years)}">` +
        `<rect class="citydot" x="-3" y="-3" width="6" height="6" transform="rotate(45)"/>` +
        `<text class="citydot-label" x="8" y="3">${escape(ov.name)}</text>` +
        `<title>${escape(ov.name)}</title>` +
        `</g>`,
    );
  }

  const svg =
    `<svg class="chart" viewBox="0 0 ${vp.width} ${vp.height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="World map with countries visited">` +
    `<path class="grid-line" d="${graticule}" fill="none"/>` +
    `<path class="sphere" d="${sphere}" fill="none"/>` +
    `<g class="countries--unvisited">${unvisited.join("")}</g>` +
    `<g class="countries--visited">${visited.join("")}</g>` +
    `<g class="citydots">${dots.join("")}</g>` +
    `</svg>`;

  return { svg, width: vp.width, height: vp.height };
}

/** HTML-escape for text injected into attributes or text nodes. */
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------------
   High-level helper: given the yaml's visited list, build the SVG.
   Accepts raw yaml shape { visited: [{ name, years }], lived: [name] }
   ------------------------------------------------------------------ */

export interface TravelingData {
  visited: Array<{ name: string; years: string }>;
  lived: string[];
}

export function buildMapFromTravelData(
  topo: Topology,
  data: TravelingData,
): { svg: string; width: number; height: number } {
  const visited = new Map<string, { name: string; years: string }>();
  const overlays: Array<{ name: string; alpha3: string; lng: number; lat: number; years: string }> = [];

  // yearsByName: so home-only countries (Canada) still show in the map even
  // though they have no visited-years entry
  const yearsByName = new Map<string, string>();
  for (const v of data.visited) yearsByName.set(v.name, v.years);

  const allNames = new Set<string>([
    ...data.visited.map((v) => v.name),
    ...data.lived,
  ]);

  for (const name of allNames) {
    const meta = metaFor(name);
    const years = yearsByName.get(name) ?? "home";
    visited.set(meta.numeric, { name, years });
    if (meta.overlay) {
      overlays.push({
        name,
        alpha3: meta.alpha3,
        lng: meta.overlay.lng,
        lat: meta.overlay.lat,
        years,
      });
    }
  }

  return buildTravelingMap(topo, { visited, overlays });
}
