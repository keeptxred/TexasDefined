import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Missions and cattle trails, oil booms and courthouse squares — how six flags, ten generations and a stubborn streak built the place we live in now.";

export const Route = createFileRoute("/texas-history")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Texas History", description }),
    links: [canonicalLink(texasDefinedBrand, "/texas-history")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
  },
  component: () => (
    <CategoryPage
      category="texas-history"
      eyebrow="History"
      title="Where the story started"
      intro={description}
    />
  ),
});
