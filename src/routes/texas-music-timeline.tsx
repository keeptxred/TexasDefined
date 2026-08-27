import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_MUSIC_TIMELINE_DESCRIPTION } from "@/data/texas-music-timeline";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music-timeline";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Music Timeline: History, Roots & Evolution",
      description: TEXAS_MUSIC_TIMELINE_DESCRIPTION,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
