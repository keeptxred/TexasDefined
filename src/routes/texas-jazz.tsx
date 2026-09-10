import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-jazz")({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-jazz");
  },
  head: ({ loaderData }) => loaderData.head,
});
