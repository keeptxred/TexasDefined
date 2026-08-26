import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
const canonicalPath = "/san-antonio-music-history";
export const Route = createFileRoute(canonicalPath)({
  loader: async () => { const { getTexasMusicCityGuide } = await import("@/data/texas-music-city-guides"); return getTexasMusicCityGuide("san-antonio-music-history"); },
  head: ({ loaderData: guide }) => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "San Antonio Music History: Conjunto, Tejano & West Side Sound", description: guide.dek, type: "article" }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] }),
});
