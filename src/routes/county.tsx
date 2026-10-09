import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Explore guides for all 254 Texas counties: history, towns, attractions, government services, DMV guidance and property taxes. Search by county, city, ZIP or address.";

export const Route = createFileRoute("/county")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/county",
      title: "Texas County Guides & County Finder",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/county")],
  }),
});
