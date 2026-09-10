import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-hip-hop")({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-hip-hop");
  },
  head: ({ loaderData }) => loaderData.head,
});
