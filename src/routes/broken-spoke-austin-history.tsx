import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/broken-spoke-austin-history";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicVenueGuide } = await import("@/data/texas-music-venue-guides");
    return getTexasMusicVenueGuide("broken-spoke-austin-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Broken Spoke Austin History: Country Music & Two-Stepping",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
