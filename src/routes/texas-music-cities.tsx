import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
const canonicalPath = "/texas-music-cities";
export const Route = createFileRoute(canonicalPath)({
  loader: async () => { const { getTexasMusicCityGuide } = await import("@/data/texas-music-city-guides"); return getTexasMusicCityGuide("texas-music-cities"); },
  head: ({ loaderData: guide }) => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Music Cities: Austin, Houston, San Antonio, Corpus Christi & More", description: guide.dek, type: "article" }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] }),
});
