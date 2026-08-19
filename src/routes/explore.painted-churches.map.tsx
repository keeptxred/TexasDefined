import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchMapPointBySlug, paintedChurchMapPoints } from "@/data/painted-church-map-points";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/map";
const description = "Interactive Texas Painted Churches map with sourced coordinates for every verified church, filters for historic classification and the Schulenburg cluster, direct church guides and navigation links.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

type MapFilter = "all" | "formal" | "broader" | "modern" | "schulenburg";
const filters: { id: MapFilter; label: string }[] = [
  { id: "all", label: "All verified" },
  { id: "formal", label: "Formal NR group" },
  { id: "broader", label: "Broader historic" },
  { id: "modern", label: "Modern campaign" },
  { id: "schulenburg", label: "Schulenburg six" },
];

const mapBounds = { minLon: -106.8, maxLon: -93.45, minLat: 25.65, maxLat: 36.7 };
const mapWidth = 860;
const mapHeight = 660;
const pad = 28;
const project = (lat: number, lon: number) => ({
  x: pad + ((lon - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * (mapWidth - pad * 2),
  y: pad + ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * (mapHeight - pad * 2),
});

// A deliberately simplified Texas boundary used only as geographic orientation behind the sourced point coordinates.
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
  if (["Gillespie", "Bandera", "Karnes", "Bexar"].includes(county)) return "Hill Country & South-Central Texas";
  if (["Nueces"].includes(county)) return "Gulf Coast & South Texas";
  if (["Potter", "Randall"].includes(county)) return "Panhandle";
  if (["Cooke", "Lamar"].includes(county)) return "North & Northeast Texas";
  if (["Anderson"].includes(county)) return "East Texas";
  return "Elsewhere in Texas";
};

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Interactive Texas Painted Churches Map",
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
          description: "Geographic coordinates used by the Texas Defined interactive Painted Churches map. Coordinate precision and source are preserved for every pin.",
          isBasedOn: absoluteUrl(texasDefinedBrand, "/explore/painted-churches"),
          variableMeasured: ["latitude", "longitude", "coordinate precision", "coordinate source"],
          spatialCoverage: { "@type": "State", name: "Texas" },
          distribution: paintedChurchMapPoints.map((point) => ({
            "@type": "Place",
            name: expandedPaintedChurches.find((church) => church.slug === point.slug)?.name ?? point.slug,
            url: `${siteUrl}/explore/painted-churches/${point.slug}`,
            geo: { "@type": "GeoCoordinates", latitude: point.lat, longitude: point.lon },
          })),
        }),
      ],
    };
  },
  component: PaintedChurchMapDirectory,
});

function PaintedChurchMapDirectory() {
  const [filter, setFilter] = useState<MapFilter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>("praha-st-marys-assumption");

  const visibleChurches = useMemo(() => expandedPaintedChurches.filter((church) => {
    if (filter === "formal") return church.classification === "formal-national-register-group";
    if (filter === "broader") return church.classification === "broader-historic-tradition";
    if (filter === "modern") return church.classification === "modern-decorative-campaign";
    if (filter === "schulenburg") return Boolean(church.schulenburgCluster);
    return true;
  }), [filter]);
  const visibleSlugs = new Set(visibleChurches.map((church) => church.slug));
  const selected = expandedPaintedChurches.find((church) => church.slug === selectedSlug) ?? visibleChurches[0];
  const selectedPoint = selected ? paintedChurchMapPointBySlug.get(selected.slug) : undefined;

  const grouped = [...visibleChurches]
    .sort((a, b) => a.city.localeCompare(b.city))
    .reduce<Record<string, typeof expandedPaintedChurches>>((acc, church) => {
      const region = regionFor(church.county);
      (acc[region] ??= []).push(church);
      return acc;
    }, {});

  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Interactive map</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Statewide geography</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">A real statewide map of the Texas Painted Churches.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Every pin is generated from a sourced latitude/longitude record rather than a hand-placed illustration. Filter the collection by historic classification or the Schulenburg touring cluster, select a pin for its source and precision, then open the full church guide or navigation.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-primary">Interactive map</p><h2 className="mt-3 font-display text-4xl">{visibleChurches.length} churches shown</h2></div><div className="flex flex-wrap gap-2" aria-label="Map filters">{filters.map((item) => <button key={item.id} type="button" onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${filter === item.id ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground"}`}>{item.label}</button>)}</div></div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,.55fr)]">
          <div className="overflow-hidden border border-border bg-surface p-2 sm:p-5">
            <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="painted-map-title painted-map-desc" className="h-auto w-full">
              <title id="painted-map-title">Interactive map of verified Texas Painted Churches</title>
              <desc id="painted-map-desc">A simplified Texas outline with church pins positioned from sourced latitude and longitude coordinates. Use the filter buttons above or the accessible church directory below.</desc>
              <rect x="0" y="0" width={mapWidth} height={mapHeight} className="fill-background" />
              {[30, 32, 34, 36].map((lat) => { const y = project(lat, -100).y; return <g key={lat}><line x1={pad} x2={mapWidth - pad} y1={y} y2={y} className="stroke-border" strokeDasharray="4 8"/><text x={pad + 4} y={y - 5} className="fill-muted-foreground text-[11px]">{lat}°N</text></g>; })}
              {[-104, -102, -100, -98, -96, -94].map((lon) => { const x = project(31, lon).x; return <g key={lon}><line y1={pad} y2={mapHeight - pad} x1={x} x2={x} className="stroke-border" strokeDasharray="4 8"/><text x={x + 4} y={mapHeight - pad - 5} className="fill-muted-foreground text-[11px]">{Math.abs(lon)}°W</text></g>; })}
              <polyline points={outlinePoints} className="fill-background stroke-foreground/40" strokeWidth="3" />
              {paintedChurchMapPoints.filter((point) => visibleSlugs.has(point.slug)).map((point) => {
                const church = expandedPaintedChurches.find((candidate) => candidate.slug === point.slug);
                if (!church) return null;
                const { x, y } = project(point.lat, point.lon);
                const isSelected = selectedSlug === church.slug;
                return <g key={point.slug} role="button" tabIndex={0} aria-label={`Select ${church.name}`} onClick={() => setSelectedSlug(church.slug)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedSlug(church.slug); }} className="cursor-pointer focus:outline-none">
                  <circle cx={x} cy={y} r={isSelected ? 10 : 7} className={isSelected ? "fill-primary stroke-background" : "fill-foreground stroke-background"} strokeWidth="3"><title>{church.shortName} — {church.city}</title></circle>
                  {isSelected ? <text x={x + 13} y={y + 4} className="fill-foreground text-[12px] font-semibold">{church.city}</text> : null}
                </g>;
              })}
            </svg>
            <p className="border-t border-border px-2 pt-4 text-xs leading-6 text-muted-foreground">The Texas outline is deliberately simplified for orientation. Pin coordinates are independently sourced. “Near-property” usually reflects a geotagged photograph or closely mapped feature; “community” is intentionally less precise and is never presented as an exact church entrance.</p>
          </div>

          <aside className="border-t-2 border-foreground pt-6">
            {selected && selectedPoint ? <>
              <p className="eyebrow text-primary">Selected church</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">{selected.shortName}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{selected.city} · {selected.county} County</p>
              <dl className="mt-6 space-y-4 border-y border-border py-5 text-sm"><div><dt className="eyebrow text-muted-foreground">Coordinate</dt><dd className="mt-1">{selectedPoint.lat.toFixed(6)}, {selectedPoint.lon.toFixed(6)}</dd></div><div><dt className="eyebrow text-muted-foreground">Precision</dt><dd className="mt-1">{precisionLabel[selectedPoint.precision]}</dd></div><div><dt className="eyebrow text-muted-foreground">Coordinate source</dt><dd className="mt-1"><a href={selectedPoint.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{selectedPoint.sourceLabel}</a></dd></div><div><dt className="eyebrow text-muted-foreground">Classification</dt><dd className="mt-1">{selected.classification.replaceAll("-", " ")}</dd></div></dl>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link to="/explore/painted-churches/$slug" params={{ slug: selected.slug }} className="border-b border-primary text-primary">Full church guide</Link><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address ?? `${selected.name}, ${selected.city}, Texas`)}`} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open navigation</a></div>
            </> : <p className="text-sm leading-7 text-muted-foreground">Select a pin to inspect its coordinate source and precision.</p>}
          </aside>
        </div>
      </section>

      {Object.entries(grouped).map(([region, churches]) => <section key={region} className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">{region}</p><h2 className="mt-3 font-display text-4xl">{churches.length} verified {churches.length === 1 ? "church" : "churches"}</h2><div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{churches.map((church) => {
        const point = paintedChurchMapPointBySlug.get(church.slug);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;
        return <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{church.address ?? `${church.city}, Texas`}</p>{point ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{precisionLabel[point.precision]}</p> : null}<div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"><button type="button" onClick={() => { setSelectedSlug(church.slug); document.getElementById("painted-map-title")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="border-b border-primary text-primary">Show on map</button><a href={mapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open navigation</a><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="border-b border-primary text-primary">Full guide</Link></div></article>;
      })}</div></section>)}

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">Coordinate methodology</p><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined records the source and precision of each pin separately from the church's historical source. Exact-property coordinates come from mapped archival, THC, Wikidata/OpenStreetMap or marker records tied to the property. Near-property points come from geotagged church photographs or tightly matched mapped features. Community-level points are used only when the rural record does not support stronger precision.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Verification methodology</Link><Link to="/explore/painted-churches/routes" className="border-b border-primary text-primary">Build a driving route</Link></div></section>
    </Container>
  </main>;
}
