import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-timeline";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Music Timeline: Blues, Country, Tejano, Rock, Hip-Hop & More",
      description: "A chronological guide to the major eras, scenes and turning points that shaped Texas music, from conjunto and blues to western swing, rock, Tejano, hip-hop and global pop.",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
