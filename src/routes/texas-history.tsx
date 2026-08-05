import { createFileRoute } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Missions and cattle trails, oil booms and courthouse squares — the people, places and turning points that still shape how Texas looks and feels today.";

export const Route = createFileRoute("/texas-history")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/texas-history",
      title: "Texas History", description }),
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
      eyebrow="Then &amp; now"
      title="The stories that built this place"
      intro={description}
      image={{ src: enchantedRock, alt: 'The granite dome of Enchanted Rock under a wide sky', width: 1600, height: 1067 }}
    />
  ),
});
