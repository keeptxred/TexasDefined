import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-conjunto-tejano")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-conjunto-tejano");
  },
  head: ({ loaderData }) => loaderData.head,
});
