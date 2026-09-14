import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import type { TexasExplainedLoaderData } from "@/components/editorial/TexasExplainedPage";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-explained";
const questionCount = 124;
const description = `Ten deeply reported Texas Defined guides, twenty-five focused supporting explainers and ${questionCount} plain-English answers connecting the roads, water, government, food, traditions, landscapes, homes and local systems that make Texas work the way it does.`;

export const Route = createFileRoute("/texas-explained")({
  head: ({ loaderData }: { loaderData?: TexasExplainedLoaderData | null }) => {
    if (!loaderData?.articles.length) {
      return {
        meta: buildMeta(texasDefinedBrand, {
          canonicalPath,
          title: "Texas Explained: 10 Guides to How the State Works",
          description,
        }),
        links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      };
    }

    const hero = loaderData.pillars[0]?.hero ?? loaderData.articles[0]?.hero;
    return buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Explained: 10 Guides to How the State Works",
      collectionName: "Texas Explained",
      description,
      image: hero?.src,
      imageAlt: hero?.alt,
      imageWidth: hero?.width,
      imageHeight: hero?.height,
      breadcrumbParentName: "Start Here",
      breadcrumbParentPath: "/texas-resources",
      items: loaderData.articles.map((article) => ({
        type: "Article" as const,
        name: article.title,
        url: `/article/${article.slug}`,
        image: article.hero.src,
        description: article.dek,
      })),
    });
  },
  // Keep collection schema rich on SSR while client rendering fetches inside the lazy page chunk.
  loader: async ({ context }): Promise<TexasExplainedLoaderData | null> => {
    if (!import.meta.env.SSR) return null;
    const [{ articlesQuery }, { buildTexasExplainedLoaderData }] = await Promise.all([
      import("@/data/queries"),
      import("@/components/editorial/TexasExplainedPage"),
    ]);
    const catalog = await context.queryClient.ensureQueryData(articlesQuery());
    return buildTexasExplainedLoaderData(catalog);
  },
});
