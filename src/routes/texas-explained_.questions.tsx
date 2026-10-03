import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-explained/questions";
const description = "140 plain-English answers to common Texas questions about roads, government, property, schools, culture, sports, geography and everyday life.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "140 Texas Questions Answered | Texas Explained",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
