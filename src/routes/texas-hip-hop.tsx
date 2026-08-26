import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-hip-hop";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicGuideBatch2 } = await import("@/data/texas-music-guides-batch2");
    return getTexasMusicGuideBatch2("texas-hip-hop");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Hip-Hop: Houston Rap, DJ Screw, Geto Boys & UGK",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
