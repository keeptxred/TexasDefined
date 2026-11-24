import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-brand-origin-stories";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { TEXAS_BRAND_ORIGINS_GUIDE } = await import("@/data/texas-evergreen-guides-batch3");
    return TEXAS_BRAND_ORIGINS_GUIDE;
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Brand Origin Stories: Founders, Hometowns & History",
      image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Modern_Blue_Bell_Creameries_factory_located_in_Brenham%2C_Texas.jpg?width=1280",
      imageAlt: "Blue Bell Creameries factory in Brenham, Texas",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
