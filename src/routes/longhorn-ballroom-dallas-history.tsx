import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/longhorn-ballroom-dallas-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicHistoricVenueGuide } = await import("@/data/texas-music-historic-venue-guides");
    return getTexasMusicHistoricVenueGuide("longhorn-ballroom-dallas-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Longhorn Ballroom Dallas History: Bob Wills to Punk",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
