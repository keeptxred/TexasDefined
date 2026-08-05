import { createFileRoute } from "@tanstack/react-router";

import heroHillCountry from "@/assets/hero-hill-country.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Ranchettes, bungalows, lake lots and city lofts — what homes cost, where people are moving and what to know before you put down roots.";
const imageAlt = "Evening light across rolling Texas Hill Country";

export const Route = createFileRoute("/real-estate")({
  head: ({ loaderData }) => loaderData
    ? buildEditorialCollectionHead(texasDefinedBrand, {
        canonicalPath: "/real-estate",
        title: "Texas Real Estate",
        collectionName: "Texas Real Estate",
        description,
        image: heroHillCountry,
        imageAlt,
        breadcrumbParentName: "Explore",
        breadcrumbParentPath: "/explore",
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
          canonicalPath: "/real-estate",
          title: "Texas Real Estate",
          description,
        }),
        links: [canonicalLink(texasDefinedBrand, "/real-estate")],
      }),
  loader: async ({ context }) => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "real-estate" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "real-estate" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: () => (
    <CategoryPage
      category="real-estate"
      eyebrow="Putting down roots"
      title="Homes, land and the long view"
      intro={description}
      image={{ src: heroHillCountry, alt: imageAlt, width: 1600, height: 1067 }}
    />
  ),
});
