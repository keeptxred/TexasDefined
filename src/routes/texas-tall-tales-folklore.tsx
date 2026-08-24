import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-tall-tales-folklore";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch7 } = await import("@/data/texas-evergreen-guides-batch7");
    return getTexasEvergreenGuideBatch7("texas-tall-tales-folklore");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Tall Tales & Folklore: Pecos Bill, Jackalopes & Yellow Rose",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
