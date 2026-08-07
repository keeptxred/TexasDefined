import { createFileRoute } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Missions and cattle trails, oil booms and courthouse squares — the people, places and turning points that still shape how Texas looks and feels today.";
const imageAlt = "The granite dome of Enchanted Rock under a wide sky";

export const Route = createFileRoute("/texas-history")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/texas-history",
    title: "Texas History",
    collectionName: "Texas History",
    description,
    image: enchantedRock,
    imageAlt,
    breadcrumbParentName: "The Magazine",
    breadcrumbParentPath: "/",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/texas-history", title: "Texas History", description }), links: [canonicalLink(texasDefinedBrand, "/texas-history")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: () => <CategoryPage category="texas-history" eyebrow="Texas History" title="The stories that still shape this place" intro={description} image={{ src: enchantedRock, alt: imageAlt, width: 1600, height: 1067 }} />,
});
