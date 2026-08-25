import { createFileRoute } from "@tanstack/react-router";

import roadTrip from "@/assets/road-trip.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import type { TexasCountyComparisonRow } from "@/data/county-comparison";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "A clear-eyed guide to choosing a Texas city or county, understanding the cost and property context, finding a home and settling into everyday life in a very large state.";
const imageAlt = "A two-lane Texas farm road running to the horizon";
const seoTitle = "Moving to Texas: County Comparison, Cities & What to Know";

type MovingToTexasLoaderData = {
  articles: Article[];
  destinations: Destination[];
  counties: TexasCountyComparisonRow[];
};

function editorialCollectionPayload(articles: Article[], destinations: Destination[]) {
  return { articles, destinations };
}

export const Route = createFileRoute("/moving-to-texas")({
  head: ({ loaderData }: { loaderData?: MovingToTexasLoaderData }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/moving-to-texas",
    title: seoTitle,
    collectionName: "Moving to Texas",
    description,
    image: roadTrip,
    imageAlt,
    imageWidth: 1600,
    imageHeight: 1067,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/moving-to-texas", title: seoTitle, description, image: roadTrip, imageAlt, imageWidth: 1600, imageHeight: 1067 }), links: [canonicalLink(texasDefinedBrand, "/moving-to-texas")] }),
  loader: async ({ context }): Promise<MovingToTexasLoaderData> => {
    const { loadTexasCountyComparison } = await import("@/data/county-comparison");
    const [articles, destinations, counties] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "moving-to-texas" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "moving-to-texas" })),
      loadTexasCountyComparison(),
    ]);
    await context.queryClient.ensureQueryData(regionsQuery());
    const editorial = editorialCollectionPayload(articles, destinations);
    return { ...editorial, counties };
  },
});
