import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
const canonicalPath = "/lubbock-music-history";
export const Route = createFileRoute(canonicalPath)({
  loader: async () => { const { getTexasMusicCityGuide } = await import("@/data/texas-music-city-guides"); return getTexasMusicCityGuide("lubbock-music-history"); },
  head: ({ loaderData: guide }) => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Lubbock Music History: Buddy Holly & West Texas Rock", description: guide.dek, type: "article" }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] }),
});
