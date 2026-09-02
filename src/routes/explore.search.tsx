import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { texasDefinedBrand } from "@/brand/texasdefined";
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
});
