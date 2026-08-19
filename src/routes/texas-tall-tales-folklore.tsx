import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch7 } from "@/data/texas-evergreen-guides-batch7";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch7("texas-tall-tales-folklore");
const canonicalPath = "/texas-tall-tales-folklore";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Tall Tales & Folklore: Pecos Bill, Jackalopes & Yellow Rose",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <TexasEvergreenGuide guide={guide} />,
});
