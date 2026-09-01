import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/route-66/$slug")({
  loader: async ({ params }) => {
    const { loadTexasRoute66Page } = await import("@/data/texas-route-66-page");
    return loadTexasRoute66Page(params.slug);
  },
  head: ({ loaderData }) => loaderData?.head ?? {
    meta: [{ title: "Route 66 guide unavailable" }, { name: "robots", content: "noindex, nofollow" }],
  },
});
