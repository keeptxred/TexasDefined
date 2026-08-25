import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Browse all 254 Texas county guides, combining county facts, communities, official local resources and Texas Defined's long-form county profiles.";

export const Route = createFileRoute("/county")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/county",
      title: "Texas County Guides",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/county")],
  }),
});
