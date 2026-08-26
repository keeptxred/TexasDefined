import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/armadillo-world-headquarters-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicHistoricVenueGuide } = await import("@/data/texas-music-historic-venue-guides");
    return getTexasMusicHistoricVenueGuide("armadillo-world-headquarters-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Armadillo World Headquarters History: Austin Music, 1970–1980",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
