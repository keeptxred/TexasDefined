import { createFileRoute } from "@tanstack/react-router";

import heroHillCountry from "@/assets/hero-hill-country.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Ranchettes, bungalows, lake lots and city lofts — what homes cost, where people are moving and what to know before you put down roots.";

export const Route = createFileRoute("/real-estate")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/real-estate",
      title: "Texas Real Estate", description }),
    links: [canonicalLink(texasDefinedBrand, "/real-estate")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "real-estate" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "real-estate" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
  },
  component: () => (
    <CategoryPage
      category="real-estate"
      eyebrow="Putting down roots"
      title="Homes, land and the long view"
      intro={description}
      image={{ src: heroHillCountry, alt: "Evening light across rolling Texas Hill Country", width: 1600, height: 1067 }}
    />
  ),
});
