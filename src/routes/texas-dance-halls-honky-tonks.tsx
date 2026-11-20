import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-dance-halls-honky-tonks";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch2 } = await import("@/data/texas-evergreen-guides-batch2");
    return getTexasEvergreenGuideBatch2("texas-dance-halls-honky-tonks");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Dance Halls & Honky-Tonks: Venues, Events & History",
      description: "Compare Gruene Hall, Twin Sisters, Anhalt, Luckenbach, Broken Spoke and other Texas dance halls, with official event calendars and practical trip planning.",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
