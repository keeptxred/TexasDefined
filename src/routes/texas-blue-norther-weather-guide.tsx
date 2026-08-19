import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch6 } from "@/data/texas-evergreen-guides-batch6";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch6("texas-blue-norther-weather-guide");
const canonicalPath = "/texas-blue-norther-weather-guide";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Blue Northers, Spring Storms & Weather Folklore",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
