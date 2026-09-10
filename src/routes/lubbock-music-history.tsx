import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lubbock-music-history")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("lubbock-music-history");
  },
  head: ({ loaderData }) => loaderData.head,
});
