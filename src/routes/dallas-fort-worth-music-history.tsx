import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
const canonicalPath = "/dallas-fort-worth-music-history";
export const Route = createFileRoute(canonicalPath)({
  loader: async () => { const { getTexasMusicCityGuide } = await import("@/data/texas-music-city-guides"); return getTexasMusicCityGuide("dallas-fort-worth-music-history"); },
  head: ({ loaderData: guide }) => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Dallas–Fort Worth Music History: Blues, Jazz & Recording", description: guide.dek, type: "article" }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] }),
});
