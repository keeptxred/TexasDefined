import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/explore/water-parks";
const title = "Texas Water Parks: Indoor, Outdoor & Resort Guide";
const description = "Find indoor and outdoor Texas water parks by region, admission, and visitor access.";

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
    loaderData?.seo ?? {
      meta: [{ title: title }, { name: "description", content: description }, { name: "robots", content: "noindex, nofollow" }],
      links: [{ rel: "canonical", href: `https://texasdefined.com${canonicalPath}` }],
    },
});
