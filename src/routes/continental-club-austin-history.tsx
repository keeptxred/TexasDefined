import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/continental-club-austin-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicVenueGuide } = await import("@/data/texas-music-venue-guides");
    return getTexasMusicVenueGuide("continental-club-austin-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Continental Club Austin History: South Congress Since 1955",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
