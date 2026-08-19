import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { TEXAS_BRAND_ORIGINS_GUIDE } from "@/data/texas-evergreen-guides-batch3";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-brand-origin-stories";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Brand Origin Stories: Six Local Names That Became Icons",
      description: TEXAS_BRAND_ORIGINS_GUIDE.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={TEXAS_BRAND_ORIGINS_GUIDE} />,
});
