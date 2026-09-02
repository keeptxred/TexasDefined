import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
  category: z.string().optional().catch(""),
  region: z.string().optional().catch(""),
  season: z.string().optional().catch(""),
  accessible: z.string().optional().catch(""),
});

export const Route = createFileRoute("/explore/search")({
  validateSearch: searchSchema,
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: "Search the Texas Travel Guide", description: "Find parks, lakes, rivers, caverns, trails, historic places and other Texas destinations.", canonicalPath: "/explore/search", robots: "noindex, follow" }), links: [canonicalLink(texasDefinedBrand, "/explore/search")] }),
  component: ExploreSearchPage,
});

function normalized(value: string) { return value.toLowerCase().trim().replace(/\s+/g, " "); }
function formatLabel(value: string) { return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function searchText(destination: Destination) { return normalized([destination.name, destination.summary, destination.category.replace(/-/g, " "), destination.region.replace(/-/g, " "), destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights].filter(Boolean).join(" ")); }
function scoreDestination(destination: Destination, query: string) {
  const q = normalized(query);
  if (!q) return destination.featured ? 5 : 1;
  const name = normalized(destination.name);
  const slug = normalized(destination.slug.replace(/-/g, " "));
  const town = normalized(destination.nearestTown);
  const county = normalized(destination.county ?? "");
  const haystack = searchText(destination);
  const terms = q.split(" ").filter(Boolean);
  if (!terms.every((term) => haystack.includes(term))) return 0;
  let score = 10;
  if (name === q || slug === q) score += 100;
  else if (name.startsWith(q) || slug.startsWith(q)) score += 70;
  else if (name.includes(q) || slug.includes(q)) score += 50;
  if (town === q || county === q) score += 35;
  if (town.includes(q) || county.includes(q)) score += 20;
  if (normalized(destination.category.replace(/-/g, " ")).includes(q)) score += 12;
  if (destination.featured) score += 5;
  return score;
}

function ExploreSearchPage() {
  const { q = "", category = "", region = "", season = "", accessible = "" } = Route.useSearch();
  const { data: catalog = [], isLoading, error } = useQuery(destinationsQuery({ limit: 5000 }));
  const categories = useMemo(() => [...new Set(catalog.map((destination) => destination.category))].sort(), [catalog]);
  const regions = useMemo(() => [...new Set(catalog.map((destination) => destination.region))].sort(), [catalog]);
  const hasFilters = Boolean(q || category || region || season || accessible);
  const data = useMemo(() => catalog
    .filter((destination) => !category || destination.category === category)
    .filter((destination) => !region || destination.region === region)
    .filter((destination) => !season || normalized(destination.bestSeason).includes(normalized(season)))
    .filter((destination) => accessible !== "1" || Boolean(destination.accessibilityNotes))
    .map((destination) => ({ destination, score: scoreDestination(destination, q) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.destination.name.localeCompare(right.destination.name))
    .slice(0, 100)
    .map((item) => item.destination), [catalog, q, category, region, season, accessible]);

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">Search</li></ol></nav>
        <p className="eyebrow mt-8 text-primary">Search the travel guide</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Find the Texas place you have in mind.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Search by destination, town, county, landscape, activity or the kind of day you want to plan, then narrow the guide by region, destination type, season or availability of accessibility information.</p>
        <form action="/explore/search" className="mt-9 max-w-4xl" role="search">
          <div className="flex border-b-2 border-foreground">
            <label htmlFor="explore-query" className="sr-only">Search the Texas travel guide</label>
            <input id="explore-query" name="q" defaultValue={q} className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" placeholder="Caddo Lake, camping, Marfa, Somervell County…" />
            <button className="eyebrow shrink-0 px-2 py-4 text-primary" type="submit">Search →</button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block"><span className="eyebrow text-muted-foreground">Region</span><select name="region" defaultValue={region} className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary"><option value="">All regions</option>{regions.map((value) => <option key={value} value={value}>{formatLabel(value)}</option>)}</select></label>
            <label className="block"><span className="eyebrow text-muted-foreground">Type</span><select name="category" defaultValue={category} className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary"><option value="">All destination types</option>{categories.map((value) => <option key={value} value={value}>{formatLabel(value)}</option>)}</select></label>
            <label className="block"><span className="eyebrow text-muted-foreground">Season</span><select name="season" defaultValue={season} className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary"><option value="">Any season</option><option value="spring">Spring</option><option value="summer">Summer</option><option value="fall">Fall</option><option value="winter">Winter</option></select></label>
            <label className="flex items-end gap-2 border-b border-border py-3 text-sm"><input type="checkbox" name="accessible" value="1" defaultChecked={accessible === "1"} className="mb-0.5" /><span>Accessibility info available</span></label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-5"><button className="eyebrow border-b border-primary pb-1 text-primary" type="submit">Apply filters →</button>{hasFilters && <Link to="/explore/search" className="eyebrow border-b border-border pb-1 text-muted-foreground hover:text-foreground">Clear search & filters</Link>}</div>
        </form>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      {isLoading && <p className="text-sm text-muted-foreground">Searching the Texas guide…</p>}
      {error && <div className="border-t border-border pt-6"><p className="font-display text-3xl">The full destination catalog is temporarily unavailable.</p><p className="mt-3 text-sm text-muted-foreground"><Link to="/explore" className="border-b border-primary text-primary">Browse the editor’s selections instead.</Link></p></div>}
      {!isLoading && !error && <>
        {data.length > 0 ? <>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5"><div><p className="eyebrow text-primary">Places</p><h2 className="mt-2 font-display text-3xl">{hasFilters ? "Matching Texas destinations" : "Browse the destination guide"}</h2>{hasFilters && <p className="mt-2 text-sm text-muted-foreground">Results reflect your search and selected travel filters.</p>}</div><p className="text-sm text-muted-foreground">{data.length.toLocaleString("en-US")} {data.length === 1 ? "place" : "places"}</p></div>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{data.map((destination) => <li key={destination.id}><DestinationCard destination={destination} /></li>)}</ul>
        </> : <div className="border-t border-border pt-8"><p className="font-display text-3xl">Nothing in the guide matched those choices.</p><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Broaden the destination type, region, season or accessibility filter, or try a nearby town, county, park or lake.</p><div className="mt-6 flex flex-wrap gap-6"><Link to="/explore/search" className="eyebrow border-b border-primary pb-1 text-primary">Clear filters →</Link><Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a trip instead →</Link><Link to="/explore" className="eyebrow border-b border-primary pb-1 text-primary">Browse Explore Texas →</Link></div></div>}
      </>}
    </Container>
  </>;
}