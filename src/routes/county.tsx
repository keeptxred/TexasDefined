import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Explore guides for all 254 Texas counties and find the right county by county name, city, ZIP-code research or exact street address.";

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
