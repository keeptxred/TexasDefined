import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-timeline";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Music Timeline: Roots, Genres, Scenes & Turning Points",
      description:
        "A chronological guide to Texas music history, from community dance traditions and early recordings through blues, conjunto, western swing, rock, Tejano, country, hip-hop and global pop.",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
