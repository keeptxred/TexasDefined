import { createFileRoute } from "@tanstack/react-router";

import roadTrip from "@/assets/road-trip.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "A clear-eyed guide to choosing a city, understanding the cost of living, finding a home and settling into everyday life in a very large state.";

export const Route = createFileRoute("/moving-to-texas")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/moving-to-texas",
      title: "Moving to Texas", description }),
    links: [canonicalLink(texasDefinedBrand, "/moving-to-texas")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "moving-to-texas" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "moving-to-texas" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
  },
  component: () => (
    <CategoryPage
      category="moving-to-texas"
      eyebrow="Moving here"
      title="Thinking about calling Texas home?"
      intro={description}
      image={{ src: roadTrip, alt: "A two-lane Texas farm road running to the horizon", width: 1600, height: 1067 }}
    />
  ),
});
