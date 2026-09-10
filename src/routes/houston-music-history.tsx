import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/houston-music-history")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("houston-music-history");
  },
  head: ({ loaderData }) => loaderData.head,
});
