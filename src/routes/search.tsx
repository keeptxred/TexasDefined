import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { searchDocumentsQuery } from "@/data/queries";
import { searchDocuments } from "@/domain/search/engine";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      ...buildMeta(texasDefinedBrand, {
        title: "Search",
        description: "Search stories, destinations, guides, events and shop goods across Texas.",
      }),
      { name: "robots", content: "noindex" },
    ],
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
  const results = query ? searchDocuments(documents, query, texasDefinedBrand.id) : [];

  return (
    <Container className="min-h-[60vh] py-16 sm:py-24">
      <p className="eyebrow text-primary">Search</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Find it</h1>
      <form
        className="mt-8 flex max-w-xl gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          const value = new FormData(event.currentTarget).get("q");
          void navigate({ search: { q: String(value ?? "") } });
        }}
      >
        <label htmlFor="q" className="sr-only">
          Search TexasDefined
        </label>
        <input
          id="q"
          name="q"
          defaultValue={query}
          placeholder="Caddo Lake, brisket, property tax…"
          className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="shrink-0 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Search
        </button>
      </form>

      {query && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </p>
      )}

      <ul className="mt-8 max-w-2xl">
        {results.map((result) => (
          <li key={result.document.id} className="border-t border-border py-5">
            <p className="eyebrow text-primary">{result.document.kind}</p>
            <Link to={result.document.href} className="mt-1 block font-display text-xl">
              {result.document.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{result.document.summary}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
