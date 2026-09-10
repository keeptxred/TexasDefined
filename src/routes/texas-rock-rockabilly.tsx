import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-rock-rockabilly")({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-rock-rockabilly");
  },
  head: ({ loaderData }) => loaderData.head,
});
