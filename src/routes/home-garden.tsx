import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Native plants that survive August, porches built for evening, xeriscape that still looks alive, and interiors that borrow from the ranch without the costume.";

export const Route = createFileRoute("/home-garden")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Texas Home & Garden", description }),
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
      eyebrow="Home &amp; Garden"
      title="Built for heat, made for evening"
      intro={description}
    />
  ),
});
