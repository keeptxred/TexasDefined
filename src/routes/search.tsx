import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { searchDocumentsQuery } from "@/data/queries";
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
  const query = q ?? "";
  const results: SearchHit[] = query
    ? search(documents, { term: query, brandId: texasDefinedBrand.identity.id })
    : [];

  return (
    <Container className="min-h-[60vh] py-16 sm:py-24">
      <p className="eyebrow text-primary">Find your way around</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">What are you looking for?</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        Try a lake, town, state park, Texas tradition, practical question or favorite dish.
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
        <input id="q" name="q" defaultValue={query} placeholder="Caddo Lake, brisket, property taxes…" className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
        <button type="submit" className="shrink-0 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Find it</button>
      </form>

      {query && results.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} good match{results.length === 1 ? "" : "es"} for “{query}”
        </p>
      )}
      {query && results.length === 0 && (
        <p className="mt-8 max-w-xl border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          We couldn't find a match for “{query}.” Try a broader place name, topic or Texas landmark.
        </p>
      )}

      <ul className="mt-8 max-w-2xl">
        {results.map((result) => (
          <li key={result.document.id} className="border-t border-border py-5">
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
