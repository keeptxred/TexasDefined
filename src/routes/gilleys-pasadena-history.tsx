import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/gilleys-pasadena-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicHistoricVenueGuide } = await import("@/data/texas-music-historic-venue-guides");
    return getTexasMusicHistoricVenueGuide("gilleys-pasadena-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Gilley's Pasadena History: The Original Urban Cowboy Honky-Tonk",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
