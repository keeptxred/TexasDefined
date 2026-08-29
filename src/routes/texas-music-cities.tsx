import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-cities";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { TEXAS_MUSIC_CITIES_HUB_GUIDE } = await import("@/data/texas-music-cities-hub");
    return TEXAS_MUSIC_CITIES_HUB_GUIDE;
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Music Cities: Austin, Houston, San Antonio, DFW & Corpus Christi",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
