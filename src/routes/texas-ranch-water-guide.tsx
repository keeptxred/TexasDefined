import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch5 } from "@/data/texas-evergreen-guides-batch5";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch5("texas-ranch-water-guide");
const canonicalPath = "/texas-ranch-water-guide";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ranch_water.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Ranch Water: History, Origin Stories & What It Is",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Ranch Water cocktail served over ice with citrus",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
