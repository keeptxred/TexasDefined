import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { getCampingSearchIndex } from "@/data/camping/camping-profiles";
import { distanceMiles } from "@/data/destination-relationships";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const text = z.string().optional().catch("");
const searchSchema = z.object({ q: text, category: text, region: text, season: text, accessible: text, origin: text, radius: text });
const selectClass = "mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary";
const seasons = ["spring", "summer", "fall", "winter"];
const radiusOptions = [25, 50, 75, 100, 200];

export const Route = createFileRoute("/explore/search")({
  validateSearch: searchSchema,
  loader: async () => ({ campingSearchIndex: await getCampingSearchIndex() }),
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: "Search the Texas Travel Guide", description: "Find parks, lakes, rivers, campgrounds, outdoor lodging, caverns, trails, historic places and other Texas destinations.", canonicalPath: "/explore/search", robots: "noindex, follow" }), links: [canonicalLink(texasDefinedBrand, "/explore/search")] }),
  component: ExploreSearchPage,
});

function normalized(value: string) { return value.toLowerCase().trim().replace(/\s+/g, " "); }
function formatLabel(value: string) { return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function searchText(destination: Destination, campingTerms: string[] = []) { return normalized([destination.name, destination.summary, destination.category.replace(/-/g, " "), destination.region.replace(/-/g, " "), destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights, ...campingTerms].filter(Boolean).join(" ")); }
function scoreDestination(destination: Destination, query: string, campingTerms: string[] = []) {
  const q = normalized(query);
  if (!q) return destination.featured ? 5 : 1;
  const name = normalized(destination.name);
  const slug = normalized(destination.slug.replace(/-/g, " "));
  const town = normalized(destination.nearestTown);
  const county = normalized(destination.county ?? "");
  const campingHaystack = normalized(campingTerms.join(" "));
  const haystack = searchText(destination, campingTerms);
  const terms = q.split(" ").filter(Boolean);
  if (!terms.every((term) => haystack.includes(term))) return 0;
  let score = 10;
  if (name === q || slug === q) score += 100;
  else if (name.startsWith(q) || slug.startsWith(q)) score += 70;
  else if (name.includes(q) || slug.includes(q)) score += 50;
  if (campingHaystack === q) score += 60;
  else if (campingHaystack.includes(q)) score += 28;
  if (town === q || county === q) score += 35;
  if (town.includes(q) || county.includes(q)) score += 20;
  if (normalized(destination.category.replace(/-/g, " ")).includes(q)) score += 12;
  if (destination.featured) score += 5;
  return score;
}

function resolveOrigin(catalog: Destination[], value: string) {
  const target = normalized(value);
  if (!target) return null;
  return catalog.find((destination) => normalized(destination.name) === target
    || normalized(destination.slug) === target
    || normalized(destination.slug.replace(/-/g, " ")) === target) ?? null;
}

function ExploreSearchPage() {
  const { q, category, region, season, accessible } = Route.useSearch();
  const { origin, radius } = Route.useSearch();
  const { campingSearchIndex } = Route.useLoaderData();
  const { data: catalog = [], isLoading, error } = useQuery(destinationsQuery({ limit: 5000 }));
  const campingTermsByDestination = useMemo(() => new Map(campingSearchIndex.map((entry) => [entry.destinationSlug, entry.terms] as const)), [campingSearchIndex]);
  const categories = useMemo(() => [...new Set(catalog.map((destination) => destination.category))].sort(), [catalog]);
  const regions = useMemo(() => [...new Set(catalog.map((destination) => destination.region))].sort(), [catalog]);
  const requestedOrigin = Boolean(origin.trim());
  const originDestination = useMemo(() => resolveOrigin(catalog, origin), [catalog, origin]);
  const requestedRadius = Number(radius);
  const radiusMiles = radiusOptions.includes(requestedRadius) ? requestedRadius : 75;
  const radiusFilterActive = requestedOrigin && Boolean(originDestination);
  const hasFilters = Boolean(q || category || region || season || accessible || origin);
  const data = useMemo(() => {
    const wantedSeason = normalized(season);
    return catalog
      .filter((destination) => (!category || destination.category === category) && (!region || destination.region === region) && (!season || normalized(destination.bestSeason).includes(wantedSeason)) && (accessible !== "1" || Boolean(destination.accessibilityNotes)))
      .map((destination) => ({ destination, score: scoreDestination(destination, q, campingTermsByDestination.get(destination.slug) ?? []), miles: originDestination ? distanceMiles(originDestination, destination) : null }))
      .filter((item) => item.score > 0 && (!radiusFilterActive || (item.miles !== null && item.miles <= radiusMiles)))
      .sort((left, right) => {
        const scoreDelta = right.score - left.score;
        const distanceDelta = (left.miles ?? Number.POSITIVE_INFINITY) - (right.miles ?? Number.POSITIVE_INFINITY);
        if (radiusFilterActive && !q) return distanceDelta || scoreDelta || left.destination.name.localeCompare(right.destination.name);
        if (radiusFilterActive) return scoreDelta || distanceDelta || left.destination.name.localeCompare(right.destination.name);
        return scoreDelta || left.destination.name.localeCompare(right.destination.name);
      })
      .slice(0, 100)
      .map((item) => item.destination);
  }, [catalog, q, category, region, season, accessible, campingTermsByDestination, originDestination, radiusFilterActive, radiusMiles]);

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">Search</li></ol></nav>
        <p className="eyebrow mt-8 text-primary">Search the travel guide</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Find the Texas place you have in mind.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Search by destination, town, county, campground name, camping style, landscape, activity or the kind of day you want to plan. Narrow by region, type, season, accessibility information or straight-line distance from an exact TexasDefined destination.</p>
        <form action="/explore/search" className="mt-9 max-w-4xl" role="search">
          <div className="flex border-b-2 border-foreground">
            <label htmlFor="explore-query" className="sr-only">Search the Texas travel guide</label>
            <input id="explore-query" name="q" defaultValue={q} className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" placeholder="Pine Springs Campground, full hookups, Marfa, Somervell County…" />
            <button className="eyebrow shrink-0 px-2 py-4 text-primary" type="submit">Search / apply →</button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label><span className="eyebrow text-muted-foreground">Near destination</span><input name="origin" defaultValue={origin} className={selectClass} placeholder="Exact destination name or slug" /></label>
            <label><span className="eyebrow text-muted-foreground">Within</span><select name="radius" defaultValue={radiusOptions.includes(requestedRadius) ? String(requestedRadius) : "75"} className={selectClass}>{radiusOptions.map((miles) => <option key={miles} value={miles}>{miles} miles</option>)}</select></label>
            <label><span className="eyebrow text-muted-foreground">Region</span><select name="region" defaultValue={region} className={selectClass}><option value="">All regions</option>{regions.map((value) => <option key={value} value={value}>{formatLabel(value)}</option>)}</select></label>
            <label><span className="eyebrow text-muted-foreground">Type</span><select name="category" defaultValue={category} className={selectClass}><option value="">All destination types</option>{categories.map((value) => <option key={value} value={value}>{formatLabel(value)}</option>)}</select></label>
            <label><span className="eyebrow text-muted-foreground">Season</span><select name="season" defaultValue={season} className={selectClass}><option value="">Any season</option>{seasons.map((value) => <option key={value} value={value}>{formatLabel(value)}</option>)}</select></label>
            <label className="flex items-end gap-2 border-b border-border py-3 text-sm"><input type="checkbox" name="accessible" value="1" defaultChecked={accessible === "1"} className="mb-0.5" /><span>Accessibility info available</span></label>
          </div>
          {requestedOrigin && originDestination && <p className="mt-4 text-sm leading-6 text-muted-foreground">Radius uses straight-line distance between destination coordinates, not driving distance. Filtering within {radiusMiles} miles of <strong className="font-medium text-foreground">{originDestination.name}</strong>.</p>}
          {!isLoading && requestedOrigin && !originDestination && <p className="mt-4 text-sm leading-6 text-destructive">Radius filter not applied: enter the exact destination name or slug from the TexasDefined guide.</p>}
          {hasFilters && <Link to="/explore/search" className="eyebrow mt-5 inline-block border-b border-border pb-1 text-muted-foreground hover:text-foreground">Clear search & filters</Link>}
        </form>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      {isLoading && <p className="text-sm text-muted-foreground">Searching the Texas guide…</p>}
      {error && <div className="border-t border-border pt-6"><p className="font-display text-3xl">The full destination catalog is temporarily unavailable.</p><p className="mt-3 text-sm text-muted-foreground"><Link to="/explore" className="border-b border-primary text-primary">Browse the editor’s selections instead.</Link></p></div>}
      {!isLoading && !error && <>
        {data.length > 0 ? <>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5"><div><p className="eyebrow text-primary">Places</p><h2 className="mt-2 font-display text-3xl">{hasFilters ? "Matching Texas destinations" : "Browse the destination guide"}</h2></div><p className="text-sm text-muted-foreground">{data.length.toLocaleString("en-US")} {data.length === 1 ? "place" : "places"}</p></div>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{data.map((destination) => <li key={destination.id}>{radiusFilterActive && originDestination && <p className="eyebrow mb-2 text-muted-foreground">{Math.round(distanceMiles(originDestination, destination) ?? 0)} miles away</p>}<DestinationCard destination={destination} /></li>)}</ul>
        </> : <div className="border-t border-border pt-8"><p className="font-display text-3xl">Nothing in the guide matched those choices.</p><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Broaden a filter, increase the radius or try another destination, campground name, camping style, nearby town, county, park or lake.</p><div className="mt-6 flex flex-wrap gap-6"><Link to="/explore/search" className="eyebrow border-b border-primary pb-1 text-primary">Clear filters →</Link><Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a trip instead →</Link><Link to="/best-places-to-go-camping-in-texas" className="eyebrow border-b border-primary pb-1 text-primary">Browse camping & RV →</Link><Link to="/explore" className="eyebrow border-b border-primary pb-1 text-primary">Browse Explore Texas →</Link></div></div>}
      </>}
    </Container>
  </>;
}
