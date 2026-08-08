import { createFileRoute } from "@tanstack/react-router";

import heroHillCountry from "@/assets/hero-hill-country.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Ranchettes, bungalows, lake lots and city lofts — what homes cost, where people are moving and what to know before you buy, build or own property in Texas.";
const imageAlt = "Evening light across rolling Texas Hill Country";

export const Route = createFileRoute("/real-estate")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/real-estate",
    title: "Texas Homes & Land",
    collectionName: "Texas Homes & Land",
    description,
    image: heroHillCountry,
    imageAlt,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/real-estate", title: "Texas Homes & Land", description }), links: [canonicalLink(texasDefinedBrand, "/real-estate")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "real-estate" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "real-estate" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: () => <CategoryPage category="real-estate" eyebrow="Homes & Land" title="Homes, land and ownership across Texas" intro={description} image={{ src: heroHillCountry, alt: imageAlt, width: 1600, height: 1067 }} />,
});
