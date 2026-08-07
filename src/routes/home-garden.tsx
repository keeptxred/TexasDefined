import { createFileRoute } from "@tanstack/react-router";

import bluebonnets from "@/assets/bluebonnets.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Native plants that survive August, porches made for evening and rooms that feel at home here without dressing up like a ranch.";
const imageAlt = "Bluebonnets running to a fence line in spring";

export const Route = createFileRoute("/home-garden")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/home-garden",
    title: "Texas Home & Garden",
    collectionName: "Texas Home & Garden",
    description,
    image: bluebonnets,
    imageAlt,
    breadcrumbParentName: "Living Here",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/home-garden", title: "Texas Home & Garden", description }), links: [canonicalLink(texasDefinedBrand, "/home-garden")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "home-garden" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "home-garden" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: () => <CategoryPage category="home-garden" eyebrow="Home & Garden" title="A Texas home, without the costume" intro={description} image={{ src: bluebonnets, alt: imageAlt, width: 1600, height: 1067 }} />,
});
