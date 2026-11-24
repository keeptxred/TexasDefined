import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-breakfast-taco-guide";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/2009-265-56-_Two_Soft_Tacos_and_a_Microphone_(3310171849).jpg?width=1600";

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
      imageAlt: "Two chorizo breakfast tacos on flour tortillas in San Antonio",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
