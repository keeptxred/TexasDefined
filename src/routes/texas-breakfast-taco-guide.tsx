import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-breakfast-taco-guide";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/BreakfastTaco.jpg?width=1200";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch4 } = await import("@/data/texas-evergreen-guides-batch4");
    return getTexasEvergreenGuideBatch4("texas-breakfast-taco-guide");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Breakfast Tacos: Fillings, Regions & How to Order",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Egg and sausage breakfast taco with salsa on a flour tortilla",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
