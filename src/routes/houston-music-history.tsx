import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
const canonicalPath = "/houston-music-history";
export const Route = createFileRoute(canonicalPath)({
  loader: async () => { const { getTexasMusicCityGuide } = await import("@/data/texas-music-city-guides"); return getTexasMusicCityGuide("houston-music-history"); },
  head: ({ loaderData: guide }) => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Houston Music History: Blues, R&B, Gospel & Hip-Hop", description: guide.dek, type: "article" }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] }),
});
