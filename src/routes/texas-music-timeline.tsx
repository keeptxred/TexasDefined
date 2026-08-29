import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-timeline";
const title = "Texas Music Timeline: Milestones, Venues, Genres & Scenes";
const description =
  "A sourced timeline of Texas music history, from nineteenth-century dance halls and early blues to western swing, Tejano, landmark clubs and regional hip-hop.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title,
      description,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
