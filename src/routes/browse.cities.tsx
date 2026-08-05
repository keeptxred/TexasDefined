import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Find Texas cities by name, county or region, then discover local stories, moving information and places nearby.";

export const Route = createFileRoute("/browse/cities")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/browse/cities",
      title: "Find a Texas City",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/browse/cities")],
  }),
  component: () => <TexasPlaceDirectory mode="cities" />,
});
