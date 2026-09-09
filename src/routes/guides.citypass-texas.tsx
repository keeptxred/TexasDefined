import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const CITYPASS_GUIDE_DESCRIPTION = "How Dallas CityPASS®, Houston CityPASS® and San Antonio CityPASS® work, which attractions participate, when a pass may be worth it, and what to compare before buying.";
export const CITYPASS_GUIDE_REVIEWED_AT = "2026-09-08";

const canonicalPath = "/guides/citypass-texas";

export const Route = createFileRoute("/guides/citypass-texas")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "CityPASS® in Texas: Dallas, Houston & San Antonio",
      description: CITYPASS_GUIDE_DESCRIPTION,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
