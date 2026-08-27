import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/gruene-hall-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicVenueGuide } = await import("@/data/texas-music-venue-guides");
    return getTexasMusicVenueGuide("gruene-hall-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Gruene Hall History: Texas Dance Hall Since 1878",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
