import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/water-parks/$slug")({
  loader: async ({ params }) => {
    const [{ texasWaterParksBySlug }, { makeWaterParkDetailHead }] = await Promise.all([
      import("@/data/texas-water-parks"),
      import("@/data/texas-water-parks-seo"),
    ]);
    const park = texasWaterParksBySlug.get(params.slug);
    if (!park) throw notFound();
    return { ...park, seo: makeWaterParkDetailHead(park, params.slug) };
  },
  head: ({ loaderData }) =>
    loaderData?.seo ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
});
