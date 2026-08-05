import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Friday night lights, dusty rodeo arenas, big-league Sundays and the small rituals that turn a game into a Texas tradition.";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Texas Sports", description, canonicalPath: "/sports" }),
    links: [canonicalLink(texasDefinedBrand, "/sports")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
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
