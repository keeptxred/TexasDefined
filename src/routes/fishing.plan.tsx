import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { FishingResultsMap } from "@/components/fishing/FishingResultsMap";
import { resolveFishingLocation } from "@/data/fishing/location.functions";
import { getFishingPlannerData } from "@/data/fishing/planner-data.functions";
import { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } from "@/data/fishing/planner-routing";
import type { FishSpecies, FishingLake } from "@/data/fishing/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Find a Texas fishing lake by place and target species. Select multiple fish, compare verified fishery fit, and open the lake guide or profile that matches your trip.";
type PlannerSearch = {
  q?: string;
  species?: string[];
  match?: "all";
  lat?: number;
  lng?: number;
  origin?: string;
  sort?: "best" | "closest";
  view?: "list" | "map";
  radius?: "50" | "100" | "200" | "400";
  shore?: "1";
  boat?: "1";
  camp?: "1";
  guide?: "1";
  report?: "1";
};

const GROUP_MEMBER_SLUGS: Readonly<Record<string, readonly string[]>> = {
  catfish: ["catfish", "blue-catfish", "channel-catfish", "flathead-catfish"],
  crappie: ["crappie", "black-crappie", "white-crappie"],
  sunfish: ["sunfish", "bluegill"],
};

export const Route = createFileRoute("/fishing/plan")({
  validateSearch: (search: Record<string, unknown>): PlannerSearch => ({
    q: cleanText(search.q) ?? cleanText(search.region),
    species: cleanSlugs(search.species),
    match: search.match === "all" ? "all" : undefined,
    lat: cleanCoordinate(search.lat, -90, 90),
    lng: cleanCoordinate(search.lng, -180, 180),
    origin: cleanText(search.origin),
    sort: search.sort === "closest" ? "closest" : search.sort === "best" ? "best" : undefined,
    view: search.view === "map" ? "map" : search.view === "list" ? "list" : undefined,
    radius: ["50", "100", "200", "400"].includes(String(search.radius)) ? String(search.radius) as PlannerSearch["radius"] : undefined,
    shore: search.shore === "1" ? "1" : undefined,
    boat: search.boat === "1" ? "1" : undefined,
    camp: search.camp === "1" ? "1" : undefined,
    guide: search.guide === "1" ? "1" : undefined,
    report: search.report === "1" ? "1" : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q ?? "", lat: search.lat, lng: search.lng, origin: search.origin }),
  loader: async ({ deps }) => {
    const data = await getFishingPlannerData();
    const resolvedOrigin = typeof deps.lat === "number" && typeof deps.lng === "number"
      ? { label: deps.origin ?? "My approximate location", lat: deps.lat, lng: deps.lng, source: "browser" as const }
      : deps.q
        ? await resolveFishingLocation(deps.q)
        : null;
    return { ...data, resolvedOrigin };
  },
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}`, name: "Texas Fishing Lake Finder", description },
        { "@type": "ItemList", numberOfItems: rows.length, itemListElement: rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.lake.name, url: `${siteUrl}${row.href}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Lake finder", item: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Lake Finder — Search by Place & Fish Species", description, canonicalPath: FISHING_TRIP_PLANNER_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_TRIP_PLANNER_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingTripPlannerPage,
});

function FishingTripPlannerPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/fishing/plan" });
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const selectedSpecies = (search.species ?? [])
    .map((slug) => data.species.find((fish) => fish.slug === slug))
    .filter((fish): fish is FishSpecies => Boolean(fish));
  const locationQuery = search.q?.trim() ?? "";
  const origin = data.resolvedOrigin;
  const activeSort = search.sort ?? "best";
  const view = search.view ?? "list";
  const browserOrigin = typeof search.lat === "number" && typeof search.lng === "number";
  const radiusMiles = search.radius ? Number(search.radius) : null;
  const hasAdvancedFilters = Boolean(search.radius || search.shore || search.boat || search.camp || search.guide || search.report);

  const ranked = data.rows.map((row) => {
    const matches = selectedSpecies.map((fish) => {
      const acceptableSlugs = new Set(fish.taxonKind === "group" ? (GROUP_MEMBER_SLUGS[fish.slug] ?? [fish.slug]) : [fish.slug]);
      const target = row.targets
        .filter((candidate) => candidate.species && acceptableSlugs.has(candidate.species.slug))
        .sort((a, b) => scoreTarget(b.relation.quality) - scoreTarget(a.relation.quality))[0];
      return { fish, target, score: scoreTarget(target?.relation.quality) };
    });
    const matchCount = matches.filter((item) => item.target).length;
    const speciesScore = matches.reduce((total, item) => total + item.score, 0);
    const location = scoreLocation(row.lake, locationQuery);
    const distanceMiles = origin && row.lake.coordinates ? haversineMiles(origin, row.lake.coordinates) : null;
    const shoreAccess = row.access.some(({ point }) => point.kind === "shore" || point.kind === "pier");
    const boatAccess = row.access.some(({ point }) => point.kind === "boat-ramp" || point.kind === "marina" || point.kind === "kayak-launch");
    const camping = row.services.some(({ category }) => category === "campground" || category === "rv-park" || category === "cabin");
    return { ...row, matches, matchCount, speciesScore, location, distanceMiles, shoreAccess, boatAccess, camping };
  })
    .filter((row) => {
      const speciesPass = selectedSpecies.length === 0 || (search.match === "all" ? row.matchCount === selectedSpecies.length : row.matchCount > 0);
      const locationPass = origin ? true : !locationQuery || row.location.score > 0;
      const radiusPass = !origin || radiusMiles == null || (row.distanceMiles != null && row.distanceMiles <= radiusMiles);
      const shorePass = search.shore !== "1" || row.shoreAccess;
      const boatPass = search.boat !== "1" || row.boatAccess;
      const campPass = search.camp !== "1" || row.camping;
      const guidePass = search.guide !== "1" || row.guides.length > 0;
      const reportPass = search.report !== "1" || row.reports.current.length > 0;
      return speciesPass && locationPass && radiusPass && shorePass && boatPass && campPass && guidePass && reportPass;
    })
    .sort((a, b) => {
      if (activeSort === "closest" && origin) {
        const distanceDelta = (a.distanceMiles ?? Number.POSITIVE_INFINITY) - (b.distanceMiles ?? Number.POSITIVE_INFINITY);
        if (distanceDelta !== 0) return distanceDelta;
      }
      return b.matchCount - a.matchCount
        || b.speciesScore - a.speciesScore
        || b.location.score - a.location.score
        || compareDistance(a.distanceMiles, b.distanceMiles)
        || Number(b.fullGuide) - Number(a.fullGuide)
        || a.lake.name.localeCompare(b.lake.name);
    });

  const mapRows = ranked
    .filter((row) => Boolean(row.lake.coordinates))
    .map((row) => ({
      id: row.lake.id,
      name: row.lake.name,
      href: row.href,
      region: row.lake.region,
      coordinates: row.lake.coordinates!,
      fullGuide: row.fullGuide,
      distanceMiles: row.distanceMiles,
      matchedSpecies: selectedSpecies.length
        ? row.matches.filter((item) => item.target).map((item) => item.fish.commonName)
        : row.targets.slice(0, 4).map((item) => item.species!.commonName),
    }));

  const useMyLocation = () => {
    setLocationError("");
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationError("Your browser does not provide location access. Enter a city or ZIP code instead.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        void navigate({
          search: {
            ...search,
            q: undefined,
            lat: roundCoordinate(coords.latitude),
            lng: roundCoordinate(coords.longitude),
            origin: "My approximate location",
            sort: "closest",
          },
        });
      },
      () => {
        setLocating(false);
        setLocationError("Location permission was not available. Enter a city or ZIP code instead.");
      },
      { enableHighAccuracy: false, timeout: 8_000, maximumAge: 10 * 60 * 1000 },
    );
  };

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Lake finder</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Find the Texas lake that fits the way you want to fish.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Search by lake, city, ZIP code, county or Texas region, then select one or several fish species. Results use verified lake-to-species relationships rather than popularity or paid placement.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href={FISHING_LAKE_COMPARE_PATH} className="border-b border-ink-foreground pb-1 font-semibold">Compare lakes side by side →</a><a href="/fishing/species" className="border-b border-ink-foreground/50 pb-1">Browse Texas fish →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <form method="get" action={FISHING_TRIP_PLANNER_PATH} className="border-b border-border pb-10" aria-label="Texas fishing lake finder">
        {browserOrigin ? <>
          <input type="hidden" name="lat" value={search.lat} />
          <input type="hidden" name="lng" value={search.lng} />
          <input type="hidden" name="origin" value={search.origin ?? "My approximate location"} />
        </> : null}
        {view === "map" ? <input type="hidden" name="view" value="map" /> : null}
        <div className="grid gap-7 lg:grid-cols-2">
          <div>
            <label className="block">
              <span className="eyebrow text-primary">Where would you like to go fishing?</span>
              <span className="mt-2 block text-sm text-muted-foreground">Enter a lake, city, ZIP code, county or region.</span>
              <input name="q" defaultValue={search.q ?? ""} disabled={browserOrigin} maxLength={80} placeholder={browserOrigin ? "Using your approximate location" : "Lake Conroe, Houston, 77494, Travis County…"} className="mt-4 w-full border border-border bg-background px-4 py-3 text-base disabled:bg-surface disabled:text-muted-foreground" />
            </label>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button type="button" onClick={useMyLocation} disabled={locating} className="border border-border px-4 py-2 text-sm font-semibold disabled:opacity-60">{locating ? "Finding your location…" : "Use my location"}</button>
              {browserOrigin ? <a href={buildPlannerHref(search, { lat: undefined, lng: undefined, origin: undefined, sort: "best" })} className="border-b border-border pb-1 text-sm text-muted-foreground">Clear location</a> : null}
            </div>
            {origin ? <p className="mt-4 text-sm leading-6 text-muted-foreground">Distance reference: <strong className="text-foreground">{origin.label}</strong>{origin.source === "browser" ? " (rounded before it is added to the search URL)" : ""}.</p> : null}
            {locationQuery && !origin ? <p className="mt-4 text-xs leading-5 text-muted-foreground">This place is being matched against lake names, cities, counties and Texas regions. City and ZIP searches can also provide distance ranking when the location service resolves them.</p> : null}
            {locationError ? <p className="mt-3 text-sm text-destructive" role="alert">{locationError}</p> : null}
          </div>
          <fieldset>
            <legend className="eyebrow text-primary">What would you like to fish for?</legend>
            <p className="mt-2 text-sm text-muted-foreground">Select as many as you want. Group choices such as Catfish include their listed Texas species.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {data.species.map((fish) => <label key={fish.id} className="flex cursor-pointer items-center gap-3 border border-border px-3 py-2.5 text-sm hover:border-primary/60"><input type="checkbox" name="species" value={fish.slug} defaultChecked={(search.species ?? []).includes(fish.slug)} /><span>{fish.commonName}</span></label>)}
            </div>
          </fieldset>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block"><span className="eyebrow text-muted-foreground">Sort results</span><select name="sort" defaultValue={activeSort} className="mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm"><option value="best">Best match</option><option value="closest" disabled={!origin}>Closest{!origin ? " — add a city, ZIP or location" : ""}</option></select></label>
          <label className="block"><span className="eyebrow text-muted-foreground">Distance</span><select name="radius" defaultValue={search.radius ?? ""} disabled={!origin} className="mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm disabled:bg-surface disabled:text-muted-foreground"><option value="">Any distance</option><option value="50">Within 50 miles</option><option value="100">Within 100 miles</option><option value="200">Within 200 miles</option><option value="400">Within 400 miles</option></select></label>
          <label className="mt-6 flex items-center gap-2 text-sm"><input type="checkbox" name="match" value="all" defaultChecked={search.match === "all"} /><span>Require every selected fish</span></label>
        </div>

        <details className="mt-7 border-y border-border py-5" open={hasAdvancedFilters || undefined}>
          <summary className="cursor-pointer text-sm font-semibold">More filters</summary>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Filter name="shore" label="Verified shore or pier access" checked={search.shore === "1"} />
            <Filter name="boat" label="Verified boat or kayak access" checked={search.boat === "1"} />
            <Filter name="camp" label="Verified camping or cabins" checked={search.camp === "1"} />
            <Filter name="guide" label="Verified fishing guide listed" checked={search.guide === "1"} />
            <Filter name="report" label="Current fishing report available" checked={search.report === "1"} />
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Filters use verified fishing records only. TexasDefined does not infer an amenity when the catalog does not support it.</p>
        </details>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <button type="submit" className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Find fishing lakes</button>
          {(search.q || browserOrigin || (search.species?.length ?? 0) > 0 || hasAdvancedFilters) ? <a href={FISHING_TRIP_PLANNER_PATH} className="border-b border-border pb-1 text-sm text-muted-foreground">Clear search</a> : null}
        </div>
      </form>

      <section className="py-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow text-primary">Lake finder results</p><h2 className="mt-2 font-display text-4xl">{ranked.length} matching lake{ranked.length === 1 ? "" : "s"}</h2>{origin ? <p className="mt-2 text-sm text-muted-foreground">Distances are straight-line estimates from {origin.label}.</p> : null}</div>
          <div className="flex flex-wrap items-center gap-4">
            <nav aria-label="Results view" className="flex border border-border text-sm">
              <a href={buildPlannerHref(search, { view: "list" })} aria-current={view === "list" ? "page" : undefined} className={view === "list" ? "bg-foreground px-4 py-2 text-background" : "px-4 py-2"}>List</a>
              <a href={buildPlannerHref(search, { view: "map" })} aria-current={view === "map" ? "page" : undefined} className={view === "map" ? "bg-foreground px-4 py-2 text-background" : "px-4 py-2"}>Map</a>
            </nav>
            <p className="max-w-xl text-xs leading-5 text-muted-foreground">{data.policy.coverage}</p>
          </div>
        </div>

        {view === "map" ? <FishingResultsMap rows={mapRows} /> : <div className="mt-6 grid gap-x-8 lg:grid-cols-2">
          {ranked.map((row) => {
            const currentReport = row.reports.current[0];
            const positiveCoverage = [
              row.shoreAccess ? "Shore/pier access" : null,
              row.boatAccess ? "Boat/kayak access" : null,
              row.camping ? "Camping/cabins" : null,
              row.guides.length ? \`\${row.guides.length} verified guide\${row.guides.length === 1 ? "" : "s"}\` : null,
              row.access.length ? \`\${row.access.length} verified access site\${row.access.length === 1 ? "" : "s"}\` : null,
            ].filter(Boolean);
            const displayTargets = selectedSpecies.length
              ? row.matches.filter((item) => item.target).map((item) => ({ name: item.fish.commonName, quality: item.target!.relation.quality }))
              : row.targets.slice(0, 4).map((item) => ({ name: item.species!.commonName, quality: item.relation.quality }));
            return <article key={row.lake.id} className="border-t border-border py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2"><p className="eyebrow text-primary">{formatRegion(row.lake.region)}</p><span className="border border-border px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">{row.fullGuide ? "Full fishing guide" : "Lake profile"}</span></div>
                  <h3 className="mt-2 font-display text-3xl"><a href={row.href} className="hover:text-primary">{row.lake.name}</a></h3>
                </div>
                <div className="text-right">
                  {row.distanceMiles != null ? <p className="font-display text-2xl">{Math.round(row.distanceMiles)} mi</p> : null}
                  {selectedSpecies.length > 0 ? <span className="text-xs font-semibold text-muted-foreground">{row.matchCount} of {selectedSpecies.length} selected fish</span> : null}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{row.lake.summary}</p>

              <div className="mt-6">
                <p className="eyebrow text-muted-foreground">Why this matches</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {displayTargets.map((target) => <span key={target.name} className="border border-border px-3 py-1.5 text-xs"><strong>{target.name}</strong> · {titleCase(target.quality)}</span>)}
                  {row.distanceMiles != null && origin ? <span className="border border-primary/40 px-3 py-1.5 text-xs text-primary">{Math.round(row.distanceMiles)} miles from {origin.label}</span> : locationQuery && row.location.label ? <span className="border border-primary/40 px-3 py-1.5 text-xs text-primary">{row.location.label}</span> : null}
                </div>
              </div>

              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                {row.lake.counties.length ? <Fact label="County" value={row.lake.counties.join(", ")} /> : null}
                {row.lake.nearestCities.length ? <Fact label="Near" value={row.lake.nearestCities.join(", ")} /> : null}
                {row.lake.surfaceAcres ? <Fact label="Surface area" value={\`\${row.lake.surfaceAcres.toLocaleString("en-US")} acres\`} /> : null}
                {row.lake.maxDepthFeet ? <Fact label="Maximum depth" value={\`\${row.lake.maxDepthFeet} ft\`} /> : null}
              </dl>

              {positiveCoverage.length ? <p className="mt-5 text-xs leading-5 text-muted-foreground">{positiveCoverage.join(" · ")}</p> : null}
              {currentReport ? <div className="mt-5 border-l-2 border-primary pl-4"><p className="eyebrow text-primary">Current report</p><p className="mt-2 text-sm font-semibold"><a href={currentReport.href}>{currentReport.report.title}</a></p><p className="mt-1 text-xs text-muted-foreground">Published {currentReport.report.publishedAt.slice(0, 10)}.</p></div> : null}
              <a href={row.href} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {row.fullGuide ? "fishing guide" : "lake profile"} →</a>
            </article>;
          })}
        </div>}

        {!ranked.length ? <div className="border-y border-border py-12"><h3 className="font-display text-3xl">No lake matches those choices yet.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Try widening the distance, removing an access filter, turning off “require every selected fish,” or selecting fewer species. A missing result means the published fishing dataset does not currently support that combination; it is not a claim that the fish or amenity cannot exist there.</p></div> : null}
      </section>

      <section className="border-y border-border py-10"><p className="eyebrow text-primary">Before you go</p><h2 className="mt-2 font-display text-3xl">Fishery fit is not today's conditions.</h2><p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{data.policy.conditions} Before travel, verify regulations, lake levels, access, weather and closures with current official sources.</p></section>
    </Container>
  </>;
}

function cleanText(value: unknown) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().replace(/\s+/g, " ").slice(0, 80);
  return normalized || undefined;
}

function cleanSlugs(value: unknown) {
  const raw = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  const valid = raw.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]+$/.test(item));
  return [...new Set(valid)].slice(0, 12);
}

function cleanCoordinate(value: unknown, min: number, max: number) {
  const number = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : Number.NaN;
  return Number.isFinite(number) && number >= min && number <= max ? number : undefined;
}

function roundCoordinate(value: number) {
  return Math.round(value * 100) / 100;
}

function scoreTarget(quality?: string) { return quality === "excellent" ? 4 : quality === "good" ? 3 : quality === "fair" ? 2 : quality === "poor" ? 1 : 0; }

function scoreLocation(lake: FishingLake, query: string) {
  if (!query) return { score: 0, label: "" };
  const normalized = query.toLowerCase().replace(/\s+/g, " ").trim();
  const values = [
    lake.name,
    ...(lake.aliases ?? []),
    lake.region,
    formatRegion(lake.region),
    ...lake.counties,
    ...lake.counties.map((county) => \`\${county} county\`),
    ...lake.nearestCities,
  ].map((value) => value.toLowerCase());
  const haystack = values.join(" ");
  const tokens = normalized.split(" ").filter(Boolean);
  if (!tokens.every((token) => haystack.includes(token))) return { score: 0, label: "" };
  const exact = values.find((value) => value === normalized);
  if (exact) return { score: 6, label: \`Location match: \${titleCase(exact)}\` };
  const starts = values.find((value) => value.startsWith(normalized));
  if (starts) return { score: 4, label: \`Location match: \${titleCase(starts)}\` };
  return { score: 2, label: \`Matches “\${query}”\` };
}

function haversineMiles(origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) {
  const radiusMiles = 3_958.8;
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const dLat = radians(destination.lat - origin.lat);
  const dLng = radians(destination.lng - origin.lng);
  const lat1 = radians(origin.lat);
  const lat2 = radians(destination.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return radiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function compareDistance(left: number | null, right: number | null) {
  if (left == null && right == null) return 0;
  if (left == null) return 1;
  if (right == null) return -1;
  return left - right;
}

function buildPlannerHref(search: PlannerSearch, overrides: Partial<PlannerSearch>) {
  const merged = { ...search, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  for (const species of merged.species ?? []) params.append("species", species);
  if (merged.match) params.set("match", merged.match);
  if (typeof merged.lat === "number") params.set("lat", String(merged.lat));
  if (typeof merged.lng === "number") params.set("lng", String(merged.lng));
  if (merged.origin) params.set("origin", merged.origin);
  if (merged.sort) params.set("sort", merged.sort);
  if (merged.view) params.set("view", merged.view);
  if (merged.radius) params.set("radius", merged.radius);
  for (const key of ["shore", "boat", "camp", "guide", "report"] as const) if (merged[key]) params.set(key, "1");
  const query = params.toString();
  return query ? \`\${FISHING_TRIP_PLANNER_PATH}?\${query}\` : FISHING_TRIP_PLANNER_PATH;
}

function formatRegion(value: string) {
  if (value === "prairies-lakes") return "Prairies & Lakes";
  return titleCase(value);
}

function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1">{value}</dd></div>; }
function Filter({ name, label, checked }: { name: "shore" | "boat" | "camp" | "guide" | "report"; label: string; checked: boolean }) { return <label className="flex items-center gap-3 text-sm"><input type="checkbox" name={name} value="1" defaultChecked={checked} /><span>{label}</span></label>; }
