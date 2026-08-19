import { createFileRoute } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuide } from "@/data/texas-evergreen-guides";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuide("texas-food-trail");
const canonicalPath = "/texas-food-trail";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Food Trail: 10 Food Traditions Worth a Road Trip",
      description: guide.dek,
      image: bbqBrisket,
      imageAlt: "Sliced Texas barbecue brisket showing dark bark and a smoke ring",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
