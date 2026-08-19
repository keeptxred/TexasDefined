import { createFileRoute } from "@tanstack/react-router";
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
