import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/water-parks/")({
  loader: async () => {
    const [{ texasWaterParks }, { makeWaterParkIndexHead }] = await Promise.all([
      import("@/data/texas-water-parks"),
      import("@/data/texas-water-parks-seo"),
    ]);
    const parks = texasWaterParks.map(({ slug, name }) => ({ slug, name }));
    return { seo: makeWaterParkIndexHead(parks) };
  },
  head: ({ loaderData }) =>
    loaderData?.seo ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
});
