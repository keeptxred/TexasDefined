import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/hunting";
const titleText = "Texas Hunting Guide — Public Land, Licenses, Seasons & Species";
const description = "Plan hunting in Texas with guides to public land, licenses, hunter education, APH, drawn hunts, species and current-season TPWD verification.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: titleText, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
