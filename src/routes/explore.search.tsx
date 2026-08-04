import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({ q: z.string().optional().catch("") });

export const Route = createFileRoute("/explore/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Search Texas Destinations",
      description: "Search Texas parks, lakes, rivers, caverns, trails, historic places, and outdoor destinations.",
    }),
    links: [canonicalLink(texasDefinedBrand, "/explore/search")],
  }),
  component: ExploreSearchPage,
});

function ExploreSearchPage() {
  const { q = "" } = Route.useSearch();
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["explore-search", q],
    queryFn: () => fetchExploreDestinations({ query: q, limit: 100 }),
  });

  return (
    <Container className="py-16 sm:py-24">
      <p className="eyebrow text-primary">Explore Texas</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Search Texas destinations</h1>
      <form action="/explore/search" className="mt-8 flex max-w-2xl gap-3" role="search">
        <label htmlFor="explore-query" className="sr-only">Search Texas destinations</label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input id="explore-query" name="q" defaultValue={q} className="h-12 w-full border border-border bg-background pl-12 pr-4" placeholder="Search parks, lakes, caverns, rivers…" />
        </div>
        <button className="h-12 bg-primary px-6 font-semibold text-primary-foreground" type="submit">Search</button>
      </form>

      <div className="mt-10">
        {isLoading && <p className="text-muted-foreground">Searching Texas destinations…</p>}
        {error && <p className="text-muted-foreground">The live catalog is not configured yet. Explore the featured destinations instead.</p>}
        {!isLoading && !error && (
          <>
            <p className="text-sm text-muted-foreground">{data.length} result{data.length === 1 ? "" : "s"}{q ? ` for “${q}”` : ""}</p>
            <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((destination) => (
                <li key={destination.id}>
                  <Link to="/destination/$slug" params={{ slug: destination.slug }} className="block">
                    <DestinationCard destination={destination} />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Container>
  );
}
