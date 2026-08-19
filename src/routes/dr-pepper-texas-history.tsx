import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch4 } from "@/data/texas-evergreen-guides-batch4";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch4("dr-pepper-texas-history");
const canonicalPath = "/dr-pepper-texas-history";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Dr Pepper in Texas: How a Waco Soda Became a State Icon",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Cupola and upper exterior of the Dr Pepper Museum in Waco, Texas",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
