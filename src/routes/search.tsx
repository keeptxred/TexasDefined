import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { searchDocumentsQuery } from "@/data/queries";
import type { SearchDocument } from "@/data/types";
import { search, type SearchHit } from "@/domain/search/engine";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Search Texas Defined",
      description: "Find Texas stories, destinations, guides, events and goods worth knowing about.",
      canonicalPath: "/search",
      robots: "noindex, follow",
    }),
    links: [canonicalLink(texasDefinedBrand, "/search")],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(searchDocumentsQuery());
  },
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { data: documents } = useSuspenseQuery(searchDocumentsQuery());
  const query = (q ?? "").trim();
  const {
    data: remoteDestinations = [],
    isLoading: isLoadingDestinations,
    isError: destinationSearchUnavailable,
  } = useQuery({
    queryKey: ["site-search-explore", query],
    queryFn: () => fetchExploreDestinations({ query, limit: 250 }),
    enabled: Boolean(query),
    staleTime: 5 * 60 * 1000,
  });

  const remoteDocuments: SearchDocument[] = remoteDestinations.map((destination) => ({
    id: `remote-destination-${destination.id}`,
    brandId: "texasdefined",
    kind: "destination",
    title: destination.name,
    summary: destination.summary,
    keywords: [
      destination.name,
      destination.nearestTown,
      destination.category,
      destination.region,
      ...destination.highlights,
    ],
    href: `/destination/${destination.slug}`,
  }));

  const allDocuments = [...new Map(
    [...documents, ...remoteDocuments].map((document) => [document.href, document]),
  ).values()];
  const results: SearchHit[] = query
    ? search(allDocuments, { term: query, brandId: texasDefinedBrand.identity.id })
    : [];
  const searchIsLoading = Boolean(query) && isLoadingDestinations;

  return (
    <Container className="min-h-[60vh] py-16 sm:py-24">
      <p className="eyebrow text-primary">Find your way around</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">What are you looking for?</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        Try a lake, town, state park, cavern, historic place, Texas tradition, practical question or favorite dish.
      </p>
      <form
        className="mt-8 flex max-w-xl gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          const value = new FormData(event.currentTarget).get("q");
          void navigate({ search: { q: String(value ?? "") } });
        }}
      >
        <label htmlFor="q" className="sr-only">Search Texas Defined</label>
        <input id="q" name="q" defaultValue={query} placeholder="Caddo Lake, a cavern, brisket, property taxes…" className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
        <button type="submit" className="shrink-0 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Find it</button>
      </form>

      {searchIsLoading && (
        <p className="mt-6 text-sm text-muted-foreground">Searching the full Texas destination catalog…</p>
      )}
      {query && !searchIsLoading && results.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} good match{results.length === 1 ? "" : "es"} for “{query}”
        </p>
      )}
      {query && !searchIsLoading && results.length === 0 && (
        <p className="mt-8 max-w-xl border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          We couldn't find a match for “{query}.” Try a broader place name, topic or Texas landmark.
        </p>
      )}
      {destinationSearchUnavailable && query && (
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
          The full destination catalog could not be reached, so these results may be limited to the locally available stories and guides.
        </p>
      )}

      <ul className="mt-8 max-w-2xl">
        {results.map((result) => (
          <li key={`${result.document.kind}-${result.document.id}`} className="border-t border-border py-5">
            <p className="eyebrow text-primary">{kindLabel(result.document.kind)}</p>
            <Link to={result.document.href} className="mt-1 block font-display text-xl">{result.document.title}</Link>
            <p className="mt-1 text-sm text-muted-foreground">{result.document.summary}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

function kindLabel(kind: string) {
  const labels: Record<string, string> = {
    article: "Story",
    destination: "Place worth knowing",
    event: "This weekend",
    guide: "Helpful guide",
    calculator: "Calculator",
    product: "From the shop",
    collection: "Our picks",
    city: "City guide",
    county: "County guide",
  };
  return labels[kind.toLowerCase()] ?? kind.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
