import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-homecoming-mums";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch2 } = await import("@/data/texas-evergreen-guides-batch2");
    return getTexasEvergreenGuideBatch2("texas-homecoming-mums");
  },
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Homecoming Mums: History, Meaning, Colors & Traditions",
      description: "Texas homecoming mums explained: history, colors, senior traditions, garters, costs, DIY construction, preservation, etiquette and modern school customs.",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
