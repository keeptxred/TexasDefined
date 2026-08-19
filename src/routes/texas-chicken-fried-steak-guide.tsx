import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch4 } from "@/data/texas-evergreen-guides-batch4";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch4("texas-chicken-fried-steak-guide");
const canonicalPath = "/texas-chicken-fried-steak-guide";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken_fried_steak.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Chicken-Fried Steak: History, Styles & Cream Gravy",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Chicken-fried steak served as a classic breaded beef comfort-food plate",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
