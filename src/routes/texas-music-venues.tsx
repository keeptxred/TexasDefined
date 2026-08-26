import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-venues";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicVenueGuide } = await import("@/data/texas-music-venue-guides");
    return getTexasMusicVenueGuide("texas-music-venues");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Legendary Texas Music Venues: Dance Halls, Honky-Tonks & Clubs",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
