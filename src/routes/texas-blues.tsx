import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-blues")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-blues");
  },
  head: ({ loaderData }) => loaderData.head,
});
