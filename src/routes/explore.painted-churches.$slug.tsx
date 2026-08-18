import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/explore/painted-churches/$slug")({
  head: ({ params }) => {
    const canonicalPath = `/explore/painted-churches/${params.slug}`;
    const name = params.slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${name} | Texas Painted Church Guide`,
        description: `Historic and visitor guide to ${name}, with trip-planning guidance, primary sources and verified image rights where available.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
