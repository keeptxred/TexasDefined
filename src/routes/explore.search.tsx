import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({ q: z.string().optional().catch("") });

export const Route = createFileRoute("/explore/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Find Somewhere Worth the Drive",
      description: "Find parks, lakes, rivers, caverns, trails, historic places and other Texas destinations worth the drive.",
      canonicalPath: "/explore/search",
      robots: "noindex, follow",
    }),
    links: [canonicalLink(texasDefinedBrand, "/explore/search")],
  }),
  component: ExploreSearchPage,
});

function normalized(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function searchText(destination: Destination) {
  return normalized([
    destination.name,
    destination.summary,
    destination.category.replace(/-/g, " "),
    destination.region.replace(/-/g, " "),
    destination.nearestTown,
    destination.county,
    destination.managingAuthority,
    destination.bestSeason,
    ...destination.highlights,
  ].filter(Boolean).join(" "));
}

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
  const { q = "" } = Route.useSearch();
  const { data: catalog = [], isLoading, error } = useQuery(destinationsQuery({ limit: 5000 }));
  const data = useMemo(() => catalog
    .map((destination) => ({ destination, score: scoreDestination(destination, q) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.destination.name.localeCompare(right.destination.name))
    .slice(0, 100)
    .map((item) => item.destination), [catalog, q]);

  return (
    <Container className="py-16 sm:py-24">
      <p className="eyebrow text-primary">Find a place</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Where should we go next?</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Search by destination, town, county, activity, facility, managing agency or part of Texas.
      </p>
      <form action="/explore/search" className="mt-8 flex max-w-2xl gap-3" role="search">
        <label htmlFor="explore-query" className="sr-only">Find somewhere worth the drive</label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input id="explore-query" name="q" defaultValue={q} className="h-12 w-full border border-border bg-background pl-12 pr-4" placeholder="Try camping, Somervell County or a park name" />
        </div>
        <button className="h-12 bg-primary px-6 font-semibold text-primary-foreground" type="submit">Find it</button>
      </form>

      <div className="mt-10">
        {isLoading && <p className="text-muted-foreground">Looking for places worth the drive…</p>}
        {error && (
          <p className="text-muted-foreground">
            We could not reach every place just now. <Link to="/explore" className="text-primary underline">Start with our editor’s picks instead.</Link>
          </p>
        )}
        {!isLoading && !error && (
          <>
            {data.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">{data.length} good match{data.length === 1 ? "" : "es"}{q ? ` for “${q}”` : ""}</p>
                <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((destination) => (
                    <li key={destination.id}>
                      <DestinationCard destination={destination} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-muted-foreground">Nothing quite matched. Try an activity, nearby town, county, park, lake or part of the state instead.</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
