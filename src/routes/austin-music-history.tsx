import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/austin-music-history")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("austin-music-history");
  },
  head: ({ loaderData }) => loaderData.head,
});
