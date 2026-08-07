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
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: "Search Texas Defined", description: "Find stories, places, guides, events and shop picks from across Texas.", canonicalPath: "/search", robots: "noindex, follow" }), links: [canonicalLink(texasDefinedBrand, "/search")] }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(searchDocumentsQuery()); },
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { data: documents } = useSuspenseQuery(searchDocumentsQuery());
  const query = (q ?? "").trim();
  const { data: remoteDestinations = [], isLoading: isLoadingDestinations, isError: destinationSearchUnavailable } = useQuery({ queryKey: ["site-search-explore", query], queryFn: () => fetchExploreDestinations({ query, limit: 250 }), enabled: Boolean(query), staleTime: 5 * 60 * 1000 });
  const remoteDocuments: SearchDocument[] = remoteDestinations.map((destination) => ({ id: `remote-destination-${destination.id}`, brandId: "texasdefined", kind: "destination", title: destination.name, summary: destination.summary, keywords: [destination.name, destination.nearestTown, destination.category, destination.region, ...destination.highlights], href: `/destination/${destination.slug}` }));
  const allDocuments = [...new Map([...documents, ...remoteDocuments].map((document) => [document.href, document])).values()];
  const results: SearchHit[] = query ? search(allDocuments, { term: query, brandId: texasDefinedBrand.identity.id }) : [];
  const searchIsLoading = Boolean(query) && isLoadingDestinations;

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <p className="eyebrow text-primary">Search the magazine</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] sm:text-7xl">Find a place, story or useful answer.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Search Texas Defined by town, landmark, subject, guide, event or something you simply want to know more about.</p>
        <form className="mt-9 flex max-w-2xl border-b-2 border-foreground" onSubmit={(event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get("q"); void navigate({ search: { q: String(value ?? "") } }); }}>
          <label htmlFor="q" className="sr-only">Search Texas Defined</label>
          <input id="q" name="q" defaultValue={query} placeholder="Caddo Lake, Marfa, brisket, property taxes…" className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" />
          <button type="submit" className="eyebrow shrink-0 px-2 py-4 text-primary">Search →</button>
        </form>
      </Container>
    </section>

    <Container className="min-h-[42vh] py-12 sm:py-16">
      {searchIsLoading && <p className="text-sm text-muted-foreground">Searching Texas Defined…</p>}
      {query && !searchIsLoading && results.length > 0 && <div className="flex items-end justify-between gap-4 border-b border-border pb-4"><div><p className="eyebrow text-primary">Results</p><h2 className="mt-2 font-display text-3xl">For “{query}”</h2></div><p className="text-sm text-muted-foreground">{results.length} result{results.length === 1 ? "" : "s"}</p></div>}
      {query && !searchIsLoading && results.length === 0 && <div className="max-w-xl border-t border-border pt-6"><p className="eyebrow text-primary">No results</p><h2 className="mt-3 font-display text-3xl">Nothing matched “{query}.”</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Try a nearby town, a broader subject or the name of a landmark.</p></div>}
      {destinationSearchUnavailable && query && <p className="mt-4 max-w-xl text-xs leading-6 text-muted-foreground">Some destination records were temporarily unavailable, so this result set may be shorter than usual.</p>}
      <ul className="mt-2 max-w-3xl divide-y divide-border">
        {results.map((result) => <li key={`${result.document.kind}-${result.document.id}`} className="py-7"><p className="eyebrow text-primary">{kindLabel(result.document.kind)}</p><Link to={result.document.href} className="mt-2 block font-display text-2xl leading-tight transition-colors hover:text-primary">{result.document.title}</Link><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{result.document.summary}</p></li>)}
      </ul>
    </Container>
  </>;
}

function kindLabel(kind: string) {
  const labels: Record<string, string> = { article: "Story", destination: "Destination", event: "Calendar", guide: "Guide", calculator: "Calculator", product: "Shop", collection: "Collection", city: "City guide", county: "County guide" };
  return labels[kind.toLowerCase()] ?? kind.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
