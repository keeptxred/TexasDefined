import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dallas-fort-worth-music-history")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("dallas-fort-worth-music-history");
  },
  head: ({ loaderData }) => loaderData.head,
});
