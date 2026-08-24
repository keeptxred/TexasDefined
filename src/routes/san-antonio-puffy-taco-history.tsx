import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/san-antonio-puffy-taco-history";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Puffy_taco.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch5 } = await import("@/data/texas-evergreen-guides-batch5");
    return getTexasEvergreenGuideBatch5("san-antonio-puffy-taco-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "San Antonio Puffy Tacos: History of a Texas City Icon",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Puffy taco served at Los Barrios Mexican Restaurant in San Antonio",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
