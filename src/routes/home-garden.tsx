import { createFileRoute } from "@tanstack/react-router";

import bluebonnets from "@/assets/bluebonnets.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Native plants that survive August, porches made for evening and rooms that feel at home here without dressing up like a ranch.";

export const Route = createFileRoute("/home-garden")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/home-garden",
      title: "Texas Home & Garden", description }),
    links: [canonicalLink(texasDefinedBrand, "/home-garden")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "home-garden" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "home-garden" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
  },
  component: () => (
    <CategoryPage
      category="home-garden"
      eyebrow="Front porch"
      title="Living well in the heat"
      intro={description}
      image={{ src: bluebonnets, alt: 'Bluebonnets running to a fence line in spring', width: 1600, height: 1067 }}
    />
  ),
});
