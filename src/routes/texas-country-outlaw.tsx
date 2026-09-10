import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-country-outlaw")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-country-outlaw");
  },
  head: ({ loaderData }) => loaderData.head,
});
