import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/corpus-christi-music-history";
const title = "Corpus Christi Music History: Tejano Records, Selena & the Coastal Bend";
const description =
  "How Corpus Christi became a South Texas music center through record stores, Tejano labels and studios, regional dance circuits, and Selena y Los Dinos.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title,
      description,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
