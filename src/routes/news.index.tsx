import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { fetchPublishedTexasDefinedNewsArticles } from "@/data/articles-remote";
import { isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const newsQuery = {
  queryKey: ["texasdefined-live-news"] as const,
  queryFn: async () => (await fetchPublishedTexasDefinedNewsArticles({ limit: 60 })).filter(isArticleIndexReady),
  staleTime: 5 * 60 * 1000,
};

export const Route = createFileRoute("/news/")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(newsQuery),
  head: ({ loaderData }) => {
    const hasStories = Boolean(loaderData?.length);
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "Texas Life & Culture News",
        description: "Fresh Texas stories about places, culture, history, outdoors and the people who make the state distinctive.",
        canonicalPath: "/news",
        robots: hasStories ? undefined : "noindex, follow",
      }),
      links: [canonicalLink(texasDefinedBrand, "/news")],
    };
  },
});
