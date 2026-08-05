import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Find any of Texas' 254 counties and head straight to official local offices, appraisal information, elections and public services.";

export const Route = createFileRoute("/browse/counties")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/browse/counties",
      title: "Find Your Texas County",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/browse/counties")],
  }),
  component: () => <TexasPlaceDirectory mode="counties" />,
});
