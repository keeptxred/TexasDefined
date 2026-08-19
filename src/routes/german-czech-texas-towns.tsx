import { createFileRoute } from "@tanstack/react-router";

import kolacheKlobasnek from "@/assets/kolache-klobasnek-hero-photo.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch2 } from "@/data/texas-evergreen-guides-batch2";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch2("german-czech-texas-towns");
const canonicalPath = "/german-czech-texas-towns";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "German & Czech Texas Towns: Food, Churches and Heritage",
      description: guide.dek,
      image: kolacheKlobasnek,
      imageAlt: "Texas Czech-style kolache and klobasnek pastries",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
