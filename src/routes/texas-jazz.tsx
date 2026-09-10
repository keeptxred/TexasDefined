import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-jazz")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-jazz");
  },
  head: ({ loaderData }) => loaderData.head,
});
