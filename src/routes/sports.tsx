import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Friday night lights, dusty rodeo arenas, big-league Sundays and the small rituals that turn a game into a Texas tradition.";

export const Route = createFileRoute("/sports")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData
    ? buildEditorialCollectionHead(texasDefinedBrand, {
        canonicalPath: "/sports",
        title: "Sports",
        collectionName: "The Texas Game",
        description,
        breadcrumbParentName: "The Magazine",
        breadcrumbParentPath: "/",
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
          title: "Sports",
          description,
          canonicalPath: "/sports",
        }),
        links: [canonicalLink(texasDefinedBrand, "/sports")],
      }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: () => (
    <CategoryPage
      category="sports"
      eyebrow="The Texas game"
      title="Where Friday nights still matter"
      intro={description}
    />
  ),
});
