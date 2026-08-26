import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/antones-austin-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicVenueGuide } = await import("@/data/texas-music-venue-guides");
    return getTexasMusicVenueGuide("antones-austin-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Antone's Austin History: Texas Blues Club Since 1975",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
