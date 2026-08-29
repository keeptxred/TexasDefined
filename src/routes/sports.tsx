import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { articlesQuery, destinationsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Texas sports guide to high school and college football, pro teams, major stadiums, rodeo, motorsports and game-day traditions across the state.";
const seoTitle = "Texas Sports: Football, Stadiums, Teams, Rodeo & Traditions";

export const Route = createFileRoute("/sports")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/sports",
    title: seoTitle,
    collectionName: "Texas Sports",
    description,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { title: seoTitle, description, canonicalPath: "/sports" }), links: [canonicalLink(texasDefinedBrand, "/sports")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "sports" })),
    ]);
    return { articles, destinations };
  },
});
