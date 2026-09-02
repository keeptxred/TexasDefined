import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/hunting/$slug")({
  loader: async ({ params }) => {
    const { getHuntingAuthorityTopic } = await import("@/data/hunting/authority");
    const topic = getHuntingAuthorityTopic(params.slug);
    if (!topic) throw notFound();
    return topic;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/hunting/${loaderData.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: loaderData.title, description: loaderData.description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
