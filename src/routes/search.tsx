import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { searchDocumentsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: "Search Texas Defined", description: "Find stories, places, painted churches, sports venues, guides, events and shop picks from across Texas.", canonicalPath: "/search", robots: "noindex, follow" }), links: [canonicalLink(texasDefinedBrand, "/search")] }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(searchDocumentsQuery()); },
});

export function TexasExplainedSearchDiscovery() {
  return <Link to="/texas-explained" className="group mt-7 grid gap-4 border-l-2 border-primary bg-surface px-6 py-7 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_auto] sm:items-end sm:px-8">
    <div className="max-w-3xl">
      <p className="eyebrow text-primary">Texas Explained</p>
      <h3 className="mt-2 font-display text-3xl leading-tight transition-colors group-hover:text-primary">Want the why behind Texas?</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">Start with ten connected guides to the rivers, reservoirs, roads, towns, plants, wildlife, homes, land and migration patterns that make the state work the way it does.</p>
    </div>
    <span className="eyebrow inline-block border-b border-primary pb-1 text-primary">Read all 10 guides →</span>
  </Link>;
}
