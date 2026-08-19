import { createFileRoute } from "@tanstack/react-router";

import texasCourthouseSquare from "@/assets/generated/texas-courthouse-square.jpg";
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
      image: texasCourthouseSquare,
      imageAlt: "Historic Texas courthouse square and surrounding streetscape",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
