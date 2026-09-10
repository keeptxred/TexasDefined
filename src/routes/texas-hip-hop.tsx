import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-hip-hop")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-hip-hop");
  },
  head: ({ loaderData }) => loaderData.head,
});
