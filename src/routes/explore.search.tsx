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
      title: "Find Somewhere Worth the Drive",
      description: "Find parks, lakes, rivers, caverns, trails, historic places and other Texas destinations worth the drive.",
      canonicalPath: "/explore/search",
      robots: "noindex, follow",
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
      <p className="eyebrow text-primary">Find a place</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Where should we go next?</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Search for a park, lake, small town, trail or landmark and see what is worth the drive.
      </p>
      <form action="/explore/search" className="mt-8 flex max-w-2xl gap-3" role="search">
        <label htmlFor="explore-query" className="sr-only">Find somewhere worth the drive</label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input id="explore-query" name="q" defaultValue={q} className="h-12 w-full border border-border bg-background pl-12 pr-4" placeholder="Try a park, lake, town or trail" />
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
              <p className="text-muted-foreground">Nothing quite matched. Try a nearby town, park, lake or part of the state instead.</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
