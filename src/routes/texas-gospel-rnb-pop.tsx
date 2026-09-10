import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-gospel-rnb-pop")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-gospel-rnb-pop");
  },
  head: ({ loaderData }) => loaderData.head,
});
