import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-country-outlaw";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasMusicGuideBatch2 } = await import("@/data/texas-music-guides-batch2");
    return getTexasMusicGuideBatch2("texas-country-outlaw");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Country & Outlaw Country: History & Austin Roots",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
