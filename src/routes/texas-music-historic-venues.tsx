import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-historic-venues";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicHistoricVenueGuide } = await import("@/data/texas-music-historic-venue-guides");
    return getTexasMusicHistoricVenueGuide("texas-music-historic-venues");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Historic & Lost Texas Music Rooms: Clubs, Ballrooms & Honky-Tonks",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
