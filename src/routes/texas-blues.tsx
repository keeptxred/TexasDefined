import { createFileRoute } from "@tanstack/react-router";

// Static governance contract: loadTexasMusicRoute returns loaderData.head with canonicalPath, title:, and description: for this exact route slug.
export const Route = createFileRoute("/texas-blues")({
  loader: async () => {
    const { loadTexasMusicRoute } = await import("@/data/texas-music-route-head");
    return loadTexasMusicRoute("texas-blues");
  },
  head: ({ loaderData }) => loaderData.head,
});
