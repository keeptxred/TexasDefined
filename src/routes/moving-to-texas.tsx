import { createFileRoute } from "@tanstack/react-router";

import roadTrip from "@/assets/road-trip.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "A clear-eyed guide to choosing a city, understanding the cost of living, finding a home and settling into everyday life in a very large state.";
const imageAlt = "A two-lane Texas farm road running to the horizon";

export const Route = createFileRoute("/moving-to-texas")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData
    ? buildEditorialCollectionHead(texasDefinedBrand, {
        canonicalPath: "/moving-to-texas",
        title: "Moving Here",
        collectionName: "Moving Here",
        description,
        image: roadTrip,
        imageAlt,
        breadcrumbParentName: "Living Here",
        breadcrumbParentPath: "/texas-living",
        items: [
          ...loaderData.articles.map((article) => ({
            type: "Article" as const,
            name: article.title,
            url: `/article/${article.slug}`,
            image: article.hero.src,
            description: article.dek,
          })),
          ...loaderData.destinations.map((destination) => ({
            type: "TouristAttraction" as const,
            name: destination.name,
            url: `/destination/${destination.slug}`,
            image: destination.hero.src,
            description: destination.summary,
          })),
        ],
      })
    : ({
        meta: buildMeta(texasDefinedBrand, {
          canonicalPath: "/moving-to-texas",
          title: "Moving Here",
          description,
        }),
        links: [canonicalLink(texasDefinedBrand, "/moving-to-texas")],
      }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "moving-to-texas" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "moving-to-texas" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: () => (
    <CategoryPage
      category="moving-to-texas"
      eyebrow="Moving here"
      title="Thinking about calling Texas home?"
      intro={description}
      image={{ src: roadTrip, alt: imageAlt, width: 1600, height: 1067 }}
    />
  ),
});
