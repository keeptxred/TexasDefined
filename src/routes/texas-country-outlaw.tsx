import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-country-outlaw")({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-country-outlaw");
  },
  head: ({ loaderData }) => loaderData.head,
});
