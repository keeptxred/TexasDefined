import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-rock-rockabilly")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-rock-rockabilly");
  },
  head: ({ loaderData }) => loaderData.head,
});
