import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const CITYPASS_GUIDE_DESCRIPTION = "Compare 2026 Dallas, Houston and San Antonio CityPASS® prices, attractions, savings and reservation rules before you buy.";
export const CITYPASS_GUIDE_REVIEWED_AT = "2026-10-03";

const canonicalPath = "/guides/citypass-texas";

export const Route = createFileRoute("/guides/citypass-texas")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas CityPASS Guide 2026: Dallas, Houston & San Antonio",
      description: CITYPASS_GUIDE_DESCRIPTION,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
