import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/victory-grill-austin-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicHistoricVenueGuide } = await import("@/data/texas-music-historic-venue-guides");
    return getTexasMusicHistoricVenueGuide("victory-grill-austin-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Victory Grill Austin History: East Austin & the Chitlin' Circuit",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
