import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch4 } from "@/data/texas-evergreen-guides-batch4";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch4("texas-chili-con-carne-history");
const canonicalPath = "/texas-chili-con-carne-history";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pot_of_Chili_Con_Carne.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
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
  component: () => <TexasEvergreenGuide guide={guide} />,
});
