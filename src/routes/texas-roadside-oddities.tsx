import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuide } from "@/data/texas-evergreen-guides";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuide("texas-roadside-oddities");
const canonicalPath = "/texas-roadside-oddities";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Roadside Oddities: Weird Stops Worth the Detour",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
