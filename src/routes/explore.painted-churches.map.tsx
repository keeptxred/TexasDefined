import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchAuthorityExpansionDate } from "@/data/painted-church-authority-sources";
import { paintedChurchMapPointBySlug, paintedChurchMapPoints } from "@/data/painted-church-map-points";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/map";
const description = "Use the Painted Churches of Texas map to find every verified church statewide, with sourced coordinates, regional filters, church guides and navigation links.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

type MapFilter =
  | "all"
  | "schulenburg"
  | "central"
  | "hill-country"
  | "north-panhandle"
  | "south-east"
  | "formal"
  | "broader"
  | "modern";

type MapView = "statewide" | "central" | "schulenburg" | "south-central" | "north";

const filters: { id: MapFilter; label: string }[] = [
  { id: "all", label: "All verified" },
  { id: "schulenburg", label: "Schulenburg six" },
  { id: "central", label: "Central Texas" },
  { id: "hill-country", label: "Hill Country & San Antonio" },
  { id: "north-panhandle", label: "North Texas & Panhandle" },
  { id: "south-east", label: "South & East Texas" },
  { id: "formal", label: "Formal NR group" },
  { id: "broader", label: "Broader historic" },
  { id: "modern", label: "Modern campaign" },
];

const mapViews: { id: MapView; label: string; bounds?: { minLon: number; maxLon: number; minLat: number; maxLat: number } }[] = [
  { id: "statewide", label: "Statewide" },
  { id: "central", label: "Central Texas", bounds: { minLon: -98.5, maxLon: -95.2, minLat: 28.8, maxLat: 31.3 } },
  { id: "schulenburg", label: "Schulenburg area", bounds: { minLon: -97.35, maxLon: -96.55, minLat: 29.35, maxLat: 30.02 } },
  { id: "south-central", label: "South-Central", bounds: { minLon: -100.1, maxLon: -97.1, minLat: 27.4, maxLat: 31.5 } },
  { id: "north", label: "North & Panhandle", bounds: { minLon: -103.0, maxLon: -94.0, minLat: 32.8, maxLat: 36.7 } },
];

const mapBounds = { minLon: -106.8, maxLon: -93.45, minLat: 25.65, maxLat: 36.7 };
const mapWidth = 860;
const mapHeight = 660;
const pad = 28;
const project = (lat: number, lon: number) => ({
  x: pad + ((lon - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * (mapWidth - pad * 2),
  y: pad + ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * (mapHeight - pad * 2),
});

const viewBoxForBounds = (bounds?: { minLon: number; maxLon: number; minLat: number; maxLat: number }) => {
  if (!bounds) return `0 0 ${mapWidth} ${mapHeight}`;
  const topLeft = project(bounds.maxLat, bounds.minLon);
  const bottomRight = project(bounds.minLat, bounds.maxLon);
  const extra = 24;
  const x = Math.max(0, topLeft.x - extra);
  const y = Math.max(0, topLeft.y - extra);
  const width = Math.min(mapWidth - x, bottomRight.x - topLeft.x + extra * 2);
  const height = Math.min(mapHeight - y, bottomRight.y - topLeft.y + extra * 2);
  return `${x} ${y} ${width} ${height}`;
};

// A deliberately simplified Texas boundary used only as a statewide overview behind sourced point coordinates.
const texasOutline = [
  [-106.65, 31.76], [-103.0, 31.76], [-103.0, 36.5], [-100.0, 36.5], [-100.0, 34.56],
  [-99.2, 34.15], [-97.0, 33.85], [-94.05, 33.55], [-94.05, 29.7], [-95.2, 29.15],
  [-96.3, 28.5], [-97.4, 27.1], [-97.2, 25.85], [-99.0, 26.4], [-100.1, 28.2],
  [-101.4, 29.8], [-103.1, 29.0], [-104.7, 29.7], [-106.65, 31.76],
] as const;
const outlinePoints = texasOutline.map(([lon, lat]) => {
  const point = project(lat, lon);
  return `${point.x},${point.y}`;
}).join(" ");

const precisionLabel = {
  "exact-property": "Exact property coordinate",
  "near-property": "Near-property coordinate",
  community: "Community-level coordinate",
} as const;

const regionFor = (county: string) => {
  if (["Fayette", "Lavaca", "Austin", "Grimes", "Williamson", "Lee", "Washington"].includes(county)) return "Central Texas & the classic Painted Churches belt";
  if (["Gillespie", "Bandera", "Karnes", "Bexar", "Medina", "Mason"].includes(county)) return "Hill Country & South-Central Texas";
  if (["Nueces"].includes(county)) return "Gulf Coast & South Texas";
  if (["Potter", "Randall"].includes(county)) return "Panhandle";
  if (["Cooke", "Lamar"].includes(county)) return "North & Northeast Texas";
  if (["Anderson"].includes(county)) return "East Texas";
  return "Elsewhere in Texas";
};

const matchesFilter = (church: (typeof expandedPaintedChurches)[number], filter: MapFilter) => {
  const region = regionFor(church.county);
  if (filter === "formal") return church.classification === "formal-national-register-group";
  if (filter === "broader") return church.classification === "broader-historic-tradition";
  if (filter === "modern") return church.classification === "modern-decorative-campaign";
  if (filter === "schulenburg") return Boolean(church.schulenburgCluster);
  if (filter === "central") return region === "Central Texas & the classic Painted Churches belt";
  if (filter === "hill-country") return region === "Hill Country & South-Central Texas";
  if (filter === "north-panhandle") return region === "Panhandle" || region === "North & Northeast Texas";
  if (filter === "south-east") return region === "Gulf Coast & South Texas" || region === "East Texas";
  return true;
};

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Painted Churches of Texas Map: Statewide Church Locations",
      description,
      collectionName: "Texas Painted Churches interactive map",
      breadcrumbParentName: "Painted Churches",
      breadcrumbParentPath: "/explore/painted-churches",
      items: expandedPaintedChurches.map((church) => ({ name: church.name, url: `/explore/painted-churches/${church.slug}`, description: church.summary, image: church.image?.src, type: "TouristAttraction" as const })),
    });
    return {
      ...base,
      scripts: [
        ...(base.scripts ?? []),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#coordinates`,
          name: "Texas Painted Churches sourced map coordinates",
          description: "Geographic coordinates used by the Texas Defined Painted Churches map. Coordinate precision and source are preserved for every verified location.",
          dateModified: paintedChurchAuthorityExpansionDate,
          isBasedOn: absoluteUrl(texasDefinedBrand, "/explore/painted-churches"),
          variableMeasured: ["latitude", "longitude", "coordinate precision", "coordinate source"],
          spatialCoverage: { "@type": "State", name: "Texas" },
          hasPart: paintedChurchMapPoints.map((point) => ({
            "@type": "Place",
            name: expandedPaintedChurches.find((church) => church.slug === point.slug)?.name ?? point.slug,
            url: `${siteUrl}/explore/painted-churches/${point.slug}`,
            geo: { "@type": "GeoCoordinates", latitude: point.lat, longitude: point.lon },
          })),
          distribution: [
            { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absoluteUrl(texasDefinedBrand, "/painted-churches.csv") },
            { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: absoluteUrl(texasDefinedBrand, "/painted-churches.json") },
          ],
        }),
      ],
    };
  },
  component: PaintedChurchMapDirectory,
});

function PaintedChurchMapDirectory() {
  const [filter, setFilter] = useState<MapFilter>("all");
  const [view, setView] = useState<MapView>("statewide");
  const [selectedSlug, setSelectedSlug] = useState<string>("praha-st-marys-assumption");
  const [query, setQuery] = useState("");

  const visibleChurches = useMemo(
    () => expandedPaintedChurches.filter((church) => matchesFilter(church, filter)),
    [filter],
  );
  const visibleSlugs = useMemo(() => new Set(visibleChurches.map((church) => church.slug)), [visibleChurches]);
  const effectiveSelectedSlug = visibleSlugs.has(selectedSlug) ? selectedSlug : visibleChurches[0]?.slug;
  const selected = effectiveSelectedSlug
    ? expandedPaintedChurches.find((church) => church.slug === effectiveSelectedSlug)
    : undefined;
  const selectedPoint = selected ? paintedChurchMapPointBySlug.get(selected.slug) : undefined;
  const activeView = mapViews.find((item) => item.id === view) ?? mapViews[0];

  const directoryChurches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return visibleChurches;
    return visibleChurches.filter((church) =>
      [church.name, church.shortName, church.city, church.county, church.address, church.denomination]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [query, visibleChurches]);

  const grouped = [...directoryChurches]
    .sort((a, b) => a.city.localeCompare(b.city))
    .reduce<Record<string, typeof expandedPaintedChurches>>((acc, church) => {
      const region = regionFor(church.county);
      (acc[region] ??= []).push(church);
      return acc;
    }, {});

  const selectChurch = (slug: string) => {
    setSelectedSlug(slug);
    document.getElementById("painted-map-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectedMapUrl = selected
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address ?? `${selected.name}, ${selected.city}, Texas`)}`
    : undefined;
  const osmEmbedUrl = selectedPoint
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.lon - 0.035}%2C${selectedPoint.lat - 0.025}%2C${selectedPoint.lon + 0.035}%2C${selectedPoint.lat + 0.025}&layer=mapnik&marker=${selectedPoint.lat}%2C${selectedPoint.lon}`
    : undefined;

  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Interactive map</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Statewide geography</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Painted Churches of Texas map and statewide locations.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Explore all {expandedPaintedChurches.length} verified churches with source-backed locations. Use the statewide overview to understand the collection, zoom into the densest touring areas, then use the live street map and church guide for the stop you plan to visit.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section id="painted-map-explorer" className="scroll-mt-8 border-t-2 border-foreground pt-8" aria-labelledby="painted-map-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow text-primary">Map explorer</p><h2 id="painted-map-heading" className="mt-3 font-display text-4xl">{visibleChurches.length} churches shown</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Filter by travel region or research classification. Changing filters always keeps the selected church synchronized with the pins that remain visible.</p></div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Show churches</p>
          <div className="mt-2 flex flex-wrap gap-2" aria-label="Map filters">{filters.map((item) => <button key={item.id} type="button" onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${filter === item.id ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground hover:border-foreground"}`}>{item.label}</button>)}</div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Overview zoom</p>
          <div className="mt-2 flex flex-wrap gap-2" aria-label="Map zoom presets">{mapViews.map((item) => <button key={item.id} type="button" onClick={() => setView(item.id)} aria-pressed={view === item.id} className={`border px-3 py-2 text-xs ${view === item.id ? "border-primary text-primary" : "border-border text-foreground hover:border-foreground"}`}>{item.label}</button>)}</div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.65fr)]">
          <div className="overflow-hidden border border-border bg-surface p-2 sm:p-5">
            <svg viewBox={viewBoxForBounds(activeView.bounds)} role="img" aria-labelledby="painted-map-title painted-map-desc" className="h-auto w-full transition-all duration-300">
              <title id="painted-map-title">Statewide overview of verified Texas Painted Churches</title>
              <desc id="painted-map-desc">A simplified Texas overview with church pins positioned from sourced latitude and longitude coordinates. Zoom preset buttons refine the view; the selected church also appears in a live street map beside the overview.</desc>
              <rect x="0" y="0" width={mapWidth} height={mapHeight} className="fill-background" />
              {[30, 32, 34, 36].map((lat) => { const y = project(lat, -100).y; return <g key={lat}><line x1={pad} x2={mapWidth - pad} y1={y} y2={y} className="stroke-border" strokeDasharray="4 8"/><text x={pad + 4} y={y - 5} className="fill-muted-foreground text-[11px]">{lat}°N</text></g>; })}
              {[-104, -102, -100, -98, -96, -94].map((lon) => { const x = project(31, lon).x; return <g key={lon}><line y1={pad} y2={mapHeight - pad} x1={x} x2={x} className="stroke-border" strokeDasharray="4 8"/><text x={x + 4} y={mapHeight - pad - 5} className="fill-muted-foreground text-[11px]">{Math.abs(lon)}°W</text></g>; })}
              <polyline points={outlinePoints} className="fill-background stroke-foreground/40" strokeWidth="3" />
              {paintedChurchMapPoints.filter((point) => visibleSlugs.has(point.slug)).map((point) => {
                const church = expandedPaintedChurches.find((candidate) => candidate.slug === point.slug);
                if (!church) return null;
                const { x, y } = project(point.lat, point.lon);
                const isSelected = effectiveSelectedSlug === church.slug;
                return <g key={point.slug} role="button" tabIndex={0} aria-label={`Select ${church.name}`} aria-pressed={isSelected} onClick={() => setSelectedSlug(church.slug)} onFocus={() => setSelectedSlug(church.slug)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedSlug(church.slug); } }} className="cursor-pointer focus-visible:outline-none">
                  <circle cx={x} cy={y} r={isSelected ? 11 : 7} className={isSelected ? "fill-primary stroke-background" : "fill-foreground stroke-background"} strokeWidth={isSelected ? 4 : 3}><title>{church.shortName} — {church.city}</title></circle>
                  {isSelected ? <text x={x + 14} y={y + 4} className="fill-foreground text-[12px] font-semibold">{church.city}</text> : null}
                </g>;
              })}
            </svg>
            <p className="border-t border-border px-2 pt-4 text-xs leading-6 text-muted-foreground">The Texas shape is a simplified statewide overview, not a road map. Pin coordinates are independently sourced. Use the live OpenStreetMap detail pane for road and neighborhood context, and use the church's navigation link for turn-by-turn directions.</p>
          </div>

          <aside className="border-t-2 border-foreground pt-6" aria-live="polite">
            {selected && selectedPoint ? <>
              <p className="eyebrow text-primary">Selected church</p>
              {selected.image ? <div className="relative mt-4 aspect-[4/3] overflow-hidden bg-surface"><img src={selected.image.src} alt={selected.image.alt} width={selected.image.width} height={selected.image.height} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} /></div> : null}
              <h3 className="mt-4 font-display text-3xl leading-tight">{selected.shortName}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{selected.city} · {selected.county} County</p>
              <p className="mt-4 text-sm leading-7 text-foreground/90">{selected.visitNote}</p>
              <dl className="mt-5 space-y-3 border-y border-border py-5 text-sm">
                <div><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-1">{selected.address ?? `${selected.city}, Texas`}</dd></div>
                <div><dt className="eyebrow text-muted-foreground">Research classification</dt><dd className="mt-1">{selected.classification.replaceAll("-", " ")}</dd></div>
              </dl>
              {osmEmbedUrl ? <div className="mt-5 overflow-hidden border border-border"><iframe title={`Street map around ${selected.name}`} src={osmEmbedUrl} className="h-56 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div> : null}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link to="/explore/painted-churches/$slug" params={{ slug: selected.slug }} className="border-b border-primary text-primary">Full church guide</Link>{selectedMapUrl ? <a href={selectedMapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open turn-by-turn navigation</a> : null}</div>
              <details className="mt-5 border-t border-border pt-4 text-sm"><summary className="cursor-pointer font-semibold">Coordinate provenance</summary><dl className="mt-4 space-y-3 text-muted-foreground"><div><dt className="font-semibold text-foreground">Coordinate</dt><dd>{selectedPoint.lat.toFixed(6)}, {selectedPoint.lon.toFixed(6)}</dd></div><div><dt className="font-semibold text-foreground">Precision</dt><dd>{precisionLabel[selectedPoint.precision]}</dd></div><div><dt className="font-semibold text-foreground">Source</dt><dd><a href={selectedPoint.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{selectedPoint.sourceLabel}</a></dd></div></dl></details>
            </> : <p className="text-sm leading-7 text-muted-foreground">No church matches this filter.</p>}
          </aside>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-8" aria-labelledby="church-directory-heading">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,.45fr)] md:items-end">
          <div><p className="eyebrow text-primary">Accessible directory</p><h2 id="church-directory-heading" className="mt-3 font-display text-4xl">Find a church by name, town or county</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The directory mirrors the current map filter and provides a text-first alternative to selecting pins.</p></div>
          <label className="block"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Search these results</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Praha, Fayette, St. Mary’s…" className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /></label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{directoryChurches.length} matching {directoryChurches.length === 1 ? "church" : "churches"}.</p>
      </section>

      {Object.entries(grouped).map(([region, churches]) => <section key={region} className="mt-10 border-t border-border pt-7"><p className="eyebrow text-primary">{region}</p><h2 className="mt-3 font-display text-3xl">{churches.length} {churches.length === 1 ? "church" : "churches"}</h2><div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => {
        const point = paintedChurchMapPointBySlug.get(church.slug);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;
        return <article key={church.slug} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 bg-background p-5">
          <div><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{church.address ?? `${church.city}, Texas`}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><button type="button" onClick={() => selectChurch(church.slug)} className="border-b border-primary text-primary">Show on map</button><a href={mapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Navigation</a><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="border-b border-primary text-primary">Guide</Link></div>{point ? <p className="mt-3 text-xs leading-5 text-muted-foreground">{precisionLabel[point.precision]}</p> : null}</div>
          {church.image ? <div className="relative hidden h-24 w-28 overflow-hidden bg-surface sm:block"><img src={church.image.src} alt="" width={church.image.width} height={church.image.height} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} /></div> : null}
        </article>;
      })}</div></section>)}

      {directoryChurches.length === 0 ? <section className="mt-10 border border-border bg-surface p-8"><h2 className="font-display text-3xl">No churches match that search.</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Try a church name, city, county or denomination, or clear the current map filter.</p><button type="button" onClick={() => { setQuery(""); setFilter("all"); }} className="mt-5 border-b border-primary text-sm text-primary">Show all verified churches</button></section> : null}

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">Coordinate methodology</p><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined records the source and precision of each pin separately from the church's historical source. Exact-property coordinates come from mapped archival, THC, Wikidata/OpenStreetMap or marker records tied to the property. Near-property points come from geotagged church photographs or tightly matched mapped features. Community-level points are used only when the rural record does not support stronger precision. The canonical Painted Churches authority dataset was last expanded on {paintedChurchAuthorityExpansionDate}.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Complete statewide Painted Churches guide</Link><Link to="/explore/painted-churches-plan" className="border-b border-primary text-primary">One-day Schulenburg route planner</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Verification methodology</Link><Link to="/explore/painted-churches/routes" className="border-b border-primary text-primary">More Painted Churches routes</Link></div></section>
    </Container>
  </main>;
}
