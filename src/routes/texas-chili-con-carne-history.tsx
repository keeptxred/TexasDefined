import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-chili-con-carne-history";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pot_of_Chili_Con_Carne.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch4 } = await import("@/data/texas-evergreen-guides-batch4");
    return getTexasEvergreenGuideBatch4("texas-chili-con-carne-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Chili Con Carne: Chili Queens, San Antonio & the Bowl of Red",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Pot of chili con carne representing the Texas bowl-of-red tradition",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
