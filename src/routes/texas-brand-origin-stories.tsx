import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-brand-origin-stories";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { TEXAS_BRAND_ORIGINS_GUIDE } = await import("@/data/texas-evergreen-guides-batch3");
    return TEXAS_BRAND_ORIGINS_GUIDE;
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Brand Origin Stories: Six Local Names That Became Icons",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
