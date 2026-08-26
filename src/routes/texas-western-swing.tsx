import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-western-swing";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicGuideBatch1 } = await import("@/data/texas-music-guides-batch1");
    return getTexasMusicGuideBatch1("texas-western-swing");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Western Swing: History, Sound, Bob Wills & Milton Brown",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
